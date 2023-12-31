<script lang="ts">
	import { ME } from '$lib/api/auth';
	import { app } from '$lib/api/firebase';
	import { UPDATE_USER } from '$lib/api/me';
	import { mutationFetch, queryFetch } from '$lib/client';
	import { Avatar, Button } from '$lib/components/atoms';
	import { Email, Rename } from '$lib/components/icons';
	import { addToast, appState } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import {
		EmailAuthProvider,
		getAuth,
		reauthenticateWithCredential,
		updatePassword,
		updateProfile
	} from 'firebase/auth';
	import { Input, List, Tabs } from 'stwui';

	$appState.title = 'Perfil';

	interface Tab {
		href: string;
		title: string;
	}

	let me: any = undefined;
	let password: any = { oldPassword: null, newPassword: null, verifyPassword: null };
	let passwordDisabled: boolean = true;
	const queryClient = useQueryClient();
	const tabs: Tab[] = [
		{
			href: '#account',
			title: 'Configuración de cuenta'
		},
		{
			href: '#notification',
			title: 'Notificaciones'
		}
	];

	const items = [
		{
			title: 'California 123.123.123.123',
			description: 'Chrome on macOS'
		},
		{
			title: 'Rome 24.456.355.98',
			description: 'Safari on iPhone'
		}
	];
	let currentTab = '#account';

	const resetPassword = async () => {
		if (password.oldPassword === password.newPassword) {
			addToast('Fail!', 'La contraseña nueva no puede ser igual a la anterior', 'error');
			return;
		}
		const auth = getAuth(app);
		let user = auth.currentUser;
		const credential = EmailAuthProvider.credential(user?.email, password.oldPassword);
		const result = await reauthenticateWithCredential(user, credential).catch((error) => {
			const message = error.message;
			if (message === 'Firebase: Error (auth/invalid-login-credentials).') {
				addToast('Fail!', 'No se ha podido obtener las credenciales', 'error');
			}
		});
		//@ts-ignore
		await updatePassword(result?.user, password.newPassword)
			.then((res) => {
				addToast('Success!', `Se ha actualizado la contraseña correctamente`, 'success');
			})
			.catch((error) => {
				const message = error.message;
				if (message === 'Firebase: Error (auth/wrong-password).') {
					addToast('Fail!', 'Creedenciales inválidas', 'error');
				} else {
					console.error(error);
					addToast('Fail!', 'Error: no se ha podido actualizar la contraseña', 'error');
				}
			});
	};

	const updateInfo = () => {
		//@ts-ignore
		$mutationMe.mutate({ id: me?.id, name: me?.name });
	};

	const queryMe = createQuery({
		queryKey: ['me'],
		queryFn: async () => {
			return queryFetch({
				query: ME
			})();
		},
		refetchOnMount: 'always',
		onSuccess: async (res) => {
			if (res?.errors || !res?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener las transacciones', 'error');
			} else me = await res?.data?.me;
		}
	});

	const mutationMe = createMutation({
		mutationKey: ['updateMe'],
		mutationFn: async (data: any) => {
			const auth = getAuth(app);
			await updateProfile(auth.currentUser, {
				displayName: data?.name
			}).then((res) => {
				console.log('aaaaaa', res);
			});

			return await mutationFetch({
				query: UPDATE_USER,
				variables: {
					input: data
				}
			});
		},
		onSuccess: async (response) => {
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al actualizar la información', 'error');
			} else {
				addToast('Success!', `Se ha enviado actualizado la información correctamente`, 'success');
			}
			await queryClient.invalidateQueries(['me']);
		}
	});

	$: password.newPassword == password.verifyPassword
		? password.newPassword?.length > 5
			? (passwordDisabled = false)
			: (passwordDisabled = true)
		: (passwordDisabled = true);
</script>

