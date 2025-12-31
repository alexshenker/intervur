import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { QuestionCard } from "./QuestionCard";
import type { DbExportQuestion } from "@/lib/types";

interface VirtualizedQuestionListProps {
    questions: DbExportQuestion[];
}

export function VirtualizedQuestionList({ questions }: VirtualizedQuestionListProps) {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: questions.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 200,
        measureElement: (element) => {
            return element.getBoundingClientRect().height + 16; // Include gap
        },
        overscan: 3,
    });

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg font-medium">No questions found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search query</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={parentRef} className="h-full overflow-auto">
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                }}
            >
                {virtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.key}
                        data-index={virtualItem.index}
                        ref={virtualizer.measureElement}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        <div className="pb-4">
                            <QuestionCard question={questions[virtualItem.index]} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
