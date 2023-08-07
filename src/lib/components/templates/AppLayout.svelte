<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Icon } from '../atoms';
	import { appState } from '$lib/stores';

	export let collapsed: boolean = false;
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
				label: 'Gastos',
				icon: 'shopping_cart',
				url: '/expenses'
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
	<nav
		class="flex flex-col w-auto bg-base-100 rounded-r-3xl transition delay-150 ease-in-out overflow-y-auto"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class={`h-24 flex rounded-tr-xl cursor-pointer  ${collapsed ? 'p-4' : 'px-8 w-72'}`}
			on:click={() => (collapsed = !collapsed)}
		>
			<h1
				class={`text-transparent bg-clip-text px-1 bg-gradient-to-r from-secondary to-accent flex items-center justify-between ${
					collapsed ? 'flex-col text-sm' : 'inline'
				} w-full m-0 italic text-center items-center font-medium`}
			>
				<Icon
					name="attach_money"
					className="text-secondary px-1 text-4xl bg-base-200 rounded-full"
				/> Smart Fin
			</h1>
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
								class={`p-0 w-full m-0 font-medium transition-all flex items-center gap-3`}
								href={item.url}
								data-sveltekit-preload-data
								data-sveltekit-preload-code
							>
								<div
									class={`${
										currentPage == item.url && 'bg-gradient-to-r from-base-200 to-base-100'
									} px-8 py-4 group-hover:bg-gradient-to-r from-base-200 to-base-100 group-hover:text-secondary`}
								>
									<Icon name={item.icon} className="text-2xl font-normal" />
								</div>
								<span class={`${collapsed ? 'hidden' : 'inline'}`}>{item.label}</span>
							</a>
						</li>
						{#if !collapsed}
							{#each item?.submenu || [] as subItem}
								<a
									href={subItem?.url}
									class={`w-full px-5 py-3 m-0 pl-16 font-medium transition-all flex items-center gap-3  hover:bg-base-200 ${
										currentPage == subItem.url
											? 'bg-gradient-to-l from-base-200 to-base-100 hover:drop-shadow-sm'
											: ''
									}`}
									data-sveltekit-preload-data
									data-sveltekit-preload-code
									transition:slide={{ duration: 100 }}
								>
									asd
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
					collapsed ? 'flex-col' : 'flex-row justify-between card shadow-xl p-5 m-2'
				} gap-5`}
			>
				<div class="avatar">
					<div class="w-10 rounded-lg bg-base-200 text-center" />
				</div>
				<div class={`flex gap-5 ${collapsed ? 'flex-col' : 'flex-row'}`}>
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
		<main class="py-5 grow overflow-x-hidden">
			<slot />
		</main>
	</div>
</div>
