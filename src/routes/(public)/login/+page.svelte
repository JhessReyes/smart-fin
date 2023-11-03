<script lang="ts">
	import '../../../app.css';
	import { Button, Input } from '$lib/components/atoms/';
	import { AuthenticationService, FirebaseAuthenticationService } from '$lib/services/auth';
	import { getMessaging, onMessage } from 'firebase/messaging';
	import { accessTokenStore, addToast, appState } from '$lib/stores';
	import AuthLayout from '$lib/components/templates/AuthLayout.svelte';
	import { app } from '$lib/api/firebase';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { AccessToken } from '$lib/schemas';
	import { goto } from '$app/navigation';

	let loading = false;
	let token = $accessTokenStore.token;
	let emailAndPassword: { email: string; password: string } = { email: '', password: '' };
	const authService = new AuthenticationService();
	const firebaseAuthService = new FirebaseAuthenticationService();
	const handleAuth = {
		emailAndPassword: async () => {
			loading = true;
			await firebaseAuthService
				.signInWithEmailAndPassword(emailAndPassword)
				.then((res) => {
					console.log('EMAIL', res);
				})
				.catch((err) => {
					addToast('Fail!', 'Failed to SignIn with Email and Password', 'error');
				});
			loading = false;
		},
		googleProvider: async () => {
			loading = true;
			await firebaseAuthService.signInWithGoogleProvider().then(async (sign) => {
				/* await authService.verifyToken(await sign.user.getIdToken()).then((res) => {
					addToast('Bienvenido!', sign?.user?.name, 'default');
				}); */
			});
			console.log('RR');
			loading = false;
		}
	};

	const auth = getAuth(app);

	const messaging = getMessaging(app);
	$: onMessage(messaging, (payload) => {
		console.log('Message received. ', payload);
		alert(payload);
		// ...
	});

	// $: if (true) console.log('AA', $appState.user);
	$: onAuthStateChanged(auth, async (user) => {
		loading = true;
		//update in backend

		//veryfy me

		//set new token
		console.log('user', user);
		const tk = await user?.getIdToken();
		accessTokenStore.set(new AccessToken({ token: tk }));

		loading = false;
		$appState.user = user;
		if (tk) goto('/');
	});

	$: !token ? (loading = true) : (loading = false);
</script>

<AuthLayout>
	<p class="font-medium m-0 text-4xl">
		Ingresa a <strong
			class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent 
			w-full m-0 italic text-center text-4xl font-bold`}
		>
			SmartFin
		</strong>
	</p>
	<div class="w-full max-w-sm">
		<Button
			class="dui-btn-circle w-full justify-center text-center flex bg-transparent border border-secondary text-secondary hover:bg-accent hover:text-base-200 dark:text-white dark:hover:text-primary"
			on:click={handleAuth.googleProvider}
		>
			<img src="/google-color.svg" alt="Google SigIn" class="m-0" />
			Continuar con Google
		</Button>
	</div>
	<p class="dui-divider">ó</p>
	<div class="w-full max-w-sm">
		<span class="dui-label mb-1 p-0 text-sm">Correo electrónico</span>
		<Input
			props={{ label: 'Correo electrónico', type: 'email' }}
			placeholder="user@smartfin.com"
			class="border-none drop-shadow"
			bind:value={emailAndPassword.email}
		/>
	</div>

	<div class="w-full max-w-sm">
		<span class="dui-label mb-1 p-0 text-sm">Contraseña</span>
		<Input
			props={{ label: 'Password', type: 'password' }}
			placeholder="********"
			class="border-none drop-shadow max-w-sm"
			bind:value={emailAndPassword.password}
		/>
	</div>
	<a class="text-sm text-primary cursor-pointer" href="./forgot"> ¿Olvidaste tu contraseña?</a>
	<Button
		class="drop-shadow w-full max-w-sm dui-btn-primary text-white {loading &&
			'dui-loading dui-loading-bars !dui-loading-xs dui-btn-outline'}"
		on:click={handleAuth.emailAndPassword}
	>
		Entrar
	</Button>
	<div class="text-base">
		¿Aún no tienes una cuenta?
		<a class="text-primary cursor-pointer text-sm" href="./signup"> Crear cuenta</a>
	</div>
</AuthLayout>
