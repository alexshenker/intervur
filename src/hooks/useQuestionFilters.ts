import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Category, Level, ValidTag } from "@/db/constants";

export function useQuestionFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategories = useMemo(() => {
        const param = searchParams.get("categories");
        return param ? (param.split(",") as Category[]) : [];
    }, [searchParams]);

    const selectedLevels = useMemo(() => {
        const param = searchParams.get("levels");
        return param ? (param.split(",") as Level[]) : [];
    }, [searchParams]);

    const selectedTags = useMemo(() => {
        const param = searchParams.get("tags");
        return param ? (param.split(",") as ValidTag[]) : [];
    }, [searchParams]);

    const searchQuery = useMemo(() => {
        return searchParams.get("q") || "";
    }, [searchParams]);

    const setSelectedCategories = useCallback(
        (categories: Category[]) => {
            setSearchParams(
                (prev) => {
                    if (categories.length === 0) {
                        prev.delete("categories");
                    } else {
                        prev.set("categories", categories.join(","));
                    }
                    return prev;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const setSelectedLevels = useCallback(
        (levels: Level[]) => {
            setSearchParams(
                (prev) => {
                    if (levels.length === 0) {
                        prev.delete("levels");
                    } else {
                        prev.set("levels", levels.join(","));
                    }
                    return prev;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const setSelectedTags = useCallback(
        (tags: ValidTag[]) => {
            setSearchParams(
                (prev) => {
                    if (tags.length === 0) {
                        prev.delete("tags");
                    } else {
                        prev.set("tags", tags.join(","));
                    }
                    return prev;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const setSearchQuery = useCallback(
        (query: string) => {
            setSearchParams(
                (prev) => {
                    if (!query) {
                        prev.delete("q");
                    } else {
                        prev.set("q", query);
                    }
                    return prev;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const clearAll = useCallback(() => {
        setSearchParams({}, { replace: true });
    }, [setSearchParams]);

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedLevels.length > 0 ||
        selectedTags.length > 0 ||
        searchQuery.length > 0;

    return {
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
    };
}
