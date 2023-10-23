import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import { accessTokenStore } from '$lib/stores';
import { QueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';
import type { LayoutData } from '../$types';

export const ssr = false;

export const load: () => Promise<LayoutData> = async () => {
    let token = browser ? get(accessTokenStore)?.token ?? null : null;
    if (token) {
        goto('/')
    }
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
                refetchOnWindowFocus: false, // default: true
                staleTime: 1000 * 60 * 5, // 5 minutes
            }
        }
    });

    return { queryClient, token };
};