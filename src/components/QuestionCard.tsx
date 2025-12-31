import { useState, useMemo } from "react";
import type { DbExportQuestion } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
    question: DbExportQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
    const initialIndex = useMemo(
        () => Math.floor(Math.random() * question.answers.length),
        [question.answers.length]
    );

    const [answerIndex, setAnswerIndex] = useState(initialIndex);

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
                    {hasMultipleAnswers && (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                                {answerIndex + 1}/{question.answers.length}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={nextAnswer}
                                className="h-6 px-2"
                            >
                                Next →
                            </Button>
                        </div>
                    )}
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">
                    {currentAnswer}
                </p>
            </div>
        </div>
    );
}
