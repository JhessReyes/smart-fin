<script lang="ts">
	import Icon from '@iconify/svelte';
	import { v4 as uuidv4 } from 'uuid';

	export let open: boolean = false;
	let className: string = '';
	let dialog: HTMLDialogElement;
	const id = uuidv4();

	export { className as class };
	$: open ? dialog?.showModal() : dialog?.close();
</script>

<dialog {id} class="dui-modal" bind:this={dialog}>
	{#key open}
		{#if $$slots.default}
			<div class="dui-modal-box {className}">
				<div class="dui-modal-top flex justify-between w-full py-2">
					<slot name="title"><!-- optional fallback --></slot>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<span on:click={(e) => (open = false)}>
						<Icon
							icon="line-md:close-small"
							class="cursor-pointer rounded-full p-1 shadow-sm shadow-secondary w-6 h-6"
						/>
					</span>
				</div>
				<slot><!-- optional fallback --></slot>
			</div>
		{/if}
	{/key}
</dialog>
