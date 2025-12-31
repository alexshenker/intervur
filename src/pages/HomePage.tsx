import { QuestionCard } from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchResult, searchService } from "@/lib/search";
import { useState } from "react";

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        const searchResults = await searchService.search(searchQuery);
        setResults(searchResults);
        setIsSearching(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="py-6">
            <div className="flex gap-2">
                <Input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                    disabled={isSearching}
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "..." : "Search"}
                </Button>
            </div>

            {results.length > 0 && (
                <div className="mt-6 space-y-4">
                    {results.map((result, index) => (
                        <div key={index}>
                            <p className="text-sm text-muted-foreground mb-2">
                                Match: {result.matchPercent}
                            </p>
                            <QuestionCard question={result.question} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
