<script lang="ts">
	import '../../app.css';
	import { appState } from '$lib/stores';
	import { page } from '$app/stores';
	import { AppLayout } from '$lib/components/templates';
	import { Button, Icon } from '$lib/components/atoms';

	$appState.theme = true;
</script>

<AppLayout
	theme={$appState?.theme ? 'light' : 'dark' || 'light'}
	currentPage={$page?.url?.pathname || ''}
	title={$appState.title}
>
	<svelte:fragment slot="actions">
		<Button className="p-2 btn-ghost btn-circle m-0">
			<Icon className="" name={'notifications'} />
		</Button>
	</svelte:fragment>
	<slot><!-- app fallback --></slot>
</AppLayout>
