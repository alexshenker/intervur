import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        // TODO: implement search
        console.log("Searching for:", searchQuery);
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
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
        </div>
    );
}
