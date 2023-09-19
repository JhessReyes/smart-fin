import { AuthenticationService } from './../services/auth/index';
import { browser } from '$app/environment';
import { accessTokenStore } from '$lib/stores';
import { get } from 'svelte/store';

export const API_URL = 'http://localhost:3000/api/graphql'
export const queryFetch = (keys: any, variables: any) => {
    return {
        queryKey: keys,
        queryFn: async () => {
            let token = browser ? get(accessTokenStore)?.token ?? null : null;
            const authorization = token ? token : '';

            const authService = new AuthenticationService()
            await authService.verifyToken(token)

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
    let token = browser ? get(accessTokenStore)?.token ?? null : null;
    const authorization = token ? token : '';
    const authService = new AuthenticationService()
    await authService.verifyToken(token)
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