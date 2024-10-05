import { useSearchParams } from "next/navigation";
import { searchQueryKey } from "../_components/text-inputs/search-bar-v2";

export function useSearchQuery(queryParamKey: string) {
    const searParams = useSearchParams();
    return searParams.get(searchQueryKey);
}