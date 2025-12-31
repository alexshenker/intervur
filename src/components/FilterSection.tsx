import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    onSelectAll: () => void;
    onClearAll: () => void;
    selectedCount: number;
    totalCount: number;
    defaultExpanded?: boolean;
}

export function FilterSection({
    title,
    children,
    onSelectAll,
    onClearAll,
    selectedCount,
    totalCount,
    defaultExpanded = true,
}: FilterSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div className="border-b border-border last:border-b-0">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full py-3 text-left hover:bg-accent/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{title}</span>
                    {selectedCount > 0 && (
                        <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                            {selectedCount}
                        </span>
                    )}
                </div>
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-200",
                    isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pb-3 pl-6">
                    <div className="flex gap-2 mb-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onSelectAll}
                            disabled={selectedCount === totalCount}
                        >
                            Select All
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onClearAll}
                            disabled={selectedCount === 0}
                        >
                            Clear
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
