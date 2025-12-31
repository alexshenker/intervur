import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
    const [tagSearch, setTagSearch] = useState("");

    const filteredTags = useMemo(() => {
        if (!tagSearch) return tags;
        const lower = tagSearch.toLowerCase();
        return tags.filter((tag) => tag.toLowerCase().includes(lower));
    }, [tags, tagSearch]);

    const totalActiveFilters =
        selectedCategories.length + selectedLevels.length + selectedTags.length;

    const toggleCategory = (cat: Category) => {
        if (selectedCategories.includes(cat)) {
            onCategoriesChange(selectedCategories.filter((c) => c !== cat));
        } else {
            onCategoriesChange([...selectedCategories, cat]);
        }
    };

    const toggleLevel = (level: Level) => {
        if (selectedLevels.includes(level)) {
            onLevelsChange(selectedLevels.filter((l) => l !== level));
        } else {
            onLevelsChange([...selectedLevels, level]);
        }
    };

    const toggleTag = (tag: ValidTag) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter((t) => t !== tag));
        } else {
            onTagsChange([...selectedTags, tag]);
        }
    };

    return (
        <Dialog>
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
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Filter Questions</DialogTitle>
                </DialogHeader>

                <div className="space-y-1">
                    {/* Categories */}
                    <FilterSection
                        title="Categories"
                        selectedCount={selectedCategories.length}
                        totalCount={categories.length}
                        onSelectAll={() => onCategoriesChange([...categories])}
                        onClearAll={() => onCategoriesChange([])}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((cat) => (
                                <label
                                    key={cat}
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <Checkbox
                                        checked={selectedCategories.includes(cat)}
                                        onCheckedChange={() => toggleCategory(cat)}
                                    />
                                    <span className="capitalize">{cat.replace("-", " ")}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Levels */}
                    <FilterSection
                        title="Levels"
                        selectedCount={selectedLevels.length}
                        totalCount={levels.length}
                        onSelectAll={() => onLevelsChange([...levels])}
                        onClearAll={() => onLevelsChange([])}
                    >
                        <div className="grid grid-cols-2 gap-2">
                            {levels.map((level) => (
                                <label
                                    key={level}
                                    className="flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <Checkbox
                                        checked={selectedLevels.includes(level)}
                                        onCheckedChange={() => toggleLevel(level)}
                                    />
                                    <span className="capitalize">{level.replace("-", " ")}</span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Tags */}
                    <FilterSection
                        title="Tags"
                        selectedCount={selectedTags.length}
                        totalCount={tags.length}
                        onSelectAll={() => onTagsChange([...filteredTags])}
                        onClearAll={() => onTagsChange([])}
                        defaultExpanded={false}
                    >
                        <div className="space-y-3">
                            <Input
                                type="text"
                                placeholder="Search tags..."
                                value={tagSearch}
                                onChange={(e) => setTagSearch(e.target.value)}
                                className="h-8"
                            />
                            <div className="max-h-48 overflow-y-auto space-y-1 pr-2">
                                {filteredTags.length === 0 ? (
                                    <p className="text-sm text-muted-foreground py-2">
                                        No tags found
                                    </p>
                                ) : (
                                    filteredTags.map((tag) => (
                                        <label
                                            key={tag}
                                            className="flex items-center gap-2 cursor-pointer text-sm py-0.5"
                                        >
                                            <Checkbox
                                                checked={selectedTags.includes(tag)}
                                                onCheckedChange={() => toggleTag(tag)}
                                            />
                                            <span>{tag}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                            {filteredTags.length < tags.length && (
                                <p className="text-xs text-muted-foreground">
                                    Showing {filteredTags.length} of {tags.length} tags
                                </p>
                            )}
                        </div>
                    </FilterSection>
                </div>
            </DialogContent>
        </Dialog>
    );
}
