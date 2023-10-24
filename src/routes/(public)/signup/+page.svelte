<script lang="ts">
	import { Button, Input } from '$lib/components/atoms';
	import AuthLayout from '$lib/components/templates/AuthLayout.svelte';
	import { FirebaseAuthenticationService, SignUpService } from '$lib/services/auth';
	import { onMount } from 'svelte';

	let loading = false;
	let plans: any = [];
	let extrasRequired: { planId: string; name: string } = { planId: undefined, name: null };
	let emailAndPassword: { email: string; password: string } = { email: null, password: null };
	const signUpService = new SignUpService();
	const firebaseAuthService = new FirebaseAuthenticationService();
	const handleSignUp = {
		emailAndPassword: async () => {
			loading = true;
			const newUser = await signUpService.createUserWithEmailAndPassword({
				...emailAndPassword,
				...extrasRequired
			});
			if (newUser) await firebaseAuthService.signInWithEmailAndPassword(emailAndPassword);
			loading = false;
		}
	};
	onMount(async () => {
		await signUpService.getPlans().then((res) => {
			plans = res?.data?.plans?.rows;
			extrasRequired.planId === undefined && (extrasRequired.planId = plans?.[0]?.id);
		});
	});
</script>

<AuthLayout>
	<p class="font-medium m-0 text-4xl">
		Registrate en <strong
			class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent 
        w-full m-0 italic text-center text-4xl font-bold`}
		>
			SmartFin
		</strong>
	</p>

	<form
		on:submit|preventDefault|stopPropagation={handleSignUp.emailAndPassword}
		id="signup"
		class="w-full max-w-sm flex flex-col gap-4"
	>
		<div class="w-full max-w-sm flex flex-col gap-4">
			<div>
				<span class="dui-label mb-1 p-0 text-sm">Correo electrónico</span>
				<Input
					props={{ label: 'Correo electrónico', type: 'email' }}
					placeholder="user@smartfin.com"
					class="border-none drop-shadow"
					bind:value={emailAndPassword.email}
					required
				/>
			</div>

			<div>
				<span class="dui-label mb-1 p-0 text-sm">Contraseña</span>
				<Input
					props={{ label: 'Password', type: 'password' }}
					placeholder="********"
					class="border-none drop-shadow max-w-sm"
					bind:value={emailAndPassword.password}
					required
				/>
			</div>

			<div>
				<span class="dui-label mb-1 p-0 text-sm">Nombre de usuario</span>
				<Input
					props={{ label: 'Nombre de usuario', type: 'text' }}
					placeholder="full name"
					class="border-none drop-shadow"
					bind:value={extrasRequired.name}
					required
				/>
			</div>
		</div>

		<h5 class="m-0">Selecciona un plan</h5>
		<div class="w-auto px-4 flex gap-4 not-prose">
			{#each plans as plan}
				<button
					type="button"
					class="dui-card shadow-lg w-full p-4 {extrasRequired.planId === plan?.id
						? 'bg-primary text-white'
						: 'bg-base-200 text-primary'}"
					on:click={() => (extrasRequired.planId = plan?.id)}
				>
					<h4 class=" m-0 !py-2">
						{plan?.name}
					</h4>
					<h3 class="flex flex-col">
						$ {parseFloat(plan?.price).toFixed(2)}
						<span class="text-xs">/Month</span>
					</h3>
				</button>
			{/each}
		</div>
	</form>
	<Button
		class="drop-shadow w-full max-w-sm dui-btn-primary text-white {loading &&
			'dui-loading dui-loading-bars !dui-loading-xs dui-btn-outline'}"
		type="submit"
		form="signup"
	>
		Crear cuenta
	</Button>
	<div class="text-base">
		¿Ya tienes una cuenta?
		<a class="text-primary cursor-pointer" href="./login"> Ingresa aquí</a>
	</div>
</AuthLayout>
