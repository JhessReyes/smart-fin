<script lang="ts">
	import { Avatar, Button } from '$lib/components/atoms';
	import { Email, Rename } from '$lib/components/icons';
	import { appState } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { Input, List, Tabs } from 'stwui';

	$appState.title = 'Perfil';

	interface Tab {
		href: string;
		title: string;
	}

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
</script>

<div class="flex w-full gap-4 h-full">
	<div class="dui-card bg-base-100 shadow-lg p-4 not-prose flex-0 h-full">
		<div class="flex flex-col items-center gap-4">
			<Avatar class="rounded-full w-32 text-4xl" />
			<h2>Nathaniel Poole</h2>
			<span>Smart Fin</span>

			<ul class="flex flex-col gap-4">
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Transacciones realizadas</h4>
					<span class="dui-badge dui-badge-info dui-badge-outline m-0 h-fit">4</span>
				</li>
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Presupuestos cumplidos</h4>
					<span class="dui-badge dui-badge-warning dui-badge-outline m-0 h-fit">4</span>
				</li>
				<li class="flex flex-row items-center gap-8 justify-between">
					<h4 class="m-0">Categorias creadas</h4>
					<span class="dui-badge dui-badge-success dui-badge-outline m-0 h-fit">4</span>
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
		<div class="overflow-auto flex flex-col gap-2">
			{#if currentTab == '#account'}
				<h2>Datos Generales</h2>
				<div class="grid grid-cols-2 gap-4">
					<Input name="input">
						<Input.Label slot="label">Nombre</Input.Label>
						<Input.Leading slot="leading" data={Rename} color="hsl(var(--bc))" />
					</Input>
					<Input name="input">
						<Input.Label slot="label">Email</Input.Label>
						<Input.Leading slot="leading" data={Email} color="hsl(var(--bc))" />
					</Input>
					<Input name="input">
						<Input.Label slot="label">Moneda</Input.Label>
						<!-- <Input.Leading slot="leading" data={Rename} color="hsl(var(--bc))" /> -->
					</Input>
					<Input name="input" disabled>
						<Input.Label slot="label">Pais</Input.Label>
						<!-- <Input.Leading slot="leading" data={Email} color="hsl(var(--bc))" /> -->
					</Input>
				</div>
				<Button type="button" class="dui-btn dui-btn-secondary w-fit" disabled
					>Actualizar Información</Button
				>
				<h2>Contraseña</h2>
				<div class="grid grid-cols-2 gap-4">
					<Input type="password" name="input" showPasswordToggle>
						<Input.Label slot="label">Contraseña Actual</Input.Label>
						<!-- <Input.Leading slot="leading" color="hsl(var(--bc))" /> -->
					</Input>
					<Input type="password" name="input" showPasswordToggle>
						<Input.Label slot="label">Nueva Contraseña</Input.Label>
						<!-- <Input.Leading slot="leading" color="hsl(var(--bc))" /> -->
					</Input>
					<Input type="password" name="input" showPasswordToggle>
						<Input.Label slot="label">Confirmar Contraseña</Input.Label>
						<!-- <Input.Leading slot="leading" data={Rename} color="hsl(var(--bc))" /> -->
					</Input>
				</div>
				<Button type="button" class="dui-btn dui-btn-secondary w-fit" disabled
					>Actualizar Contraseña</Button
				>
				<h2>Sesiones</h2>
				<List>
					{#each items as item}
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
				</List>
			{/if}
		</div>
	</div>
</div>
