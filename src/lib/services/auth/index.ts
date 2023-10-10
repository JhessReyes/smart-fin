import { goto } from "$app/navigation";
import { SIGNIN_WITH_EMAIL_AND_PASSWORD, VERIFY_ME } from "$lib/api/auth";
import { API_URL } from "$lib/client";
import type { IAuthenticationService } from "$lib/interfaces";
import { AccessToken } from "$lib/schemas";
import { accessTokenStore, addToast } from "$lib/stores";

export class AuthenticationService implements IAuthenticationService {

    signInWithEmailAndPassword = async (variables: { email: string, password: string }): Promise<boolean> => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: SIGNIN_WITH_EMAIL_AND_PASSWORD, variables })
        })
            .then((r) => r.json())
            .then((data) => {
                if (data?.errors) {
                    data?.errors.map((e: { message: any }) => addToast('Fail!', e?.message + '', 'error'));
                    return false;
                }
                if (data?.data) {
                    const token = data.data?.signInWithEmailAndPassword?.accessToken;
                    accessTokenStore.set(new AccessToken({ token }));
                    if (token) { goto('/dashboard'); return true };
                }
                addToast('Fail!', 'Failed to SignIn with Email and Password', 'error');
                return false
            }).catch((O_o) => {
                addToast('Fail!', "Ocurrió un problema al hacer la consulta", 'error')
                return false
            });
        return res
    }

    verifyToken?= async (token: string): Promise<boolean> => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ query: VERIFY_ME })
        })
            .then((r) => r.json())
            .then((data) => {
                let validSession = true
                if (data?.errors) {
                    data?.errors.map((e: { message: any }) => addToast('Fail!', e?.message + '', 'error'));
                    accessTokenStore.set(new AccessToken());
                    validSession = false;
                }
                if (!data?.data) {
                    accessTokenStore.set(new AccessToken());
                    validSession = false
                }

                if (!validSession) goto("/login")
                return validSession
            });
        return res
    }


}