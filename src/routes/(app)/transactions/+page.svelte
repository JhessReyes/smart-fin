<script lang="ts">
	import { TRANSACTIONS } from '$lib/api/transactions';
	import { queryFetch } from '$lib/client';
	import { Module, Table } from '$lib/components/organisms';
	import { addToast, appState } from '$lib/stores';
	import type { TableHead } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';

	$appState.title = 'Transacciones';
	let headers: Array<TableHead> = [
		{ sortable: true, key: 'name', label: 'Nombre' },
		{ sortable: true, key: 'description', label: 'Descripcion' },
		{ sortable: true, key: 'amount', label: 'Monto' },
		{ sortable: true, key: 'category', label: 'Categoria' }
	];

	let rows: any[] = [];

	const queryTransactions = createQuery({
		...queryFetch(['transactions'], {
			query: TRANSACTIONS,
			variables: {
				options: {
					limit: 1000,
					page: 1
				}
			}
		}),
		refetchOnMount: 'always',
		onSuccess: async (response) => {
			console.log(response);
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener las transacciones', 'error');
			} else rows = await response?.data?.transactions?.rows;
		}
	});
</script>

<Module loading={$queryTransactions.isLoading || $queryTransactions.isRefetching}>
	<Table
		className="table-primary"
		{headers}
		{rows}
		on:sort={(event) => console.log(event)}
		pageSize={10}
		showPagination
	>
		<div slot="head" let:header>
			{header.label || ''}
		</div>
		<svelte:fragment slot="body" let:key let:row>
			{row[key]}
		</svelte:fragment>
	</Table>
</Module>
