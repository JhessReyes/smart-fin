<script>
	import { Check, Fire, Peace, Telegram, Warning } from '$lib/components/icons';

	export let toastType = 'default';

	let toastTypes = [
		{ format: 'default', component: Telegram, style: 'text-neutral-500' },
		{ format: 'brand', component: Peace, style: 'text-brand-500' },
		{ format: 'success', component: Check, style: 'text-green-500' },
		{ format: 'warning', component: Warning, style: 'text-yellow-500' },
		{ format: 'error', component: Fire, style: 'text-red-500' }
	];

	// @ts-ignore
	let iconComponent = toastTypes.find((type) => type.format === toastType).component;

	// @ts-ignore
	let iconStyle = toastTypes.find((type) => type.format === toastType).style;
</script>

<svelte:component this={iconComponent} class="{iconStyle} w-6 h-6" />
