<script lang="ts">
	import { Button, Input } from '$lib/components/atoms/';
	import { Toast } from '$lib/components/molecules';
	import { AuthenticationService } from '$lib/services/auth';
	import '../../../app.postcss';

	let loading = false;
	let emailAndPassword: { email: string; password: string } = { email: '', password: '' };
	const authService = new AuthenticationService();
	const handleAuth = {
		emailAndPassword: async () => {
			loading = true;
			await authService.signInWithEmailAndPassword(emailAndPassword);
			loading = false;
		}
	};
</script>

<div class="grid md:grid-cols-2 h-screen prose max-w-none bg-base-100">
	<Toast />
	<div class="md:flex flex-col justify-between gap-5 drop-shadow-md font-bold text-6xl hidden">
		<h1 class="text-5xl capitalize italic m-0 drop-shadow-sm px-12">
			<br /> Calcula

			<strong class="text-primary"> Inteligente, </strong>
			<br />Gasta
			<strong class="text-primary"> Sabiamente... </strong>
		</h1>
		<img
			src="/login-banner.svg"
			alt="SmartFin, Mejora tus finanzas."
			class="m-0 w-full h-fit drop-shadow-sm"
		/>
	</div>
	<div
		class="flex flex-col gap-5 bg-base-200 justify-center items-center prose-lg text-center p-12 md:rounded-l-[2.5rem]"
	>
		<p class="font-medium m-0 text-4xl">
			Ingresa a <strong class="text-primary"> SmartFin </strong>
		</p>
		<div class="w-full max-w-sm">
			<Button
				class="btn-circle w-full justify-center text-center flex bg-transparent border border-secondary text-secondary hover:bg-accent hover:text-base-200 dark:text-white dark:hover:text-primary"
			>
				<img src="/google-color.svg" alt="Google SigIn" class="m-0" />
				Continuar con Google
			</Button>
		</div>
		<p class="divider">ó</p>
		<div class="w-full max-w-sm">
			<span class="label mb-1 p-0 text-sm">Correo electrónico</span>
			<Input
				props={{ placeholder: 'user@smartfin.com', label: 'Correo electrónico', type: 'email' }}
				class="border-none drop-shadow"
				bind:value={emailAndPassword.email}
			/>
		</div>

		<div class="w-full max-w-sm">
			<span class="label mb-1 p-0 text-sm">Contraseña</span>
			<Input
				props={{ placeholder: '********', label: 'Password', type: 'password' }}
				class="border-none drop-shadow max-w-sm"
				bind:value={emailAndPassword.password}
			/>
		</div>
		<Button
			class="drop-shadow w-full max-w-sm btn-primary {loading && 'loading loading-bars !loading-xs btn-outline'}"
			on:click={handleAuth.emailAndPassword}
		>
			Entrar
		</Button>
	</div>
</div>
