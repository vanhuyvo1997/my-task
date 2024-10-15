import { useSearchParams } from "next/navigation";

export function useSearchQuery(queryParamKey: string) {
    const searParams = useSearchParams();
    return searParams.get(queryParamKey);
}