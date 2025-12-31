import { useState, useMemo, useCallback, useEffect } from "react";
import { questions } from "@/seed/seed";
import { useQuestionFilters } from "@/hooks/useQuestionFilters";
import { FilterModal } from "@/components/FilterModal";
import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { SkipForward, X, Eye, EyeOff } from "lucide-react";
import { categories, levels, type Category, type Level, type ValidTag } from "@/db/constants";

const HIDE_ANSWERS_KEY = "practice-hide-answers";

function getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
}

export function PracticePage() {
    const {
        selectedCategories,
        selectedLevels,
        selectedTags,
        setSelectedCategories,
        setSelectedLevels,
        setSelectedTags,
        clearAll,
        hasActiveFilters,
    } = useQuestionFilters();

    // Track current question index and a key to force re-render for new random answer
    const [currentIndex, setCurrentIndex] = useState<number>(() => getRandomIndex(questions.length));
    const [questionKey, setQuestionKey] = useState(0);

    // Hide answers toggle with localStorage persistence
    const [hideAnswers, setHideAnswers] = useState<boolean>(() => {
        const stored = localStorage.getItem(HIDE_ANSWERS_KEY);
        return stored === "true";
    });

    useEffect(() => {
        localStorage.setItem(HIDE_ANSWERS_KEY, String(hideAnswers));
    }, [hideAnswers]);

    // Filter questions based on all criteria
    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            if (selectedCategories.length > 0 && !selectedCategories.includes(q.category)) {
                return false;
            }
            if (selectedLevels.length > 0 && !selectedLevels.includes(q.level)) {
                return false;
            }
            if (selectedTags.length > 0 && !selectedTags.some((tag) => q.tags.includes(tag))) {
                return false;
            }
            return true;
        });
    }, [selectedCategories, selectedLevels, selectedTags]);

    // Get current question (bounded to filtered list)
    const currentQuestion = useMemo(() => {
        if (filteredQuestions.length === 0) return null;
        const boundedIndex = currentIndex % filteredQuestions.length;
        return filteredQuestions[boundedIndex];
    }, [filteredQuestions, currentIndex]);

    // Pick next random question
    const nextQuestion = useCallback(() => {
        if (filteredQuestions.length <= 1) {
            // Force re-render for new random answer even if same question
            setQuestionKey((k) => k + 1);
            return;
        }
        // Pick a different random index
        let newIndex: number;
        do {
            newIndex = getRandomIndex(filteredQuestions.length);
        } while (newIndex === currentIndex % filteredQuestions.length);
        setCurrentIndex(newIndex);
        setQuestionKey((k) => k + 1);
    }, [filteredQuestions.length, currentIndex]);

    // Collect all unique tags from questions for the filter
    const availableTags = useMemo(() => {
        const tagSet = new Set<ValidTag>();
        questions.forEach((q) => q.tags.forEach((tag) => tagSet.add(tag)));
        return Array.from(tagSet).sort();
    }, []);

    const removeCategory = (cat: Category) => {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    };

    const removeLevel = (level: Level) => {
        setSelectedLevels(selectedLevels.filter((l) => l !== level));
    };

    const removeTag = (tag: ValidTag) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    return (
        <div className="space-y-6">
            {/* Header with filter */}
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    {filteredQuestions.length} questions available
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setHideAnswers(!hideAnswers)}
                        className="gap-2"
                    >
                        {hideAnswers ? (
                            <>
                                <EyeOff className="h-4 w-4" />
                                Answers Hidden
                            </>
                        ) : (
                            <>
                                <Eye className="h-4 w-4" />
                                Answers Visible
                            </>
                        )}
                    </Button>
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
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
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
                    <button
                        onClick={clearAll}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Question display */}
            {currentQuestion ? (
                <div className="space-y-4">
                    <QuestionCard key={`${questionKey}-${hideAnswers}`} question={currentQuestion} hideAnswerByDefault={hideAnswers} />
                    <Button onClick={nextQuestion} className="w-full gap-2">
                        <SkipForward className="h-4 w-4" />
                        Next Question
                    </Button>
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg font-medium">No questions match your filters</p>
                    <p className="text-sm mt-1">Try adjusting your filter criteria</p>
                </div>
            )}
        </div>
    );
}
