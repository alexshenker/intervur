import { useState, useMemo } from "react";
import { questions } from "@/seed/seed";
import { useQuestionFilters } from "@/hooks/useQuestionFilters";
import { FilterModal } from "@/components/FilterModal";
import { VirtualizedQuestionList } from "@/components/VirtualizedQuestionList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { categories, levels, type Category, type Level, type ValidTag } from "@/db/constants";

export function QuestionsPage() {
    const {
        selectedCategories,
        selectedLevels,
        selectedTags,
        searchQuery,
        setSelectedCategories,
        setSelectedLevels,
        setSelectedTags,
        setSearchQuery,
        clearAll,
        hasActiveFilters,
    } = useQuestionFilters();

    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Filter questions based on all criteria
    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            // Category filter (OR logic)
            if (selectedCategories.length > 0 && !selectedCategories.includes(q.category)) {
                return false;
            }

            // Level filter (OR logic)
            if (selectedLevels.length > 0 && !selectedLevels.includes(q.level)) {
                return false;
            }

            // Tags filter (OR logic - question has ANY selected tag)
            if (selectedTags.length > 0 && !selectedTags.some((tag) => q.tags.includes(tag))) {
                return false;
            }

            // Search filter (case-insensitive)
            if (searchQuery && !q.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [selectedCategories, selectedLevels, selectedTags, searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(localSearch);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            setSearchQuery(localSearch);
        }
    };

    const removeCategory = (cat: Category) => {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    };

    const removeLevel = (level: Level) => {
        setSelectedLevels(selectedLevels.filter((l) => l !== level));
    };

    const removeTag = (tag: ValidTag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    const clearSearch = () => {
        setLocalSearch("");
        setSearchQuery("");
    };

    // Collect all unique tags from questions for the filter
    const availableTags = useMemo(() => {
        const tagSet = new Set<ValidTag>();
        questions.forEach((q) => q.tags.forEach((tag) => tagSet.add(tag)));
        return Array.from(tagSet).sort();
    }, []);

    return (
        <div className="flex flex-col h-[calc(100vh-120px)]">
            {/* Header with search and filter */}
            <div className="flex gap-2 mb-4">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Search questions..."
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                            className="pr-8"
                        />
                        {localSearch && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <Button type="submit" variant="secondary">
                        Search
                    </Button>
                </form>
                <FilterModal
                    categories={[...categories]}
                    levels={[...levels]}
                    tags={availableTags}
                    selectedCategories={selectedCategories}
                    selectedLevels={selectedLevels}
                    selectedTags={selectedTags}
                    onCategoriesChange={setSelectedCategories}
                    onLevelsChange={setSelectedLevels}
                    onTagsChange={setSelectedTags}
                />
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCategories.map((cat) => (
                        <span
                            key={cat}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                        >
                            {cat}
                            <button onClick={() => removeCategory(cat)} className="hover:text-primary/70">
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                    {selectedLevels.map((level) => (
                        <span
                            key={level}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                        >
                            {level}
                            <button onClick={() => removeLevel(level)} className="hover:text-secondary-foreground/70">
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                    {selectedTags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                        >
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-foreground">
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                    {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-accent text-accent-foreground">
                            "{searchQuery}"
                            <button onClick={clearSearch} className="hover:text-accent-foreground/70">
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={clearAll}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Results count */}
            <div className="text-sm text-muted-foreground mb-3">
                Showing {filteredQuestions.length} of {questions.length} questions
            </div>

            {/* Virtualized list */}
            <div className="flex-1 min-h-0">
                <VirtualizedQuestionList questions={filteredQuestions} />
            </div>
        </div>
    );
}
