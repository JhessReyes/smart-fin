<script lang="ts">
	import '../../../app.css';
	import { Button, Input } from '$lib/components/atoms/';
	import AuthLayout from '$lib/components/templates/AuthLayout.svelte';
	import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
	import { app } from '$lib/api/firebase';
	import { addToast } from '$lib/stores';
	let loading = false;
	let email: string = null;

	const handleForgot = async () => {
		loading = true;
		const auth = getAuth(app);
		await sendPasswordResetEmail(auth, email)
			.then(() => {
				addToast('Success!', `Se ha enviado el correo para restablecer tu contraseña`, 'success');
			})
			.catch((error) => {
				addToast('Fail!', 'Ocurrió un error al enviar el correo', 'error');
			});

		loading = false;
	};
</script>

<AuthLayout>
	<p class="font-medium m-0 text-4xl">¿Olvidaste tu contraseña?</p>
	<div class="w-full max-w-sm">
		<span class="text-sm not-prose">
			¡No te preocupes! ¡Simplemente ingresa tu correo electrónico y enviaremos un código para
			restablecerla!
		</span>
	</div>
	<div class="w-full max-w-sm">
		<span class="dui-label mb-1 p-0 text-sm">Correo electrónico</span>
		<Input
			props={{ label: 'Correo electrónico', type: 'email' }}
			placeholder="user@smartfin.com"
			class="border-none drop-shadow"
			bind:value={email}
		/>
	</div>

	<Button
		class="drop-shadow w-full max-w-sm dui-btn-primary text-white {loading &&
			'dui-loading dui-loading-bars !dui-loading-xs dui-btn-outline'}"
		on:click={handleForgot}
	>
		Restablecer contraseña
	</Button>
	<div class="text-base">
		¿Ya tienes una cuenta?
		<a class="text-primary cursor-pointer" href="./login"> Ingresa aquí</a>
	</div>
</AuthLayout>
