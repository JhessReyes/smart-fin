import { browser } from '$app/environment';
import { accessTokenStore } from '$lib/stores';
import { get } from 'svelte/store';

const API_URL = 'http://localhost:3000/api/graphql'
export const queryFetch = (keys: any, variables: any) => {
    return {
        queryKey: keys,
        queryFn: async () => {
            let token = browser ? get(accessTokenStore) ?? null : null;
            const authorization = token ? token : '';

            let data = await (await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authorization}`,
                },
                body: JSON.stringify(variables)
            })
            ).json()
            return data
        }
    }
}

export const mutationFetch = async (variables: any) => {
    let token = browser ? get(accessTokenStore) ?? null : null;
    const authorization = token ? token : '';

    let data = await (await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorization}`
        },
        body: JSON.stringify(variables)
    })
    ).json()
    return data

}