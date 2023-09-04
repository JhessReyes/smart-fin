import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutData } from '../$types';

export const ssr = false;

export const load: () => Promise<LayoutData> = async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
                refetchOnWindowFocus: false, // default: true
                staleTime: 1000 * 60 * 5, // 5 minutes
            }
        }
    });

    return { queryClient };
};