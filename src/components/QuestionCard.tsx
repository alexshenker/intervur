import { useState, useMemo } from "react";
import type { DbExportQuestion } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface QuestionCardProps {
    question: DbExportQuestion;
    hideAnswerByDefault?: boolean;
}

export function QuestionCard({ question, hideAnswerByDefault = false }: QuestionCardProps) {
    const initialIndex = useMemo(
        () => Math.floor(Math.random() * question.answers.length),
        [question.answers.length]
    );

    const [answerIndex, setAnswerIndex] = useState(initialIndex);
    const [isAnswerHidden, setIsAnswerHidden] = useState(hideAnswerByDefault);

    const nextAnswer = () => {
        setAnswerIndex((prev) => (prev + 1) % question.answers.length);
    };

    const currentAnswer = question.answers[answerIndex];
    const hasMultipleAnswers = question.answers.length > 1;

    return (
        <div className="border border-border rounded-md p-4 bg-card shadow-md">
            <h3 className="text-base font-medium text-foreground mb-3">
                {question.text}
            </h3>

            <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    {question.category}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded border border-border text-foreground">
                    {question.level}
                </span>
            </div>

            {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                    {question.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-1 py-0.5 text-[10px] rounded bg-muted text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Answer
                    </span>
                    <div className="flex items-center gap-2">
                        {hasMultipleAnswers && !isAnswerHidden && (
                            <span className="text-xs text-muted-foreground">
                                {answerIndex + 1}/{question.answers.length}
                            </span>
                        )}
                        {hasMultipleAnswers && !isAnswerHidden && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={nextAnswer}
                                className="h-6 px-2"
                            >
                                Next →
                            </Button>
                        )}
                    </div>
                </div>
                {isAnswerHidden ? (
                    <button
                        onClick={() => setIsAnswerHidden(false)}
                        className="w-full py-4 rounded-md bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                        <Eye className="h-4 w-4" />
                        Click to reveal answer
                    </button>
                ) : (
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                        {currentAnswer}
                    </p>
                )}
            </div>
        </div>
    );
}
