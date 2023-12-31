import { AccessToken } from './../schemas/index';
import { browser } from '$app/environment';
import { AppState } from '$lib/schemas';
import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';

//@ts-ignore
const initialAppStateValue = browser ? new AppState(JSON.parse(window.localStorage.getItem("sf-state")) ?? new AppState()) : new AppState();

export let appState = writable(initialAppStateValue)

appState.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem(
            "sf-state",
            JSON.stringify(value)
        );
    }
})

//@ts-ignore
const initialAccessTokenValue = browser ? new AccessToken(JSON.parse(window.localStorage.getItem("accessToken")) ?? new AccessToken()) : null;

export let accessTokenStore = writable(initialAccessTokenValue);

accessTokenStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify(value)
        );
    }
})


export const toasts = writable([]);

export const addToast = (title: any, message: any, type: any) => {
    const id = uuidv4();

    toasts.update(
        //@ts-ignore
        (currentToasts) => {
            return [...currentToasts, { id, title, message, type }];
        });

    setTimeout(() => removeToast(id), 5000);
};

export const removeToast = (id: any) => {
    toasts.update((currentToasts) => {
        //@ts-ignore
        return currentToasts.filter((toast) => toast.id !== id);
    });
};
