<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Loading } from '../atoms';

	let className: string = '';
	let loading: boolean = true;

	export { className as class, loading };
</script>

<div
	in:fly={{ x: -5, duration: 300, delay: 300 }}
	out:fly={{ x: 5, duration: 300 }}
	class={`p-5 h-full ${className}`}
>
	{#if loading}
		{#if $$slots.loader}
			<slot name="loader" />
		{:else}
			<div class="flex items-center justify-center h-full font-medium">
				<Loading className="loading-lg loading-dots text-secondary" />
			</div>
		{/if}
	{:else}
		{#if $$slots.actions}
			<slot name="actions" />
		{/if}
		<slot />
	{/if}
</div>
