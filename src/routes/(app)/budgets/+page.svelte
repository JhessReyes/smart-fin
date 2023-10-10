<script context="module">
	const BUDGETS = `query Budgets($page: Int, $limit: Int) {
  budgets(page: $page, limit: $limit) {
    length
    pages
    rows {
      id
      start
      name
      end
      status
      categories {
        category {
          name
          id
        }
		amount
      }
    }
  }
}`;
</script>

<script>
	import { queryFetch } from '$lib/client';
	import { Card } from '$lib/components/molecules';
	import { Module } from '$lib/components/organisms';
	import { BudgetCard } from '$lib/modules/budgets/components';
	import { addToast, appState } from '$lib/stores';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';

	$appState.title = 'Presupuestos';
	let month = new Date().toLocaleDateString(undefined, {
		month: 'long'
	});
	let budgets;
	let categories = undefined;

	const queryClient = useQueryClient();
	const queryBudgets = createQuery({
		queryKey: ['budgets'],
		queryFn: async () => {
			return queryFetch({
				query: BUDGETS,
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
			} else {
				budgets = await response?.data?.budgets;
			}
		}
	});

	$: console.log('object', categories);
</script>

<Module loading={$queryBudgets.isLoading || $queryBudgets.isRefetching}>
	<div class="flex items-center h-full w-full gap-8">
		<div class="bg-base-100 flex card h-full right-0 w-full p-5 gap-4">
			<h2 class="m-0">Presupuestos</h2>
			<span class="flex justify-between">
				<strong class="text-lg capitalize">{month}</strong>
				<span>Numero de transacciones: </span>
				<span>Valor: Q. 500.00</span>
			</span>
			{#each budgets.rows as budget}
				<BudgetCard
					class="cursor-pointer"
					title={budget.name}
					categories={budget.categories}
					on:click={(e) => (categories = budget.categories)}
				/>
			{/each}
		</div>
		<div class="bg-base-100 card h-full left-0 p-5 w-[50rem]">
			<span class="text-xl font-bold">Actividad</span>
			---
			<span class="text-xl font-bold">Categorias</span>
			{#if categories}
				{#each categories as c}
					<Card title={c?.category.name} progressProps={{ max: c?.amount, value: 0 }}>
						<span class="mx-2"><strong>Limite: </strong>Q.{c?.amount}</span>
					</Card>
				{/each}
			{/if}
		</div>
	</div>
</Module>
