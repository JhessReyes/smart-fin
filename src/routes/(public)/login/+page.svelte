<script>
	import { Button, Input } from '$lib/components/atoms/';
	import '../../../app.css';
</script>

<div
	data-theme="emerald"
	class="grid grid-cols-2 h-screen prose max-w-none bg-base-100"
>
	<div
		class="flex flex-col justify-center gap-5 drop-shadow-md font-bold text-6xl rounded-tr-[0.5rem]"
	>
		<h1 class="text-6xl capitalize text-primary italic m-0 drop-shadow-lg px-12">
			<br /> Calcula Inteligente,
			<br />Gasta Sabiamente...
		</h1>
		<img
			src="/login-banner.svg"
			alt="SmartFin, Mejora tus finanzas."
			class="m-0 w-fit h-full drop-shadow-sm"
		/>
	</div>
	<div class="flex flex-col gap-5 justify-center bg-primary items-center prose-lg text-center p-12 bg-base">
		<p class="font-medium m-0 text-base">Inicia sesión.</p>

		<div class="w-full max-w-sm">
			<span class="label mb-1 p-0 text-sm">Correo electrónico</span>
			<Input
				props={{ placeholder: 'user@smartfin.com', label: 'Correo electrónico', type: 'email' }}
				className="border-none drop-shadow"
			/>
		</div>

		<div class="w-full max-w-sm">
			<span class="label mb-1 p-0 text-sm">Contraseña</span>
			<Input
				props={{ placeholder: '********', label: 'Password', type: 'password' }}
				className="border-none drop-shadow max-w-sm"
			/>
		</div>
		<Button className="drop-shadow w-full max-w-sm">
			<!-- on:click={(e) => signInWithEmailAndPassword(email, password)} -->
			<!-- <Icon name="login" className="mr-2" /> -->
			Entrar
		</Button>
	</div>
</div>
