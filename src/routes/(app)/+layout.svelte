<script lang="ts">
	import '../../app.css';
	import { addToast, appState } from '$lib/stores';
	import { page } from '$app/stores';
	import { AppLayout } from '$lib/components/templates';
	import { Button, Icon } from '$lib/components/atoms';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import { Toast } from '$lib/components/molecules';

	export let data: PageData;
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>
<QueryClientProvider client={data?.queryClient}>
	<AppLayout
		theme={$appState?.theme ? 'light' : 'dark' || 'light'}
		currentPage={$page?.url?.pathname || ''}
		title={$appState.title}
	>
		<Toast />
		<svelte:fragment slot="actions">
			<Button
				class="p-2 btn-ghost btn-circle m-0"
				on:click={() => addToast('Welcome!', 'Let’s make something great!', 'default')}
				iconProps={{ name: 'notifications' }}
			/>
		</svelte:fragment>
		<slot><!-- app fallback --></slot>
	</AppLayout>
</QueryClientProvider>
