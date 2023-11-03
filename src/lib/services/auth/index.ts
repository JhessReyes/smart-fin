import { goto } from "$app/navigation";
import { CREATE_USER_WITH_EMAIL_AND_PASSWORD, SIGNIN_WITH_EMAIL_AND_PASSWORD, VERIFY_ME } from "$lib/api/auth";
import { app } from "$lib/api/firebase";
import { PLANS } from "$lib/api/plans";
import { API_URL } from "$lib/client";
import type { IAuthenticationService, IFirebaseAuthenticationService, ISignUpService } from "$lib/interfaces";
import { AccessToken } from "$lib/schemas";
import { accessTokenStore, addToast } from "$lib/stores";
import { initializeApp } from "firebase/app";
import { getRedirectResult, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getAuth, signInWithRedirect, signInWithEmailAndPassword } from 'firebase/auth';

export class AuthenticationService implements IAuthenticationService {
    signInWithGoogleProvider = async ({ variables }: { variables: object; }): Promise<any> => {

        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithRedirect(auth, provider);

        const res = await getRedirectResult(auth)
        /*             .then((result) => {
                        // This gives you a Google Access Token. You can use it to access Google APIs.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
        
                        const token = credential.accessToken;
        
                        // The signed-in user info.
                        const user = result.user;
                        return result
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...
        
                    }).catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                    }); */
        return res
    }

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

export class FirebaseAuthenticationService implements IFirebaseAuthenticationService {
    signInWithEmailAndPassword = async ({ email, password }: { email: string; password: string; }): Promise<any> => {
        const auth = getAuth(app);
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res
    }
    signInWithGoogleProvider = async (): Promise<any> => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithRedirect(auth, provider);
        const res = await getRedirectResult(auth)
        return res
    }
    logOut = async () => {
        const auth = getAuth(app);
        const res = await signOut(auth)
        return res
    }
    verifyToken?= async (token: string): Promise<boolean> => {
        throw new Error("Method not implemented.");
    }

}

export class SignUpService implements ISignUpService {
    getPlans = async (): Promise<any> => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: PLANS })
        })
            .then((r) => r.json())
            .then((data) => {
                if (data?.errors) {
                    data?.errors.map((e: { message: any }) => addToast('Fail!', e?.message + '', 'error'));
                    return false;
                }
                return data
            }).catch((O_o) => {
                addToast('Fail!', "Ocurrió un problema al obtener los planes", 'error')
                return false
            });
        return res

    }
    createUserWithEmailAndPassword = async (variables: { name: string, email: string; password: string; planId: string; }): Promise<boolean> => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: CREATE_USER_WITH_EMAIL_AND_PASSWORD, variables: { input: variables } })
        })
            .then((r) => r.json())
            .then((data) => {
                if (data?.errors) {
                    data?.errors.map((e: { message: any }) => addToast('Fail!', e?.message + '', 'error'));
                    return false;
                }
                return data
            }).catch((O_o) => {
                addToast('Fail!', "Ocurrió un problema al hacer la consulta", 'error')
                return false
            });
        return res
    }
}
