import { useState, useMemo, useCallback, useRef, useEffect, memo } from "react";
import { Filter } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { FilterSection } from "./FilterSection";
import type { Category, Level, ValidTag } from "@/db/constants";

interface FilterModalProps {
    categories: Category[];
    levels: Level[];
    tags: ValidTag[];
    selectedCategories: Category[];
    selectedLevels: Level[];
    selectedTags: ValidTag[];
    onCategoriesChange: (categories: Category[]) => void;
    onLevelsChange: (levels: Level[]) => void;
    onTagsChange: (tags: ValidTag[]) => void;
}

// Memoized checkbox item to prevent re-renders
const CheckboxItem = memo(function CheckboxItem({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <label className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox checked={checked} onCheckedChange={onChange} />
            <span className="capitalize">{label.replace(/-/g, " ")}</span>
        </label>
    );
});

export function FilterModal({
    categories,
    levels,
    tags,
    selectedCategories,
    selectedLevels,
    selectedTags,
    onCategoriesChange,
    onLevelsChange,
    onTagsChange,
}: FilterModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tagSearch, setTagSearch] = useState("");

    // Local state for pending changes (only applied on close/apply)
    const [localCategories, setLocalCategories] = useState<Category[]>([]);
    const [localLevels, setLocalLevels] = useState<Level[]>([]);
    const [localTags, setLocalTags] = useState<ValidTag[]>([]);

    // Sync local state when modal opens
    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (open) {
                setLocalCategories(selectedCategories);
                setLocalLevels(selectedLevels);
                setLocalTags(selectedTags);
                setTagSearch("");
            }
            setIsOpen(open);
        },
        [selectedCategories, selectedLevels, selectedTags]
    );

    // Apply changes and close
    const handleApply = useCallback(() => {
        onCategoriesChange(localCategories);
        onLevelsChange(localLevels);
        onTagsChange(localTags);
        setIsOpen(false);
    }, [localCategories, localLevels, localTags, onCategoriesChange, onLevelsChange, onTagsChange]);

    // Reset to current URL state
    const handleReset = useCallback(() => {
        setLocalCategories([]);
        setLocalLevels([]);
        setLocalTags([]);
    }, []);

    const filteredTags = useMemo(() => {
        if (!tagSearch) return tags;
        const lower = tagSearch.toLowerCase();
        return tags.filter((tag) => tag.toLowerCase().includes(lower));
    }, [tags, tagSearch]);

    const totalActiveFilters =
        selectedCategories.length + selectedLevels.length + selectedTags.length;

    const localSelectedCount =
        localCategories.length + localLevels.length + localTags.length;

    // Use Set for O(1) lookups
    const localCategorySet = useMemo(() => new Set(localCategories), [localCategories]);
    const localLevelSet = useMemo(() => new Set(localLevels), [localLevels]);
    const localTagSet = useMemo(() => new Set(localTags), [localTags]);

    const toggleCategory = useCallback((cat: Category) => {
        setLocalCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    }, []);

    const toggleLevel = useCallback((level: Level) => {
        setLocalLevels((prev) =>
            prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
        );
    }, []);

    const toggleTag = useCallback((tag: ValidTag) => {
        setLocalTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    }, []);

    // Virtualized tags list
    const tagsContainerRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
        count: filteredTags.length,
        getScrollElement: () => tagsContainerRef.current,
        estimateSize: () => 28,
        overscan: 5,
    });

    // Force virtualizer to recalculate when modal opens
    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                virtualizer.measure();
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isOpen, virtualizer]);

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {totalActiveFilters > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {totalActiveFilters}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Filter Questions</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto space-y-1">
                    {/* Categories */}
                    <FilterSection
                        title="Categories"
                        selectedCount={localCategories.length}
                        totalCount={categories.length}
                        onSelectAll={() => setLocalCategories([...categories])}
                        onClearAll={() => setLocalCategories([])}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((cat) => (
                                <CheckboxItem
                                    key={cat}
                                    label={cat}
                                    checked={localCategorySet.has(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                            ))}
                        </div>
                    </FilterSection>

                    {/* Levels */}
                    <FilterSection
                        title="Levels"
                        selectedCount={localLevels.length}
                        totalCount={levels.length}
                        onSelectAll={() => setLocalLevels([...levels])}
                        onClearAll={() => setLocalLevels([])}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {levels.map((level) => (
                                <CheckboxItem
                                    key={level}
                                    label={level}
                                    checked={localLevelSet.has(level)}
                                    onChange={() => toggleLevel(level)}
                                />
                            ))}
                        </div>
                    </FilterSection>

                    {/* Tags */}
                    <FilterSection
                        title="Tags"
                        selectedCount={localTags.length}
                        totalCount={tags.length}
                        onSelectAll={() => setLocalTags([...filteredTags])}
                        onClearAll={() => setLocalTags([])}
                        defaultExpanded={true}
                    >
                        <div className="space-y-3">
                            <Input
                                type="text"
                                placeholder="Search tags..."
                                value={tagSearch}
                                onChange={(e) => setTagSearch(e.target.value)}
                                className="h-8"
                            />
                            {filteredTags.length === 0 ? (
                                <p className="text-sm text-muted-foreground py-2">
                                    No tags found
                                </p>
                            ) : (
                                <div
                                    ref={tagsContainerRef}
                                    className="h-48 overflow-y-auto pr-2"
                                >
                                    <div
                                        style={{
                                            height: `${virtualizer.getTotalSize()}px`,
                                            width: "100%",
                                            position: "relative",
                                        }}
                                    >
                                        {virtualizer.getVirtualItems().map((virtualItem) => {
                                            const tag = filteredTags[virtualItem.index];
                                            return (
                                                <div
                                                    key={tag}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: `${virtualItem.size}px`,
                                                        transform: `translateY(${virtualItem.start}px)`,
                                                    }}
                                                >
                                                    <label className="flex items-center gap-2 cursor-pointer text-sm py-0.5">
                                                        <Checkbox
                                                            checked={localTagSet.has(tag)}
                                                            onCheckedChange={() => toggleTag(tag)}
                                                        />
                                                        <span>{tag}</span>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {filteredTags.length < tags.length && (
                                <p className="text-xs text-muted-foreground">
                                    Showing {filteredTags.length} of {tags.length} tags
                                </p>
                            )}
                        </div>
                    </FilterSection>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button type="button" onClick={handleApply}>
                        Apply {localSelectedCount > 0 && `(${localSelectedCount})`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
