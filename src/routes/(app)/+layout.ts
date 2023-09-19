import { browser } from '$app/environment';
import { accessTokenStore } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { QueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';
import type { LayoutData } from '../$types';

export const ssr = false;

export const load: () => Promise<LayoutData> = async () => {
    let token = browser ? get(accessTokenStore)?.token ?? null : null;
    if (!token) {
        throw redirect(302, "/login");
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

    return { queryClient };
};