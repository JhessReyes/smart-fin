<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticIn, sineIn, sineInOut, sineOut } from 'svelte/easing';
	import { Loading } from '../atoms';

	export let className: string = '';
	export let loading: boolean = true;
</script>

<div
	in:scale={{ duration: 500, easing: sineIn }}
	out:scale={{ duration: 250, easing: sineOut }}
	class={`h-full overflow-hidden ${className}`}
>
	{#if loading}
		{#if $$slots.loader}
			<slot name="loader" />
		{:else}
			<div class="flex items-center justify-center h-full font-medium">
				<Loading className="loading-lg" />
			</div>
		{/if}
	{:else}
		<slot />
	{/if}
</div>
