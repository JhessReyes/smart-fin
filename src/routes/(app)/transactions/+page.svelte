<script lang="ts">
	import { goto } from '$app/navigation';
	import { TRANSACTIONS } from '$lib/api/transactions';
	import { queryFetch } from '$lib/client';
	import { Button, Icon } from '$lib/components/atoms';
	import { Search } from '$lib/components/molecules';
	import { Module, Table } from '$lib/components/organisms';
	import { addToast, appState } from '$lib/stores';
	import type { TableHead } from '$lib/types';
	import { createQuery } from '@tanstack/svelte-query';

	$appState.title = 'Transacciones';
	let headers: Array<TableHead> = [
		{ key: 'select', label: '' },
		{ sortable: true, key: 'description', label: 'Descripcion' },
		{ sortable: true, key: 'amount', label: 'Monto' },
		{ sortable: true, key: 'date', label: 'Fecha' },
		{ sortable: true, key: 'category', label: 'Categoria' },
		{ key: 'fixed', label: '' },
		{ key: 'actions', label: '' }
	];

	let rows: any[] = [];

	const queryTransactions = createQuery({
		queryKey: ['transactions'],
		queryFn: async () => {
			return queryFetch({
				query: TRANSACTIONS,
				variables: {
					options: {
						limit: 1000,
						page: 1
					}
				}
			})();
		},
		refetchOnMount: 'always',
		onSuccess: async (response) => {
			console.log(response);
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener las transacciones', 'error');
			} else
				rows = await response?.data?.transactions?.rows.map((r) => ({
					...r,
					category: r?.category?.name
				}));
		}
	});
</script>

<Module loading={$queryTransactions?.isLoading || $queryTransactions?.isRefetching}>
	<div slot="actions" class="flex w-full justify-between">
		<Search />
		<Button
			class="dui-btn-primary dui-btn-md"
			iconProps={{ name: 'add' }}
			on:click={() => goto('transactions/create')}>Agregar Transaccion</Button
		>
	</div>
	<Table
		className="table-primary"
		{headers}
		{rows}
		on:sort={(event) => console.log(event)}
		pageSize={10}
		showPagination
	>
		<div slot="head" let:header class="w-full flex items-center">
			{#if header.key === 'select'}
				<!-- <input type="checkbox" class="dui-checkbox dui-checkbox-primary m-2" /> -->
			{:else}
				{header.label || ''}
			{/if}
		</div>
		<svelte:fragment slot="body" let:key let:row>
			{#if key === 'actions'}
				<Icon name="" className="text-yellow-500" />
			{:else if key === 'select'}
				<!-- 				<input type="checkbox" class="dui-checkbox dui-checkbox-primary m-auto" /> -->
			{:else if key === 'date'}
				<span
					>{new Date(row?.date).toLocaleDateString(undefined, {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</span
				>
			{:else if key === 'fixed'}
				<Icon name="star" className="text-yellow-500" />
			{:else if key === 'category'}
				<div class="dui-badge dui-badge-lg p-6 px-8 w-52 bg-green-100/25 text-green-500">
					{row?.category}
				</div>
			{:else}
				{row[key]}
			{/if}
		</svelte:fragment>
	</Table>
</Module>
