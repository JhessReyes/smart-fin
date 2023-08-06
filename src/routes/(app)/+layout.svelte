<script lang="ts">
	import '../../app.css';
	import { appState } from '$lib/stores';
	import { page } from '$app/stores';
	import { AppLayout } from '$lib/components/templates';

	$appState.theme = true;
</script>

<AppLayout
	theme={$appState?.theme ? 'light' : 'dark' || 'light'}
	currentPage={$page?.url?.pathname || ''}
	title={$appState.title}
>
	<slot><!-- app fallback --></slot>
</AppLayout>
