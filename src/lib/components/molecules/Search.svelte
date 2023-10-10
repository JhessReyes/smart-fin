<script>
	import { onDestroy, tick } from 'svelte';
	import { slide } from 'svelte/transition';
	import { Button, Icon } from '../atoms';
	export let className = '';
	export let value = '';
	export let placeholder = 'Buscar...';
	export let open = false;

	/**
	 * @type {HTMLInputElement}
	 */
	let search;
	let clear = (/** @type {any} */ e) => {
		if (value === '') {
			open = false;
		} else {
			value = '';
			setTimeout(() => {
				search.focus();
			}, 10);
		}
	};

	function show() {
		open = true;
		setTimeout(() => {
			search.focus();
		}, 10);
	}

	onDestroy(async function destroy() {
		await tick();
		open = false;
	});
</script>

<div class="flex items-center bg-base-100 rounded-full px-1 {className}">
	<Icon name="search" className="bg-base-100 rounded-full !p-2 cursor-pointer" on:click={show} />
	{#if open}
		<div transition:slide|local={{ axis: 'x', duration: 200, delay: 50 }} class="flex items-center">
			<input
				bind:this={search}
				bind:value
				{placeholder}
				class="input-md input !bg-transparent !outline-none !border-none !bg-base-100 !p-0"
			/>
			<Icon
				name="cancel"
				className="bg-base-100 rounded-full !p-2 cursor-pointer"
				on:click={clear}
			/>
		</div>
	{/if}
</div>
