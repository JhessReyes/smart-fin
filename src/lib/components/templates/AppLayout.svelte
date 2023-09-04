<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import { Icon, Tooltip } from '../atoms';
	import { appState } from '$lib/stores';

	export let title: string = 'Inicio';
	export let currentPage: string = '/';
	export let theme: string = 'light';
	export let menu: string | any[] = [
		[
			{
				label: 'Inicio',
				icon: 'dashboard',
				url: '/'
			},
			{
				label: 'Transacciones',
				icon: 'calculate',
				url: '/transactions'
			},
			{
				label: 'Categorías',
				icon: 'category',
				url: '/categories'
			},
			{
				label: 'Presupuestos',
				icon: 'wallet',
				url: '/budgets',
				submenu: []
			}
		]
	];

	const toggleTheme = (arg: string) => {
		typeof document != 'undefined' && document?.body?.setAttribute('data-theme', arg);
	};

	$: toggleTheme(theme);
</script>

<div class="prose max-w-none flex h-screen bg-base-200">
	<nav class="flex flex-col w-auto bg-base-100 rounded-r-xl relative">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class={`h-20 cursor-pointer p-4  ${!$appState.collapsed && 'pt-8'}`}
			on:click={() => ($appState.collapsed = !$appState.collapsed)}
		>
			{#if !$appState.collapsed}
				<div
					transition:slide={{ duration: 500, axis: 'x' }}
					class="flex items-center justify-between flex-row h-full"
				>
					<Icon
						name="attach_money"
						className="text-secondary px-1 text-4xl bg-base-200 rounded-full"
					/>
					<h1
						class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent 
						 w-full m-0 italic text-center text-4xl`}
					>
						SmartFin
					</h1>
				</div>
			{:else}
				<div in:slide={{ delay: 600 }} class="flex items-center justify-between flex-col h-full">
					<Icon
						name="attach_money"
						className="text-secondary px-1 text-4xl bg-base-200 rounded-full"
					/>
					<h1
						class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent 
						text-sm m-0 italic text-center`}
					>
						Smart Fin
					</h1>
				</div>
			{/if}
		</div>
		<ul class="grow flex flex-col justify-between pl-0">
			<div>
				{#each menu as menuItem, i}
					{#each menuItem as item}
						<li
							class="{`p-0 m-0 w-full group not-prose cursor-pointer hover:text-secondary ${
								currentPage == item.url ? 'text-secondary hover:drop-shadow-sm' : ''
							}`}}"
						>
							<a
								class={`p-0 w-full m-0 font-medium flex items-center`}
								href={item.url}
								data-sveltekit-preload-data
								data-sveltekit-preload-code
							>
								<div
									class={`${
										currentPage == item.url && 'bg-gradient-to-r from-base-200 to-base-100'
									} px-8 py-4 group-hover:bg-gradient-to-r from-base-200 to-base-100 group-hover:text-secondary`}
								>
									<Tooltip className="tooltip-right items-center flex gap-3" tip={item?.label}>
										<Icon name={item.icon} className="text-2xl font-normal" />
									</Tooltip>
								</div>
								{#if !$appState.collapsed}
									<span transition:slide={{ duration: 500, axis: 'x' }}>{item.label}</span>
								{/if}
							</a>
						</li>
						{#if !$appState.collapsed}
							{#each item?.submenu || [] as subItem}
								<a
									href={subItem?.url}
									class={`w-full px-5 py-3 m-0 pl-16 font-medium flex items-center gap-3  hover:bg-base-200 ${
										currentPage == subItem.url
											? 'bg-gradient-to-l from-base-200 to-base-100 hover:drop-shadow-sm'
											: ''
									}`}
									data-sveltekit-preload-data
									data-sveltekit-preload-code
									transition:slide={{ duration: 100 }}
								>
									<span class="font-medium"><span class="text-xl">+</span> {subItem?.label}</span>
								</a>
							{/each}
						{/if}
					{/each}
					{#if i < menu.length - 1}
						<div class="divider my-5" />
					{/if}
				{/each}
			</div>

			<div
				class={`flex items-center ${
					$appState.collapsed ? 'flex-col' : 'flex-row justify-between card px-6'
				} gap-5`}
			>
				<div class="avatar">
					<div class="w-10 rounded-lg bg-base-200 text-center" />
				</div>
				{#if !$appState.collapsed}
					<div in:slide={{ axis: 'x' }} class={`flex gap-5 flex-row`}>
						<label class="swap swap-rotate">
							<input
								type="checkbox"
								checked={$appState.theme}
								on:change={() => ($appState.theme = !$appState.theme)}
							/>
							<Icon name="light_mode" className="swap-off" />
							<Icon name="dark_mode" className="swap-on" />
						</label>
						<Icon name="logout" className="text-2xl" />
					</div>
				{:else}
					<div in:slide={{ axis: 'x', delay: 200 }} class={`flex gap-5 flex-col`}>
						<label class="swap swap-rotate">
							<input
								type="checkbox"
								checked={$appState.theme}
								on:change={() => ($appState.theme = !$appState.theme)}
							/>
							<Icon name="light_mode" className="swap-off" />
							<Icon name="dark_mode" className="swap-on" />
						</label>
						<Icon name="logout" className="text-2xl" />
					</div>
				{/if}
			</div>
		</ul>
	</nav>
	<div class="flex flex-col grow overflow-hidden max-h-screen p-5">
		<header class="h-12 shrink-0 flex gap-5 w-full justify-between">
			<div class="flex items-center gap-1">
				<div class="flex items-center gap-5">
					<!-- <Icon name={'attach_money'} className="text-4xl font-bold" /> -->
					<h1 class="m-0">{title || 'Inicio'}</h1>
				</div>
			</div>
			<slot name="actions"><!-- optional fallback --></slot>
		</header>
		<main class="py-5 grow overflow-x-hidden overflow-y-auto">
			<slot />
		</main>
	</div>
</div>
