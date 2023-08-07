<script lang="ts">
	import { Module, Table } from '$lib/components/organisms';
	import { appState } from '$lib/stores';
	import type { TableHead } from '$lib/types';
	import { faker } from '@faker-js/faker';

	$appState.title = 'Transacciones';
	let headers: Array<TableHead> = [
		{ sortable:true, key: 'name', label: 'Nombre' },
		{ sortable:true, key: 'description', label: 'Descripcion' },
		{ sortable:true, key: 'amount', label: 'Monto' },
		{ sortable:true, key: 'category', label: 'Categoria' }
	];

	let rows: any[] = [];

	const name = () => {
		for (let i = 0; i < 50; i++) {
			const element = {
				name: faker.person.firstName(),
				description: faker.person.jobDescriptor(),
				amount: faker.finance.amount(),
				category: faker.person.jobArea()
			};
			rows.push(element);
		}
	};

	$: name();
</script>

<Module loading={false}>
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
