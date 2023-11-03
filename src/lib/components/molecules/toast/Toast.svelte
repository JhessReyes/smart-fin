<script>
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import ToastIcon from './ToastIcon.svelte';
	import ToastProgress from './ToastProgress.svelte';
	import { removeToast, toasts } from '$lib/stores';
	import Cancel from '$lib/components/icons/Cancel.svelte';
</script>

{#if $toasts}
	<div
		class="z-30 w-screen max-w-xs absolute top-4 translate-x-1/2 sm:translate-x-0 right-1/2 sm:top-8 sm:right-8 flex flex-col-reverse gap-4"
	>
		{#each $toasts as { id, title, message, type } (id)}
			<div
				in:fade
				animate:flip={{ duration: 300 }}
				out:fly={{ x: 10, duration: 200 }}
				role="alert"
				class="relative bg-white rounded-md shadow-lg overflow-hidden"
			>
				<div class="p-2 px-4">
					<div class="flex items-center">
						<ToastIcon toastType={type} />
						<div class="flex flex-col ml-3 p-3 border-l border-neutral-200 gap-2">
							<p class="m-0 text-sm font-semibold text-neutral-900">{title}</p>
							<p class="m-0 text-sm font-normal text-neutral-700">{message}</p>
						</div>
					</div>
					<button
						on:click={() => removeToast(id)}
						class="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
						><Cancel class="text-neutral-900" /><span class="sr-only">Remove notification</span
						></button
					>
				</div>
				<ToastProgress toastType={type} />
			</div>
		{/each}
	</div>
{/if}