<div class="flex w-full gap-4 h-full">
	<div class="dui-card bg-base-100 shadow-lg p-4 not-prose flex-0 h-full">
		<div class="flex flex-col items-center gap-4">
			<div class="flex flex-col items-center">
				<Avatar class="rounded-full w-32 text-4xl" image={$appState.user?.photoURL} />
				<h2>{me?.name || $appState.user?.displayName}</h2>
				<div class="flex gap-2 items-center justify-center">
					<Icon icon="line-md:email" />
					<h5 class="text-sm m-0 p-0">{$appState.user?.email}</h5>
				</div>
				<h1
					class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent 
						text-sm m-0 italic text-center`}
				>
					Smart Fin
				</h1>
			</div>
			<ul class="flex flex-col gap-4">
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Transacciones realizadas</h4>
					<span class="dui-badge dui-badge-info dui-badge-outline m-0 h-fit"
						>{me?.transactions?.length}</span
					>
				</li>
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Presupuestos cumplidos</h4>
					<span class="dui-badge dui-badge-warning dui-badge-outline m-0 h-fit"
						>{me?.budgets?.length}</span
					>
				</li>
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Categorias creadas</h4>
					<span class="dui-badge dui-badge-success dui-badge-outline m-0 h-fit"
						>{me?.categories?.length}</span
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="dui-card bg-base-100 shadow-lg p-4 not-prose flex-1 gap-4">
		<Tabs {currentTab} variant="full-width">
			{#each tabs as tab, i}
				<Tabs.Tab key={tab.href} href={tab.href} on:click={() => (currentTab = tab.href)}>
					<!-- <Tabs.Tab.Icon slot="icon" data={tab.data} /> -->
					{tab.title}
				</Tabs.Tab>
			{/each}
		</Tabs>
		<div class="overflow-auto flex flex-col gap-4">
			{#if $queryMe.isLoading || $queryMe.isRefetching}
				cargando...
			{:else if currentTab == '#account'}
				<h2>Datos Generales</h2>
				<div class="grid grid-cols-2 gap-4">
					<Input name="input" bind:value={me.name}>
						<Input.Label slot="label">Nombre</Input.Label>
						<Input.Leading slot="leading" data={Rename} color="hsl(var(--bc))" />
					</Input>
					<Input name="input" disabled bind:value={me.currency}>
						<Input.Label slot="label">Moneda</Input.Label>
					</Input>
				</div>

				<Button type="button" class="dui-btn dui-btn-secondary w-fit" on:click={updateInfo}>
					Actualizar Información
				</Button>
				<h2>Contraseña</h2>
				<div class="grid grid-cols-2 gap-4">
					<Input type="password" name="input" showPasswordToggle bind:value={password.oldPassword}>
						<Input.Label slot="label">Contraseña Actual</Input.Label>
					</Input>
					<Input type="password" name="input" showPasswordToggle bind:value={password.newPassword}>
						<Input.Label slot="label">Nueva Contraseña</Input.Label>
					</Input>
					<Input
						type="password"
						name="input"
						showPasswordToggle
						bind:value={password.verifyPassword}
					>
						<Input.Label slot="label">Confirmar Contraseña</Input.Label>
					</Input>
				</div>
				{#if password.newPassword && password.verifyPassword}
					{#if password.newPassword != password.verifyPassword}
						<div class="dui-alert dui-alert-error h-auto m-0 px-4 py-2">
							<Icon
								icon="line-md:close-small"
								class="rounded-full p-1 shadow-sm shadow-secondary w-6 h-6"
							/>
							<span>Las contraseñas no coinciden.</span>
						</div>
					{/if}
					{#if password.newPassword.length < 6}
						<div class="dui-alert dui-alert-error h-auto m-0 px-4 py-2">
							<Icon
								icon="line-md:close-small"
								class="rounded-full p-1 shadow-sm shadow-secondary w-6 h-6"
							/>
							<span>La contraseña debe tener al menos 6 digitos.</span>
						</div>
					{/if}
				{/if}
				<Button
					type="button"
					class="dui-btn dui-btn-secondary w-fit"
					disabled={passwordDisabled}
					on:click={resetPassword}
				>
					Actualizar Contraseña
				</Button>
				<!-- <h2>Sesiones</h2>
				<List>
					{#each me?.sessions as item}
						<List.Item>
							<List.Item.Leading slot="leading">
								<List.Item.Leading.Icon slot="icon" data={Email} />
							</List.Item.Leading>
							<List.Item.Content slot="content">
								<List.Item.Content.Title slot="title">{item.title}</List.Item.Content.Title>
								<List.Item.Content.Description slot="description">
									{item.description}
								</List.Item.Content.Description>
							</List.Item.Content>
							<List.Item.Extra slot="extra" placement="start">
								<Icon
									icon="line-md:close-small"
									class="cursor-pointer rounded-full p-1 shadow-sm shadow-secondary w-6 h-6"
								/>
							</List.Item.Extra>
						</List.Item>
					{/each}
				</List> -->
			{/if}
		</div>
	</div>
</div>
