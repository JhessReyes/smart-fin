import { AuthenticationService } from './../services/auth/index';
import { browser } from '$app/environment';
import { accessTokenStore } from '$lib/stores';
import { get } from 'svelte/store';
import { env } from '$env/dynamic/public'

export const API_URL = env.SF_API_URL
export const queryFetch = (variables: any) => {
    return async () => {
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

export const mutationFetch = async (variables: any) => {
    let token = browser ? get(accessTokenStore)?.token ?? null : null;
    const authorization = token ? token : '';
    const authService = new AuthenticationService()
    await authService.verifyToken(token)
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authorization}`
        },
        body: JSON.stringify(variables)
    }).then(res => res.json())
}