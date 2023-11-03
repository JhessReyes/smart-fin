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
	const DELETE_BUDGET = `mutation DeleteBudget($budgetId: ID!) {
  deleteBudget(budgetId: $budgetId) {
    name
    id
  }
}`;
</script>

<script lang="ts">
	import { mutationFetch, queryFetch } from '$lib/client';
	import { Button, Drawer, Icon } from '$lib/components/atoms';
	import { Card, Search } from '$lib/components/molecules';
	import { Module } from '$lib/components/organisms';
	import { filterByValue } from '$lib/helpers';
	import BudgetRequest from '$lib/modules/budgets/BudgetRequest.svelte';
	import { BudgetCard } from '$lib/modules/budgets/components';
	import { Budget } from '$lib/schemas';
	import { addToast, appState } from '$lib/stores';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { slide } from 'svelte/transition';
	$appState.title = 'Presupuestos';

	let budgets: any[];
	let value: string;
	let selected: any = null;
	let categories: any = undefined;
	let open: boolean = false;

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
			categories = undefined;
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener los presupuestos', 'error');
			} else {
				budgets = await response?.data?.budgets?.rows;
			}
		}
	});

	const deleteBudget = createMutation({
		mutationKey: ['deleteBudget'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data: any) => {
			return await mutationFetch({
				query: DELETE_BUDGET,
				variables: {
					budgetId: data?.id
				}
			});
		},
		onSuccess: async (response) => {
			console.log(response);
			if (response?.errors || !response?.data) {
				addToast('Fail!', `Oops, ha ocurrido un error al eliminar el presupuesto`, 'error');
			} else {
				addToast('Success!', `Se ha eliminado correctamente el presupuesto`, 'success');
				await queryClient.invalidateQueries();
			}
		}
	});

	$: if (!open) {
		selected = false;
	}
</script>

<Drawer bind:open class="dui-drawer-end">
	<Module loading={$queryBudgets.isLoading || $queryBudgets.isRefetching}>
		<div class="flex flex-col gap-10">
			<div class="flex justify-between">
				<Search bind:value />
				<Button
					class="dui-btn-primary dui-btn-md"
					iconProps={{ name: 'add' }}
					on:click={() => (open = true)}>Agregar Presupuesto</Button
				>
			</div>
			<div class="flex md:flex-row flex-col items-center h-full gap-8">
				<div class="bg-base-100 grow dui-card h-screen right-0 w-full p-5 gap-4">
					<h3 class="my-0">Presupuestos</h3>
					<!-- <span class="flex justify-between">
						<strong class="text-lg capitalize">{month}</strong>
						<span>Numero de transacciones: </span>
						<span>Valor: Q. 500.00</span>
					</span> -->
					{#each filterByValue(budgets?.length > 0 ? budgets : [{}], value) as budget}
						<BudgetCard
							class="cursor-pointer"
							title={budget.name}
							categories={budget.categories}
							on:click={(e) => (categories = budget.categories)}
						>
							<div class="dui-modal-action">
								<Icon
									name="edit"
									className="rounded-full dui-btn dui-btn-outline dui-btn-warning w-12 h-12 flex items-center justify-center"
									on:click={() => {
										selected = budget;
										console.log(selected);
										open = true;
									}}
								/>
								<Icon
									name="delete"
									className="rounded-full dui-btn dui-btn-outline dui-btn-error w-12 h-12 flex items-center justify-center"
									on:click={() => {
										$deleteBudget.mutate(budget);
									}}
								/>
							</div>
						</BudgetCard>
					{/each}
				</div>
				{#if categories}
					<div
						class="bg-base-100 dui-card h-screen left-0 p-5 w-[40rem]"
						transition:slide={{ axis: 'x', duration: 500 }}
					>
						<span class="text-xl font-bold">Categorias</span>
						<div class="grid grid-cols-1 gap-4 py-4">
							{#each categories as c}
								<Card title={c?.category.name} progressProps={{ max: c?.amount, value: 0 }}>
									<span class="mx-2"><strong>Limite: </strong>Q.{c?.amount}</span>
								</Card>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</Module>

	<svelte:fragment slot="drawer-side">
		<ul class="menu w-auto min-h-full bg-base-200 text-base-content px-10 gap-2 m-0">
			{#key selected}
				<BudgetRequest bind:open budget={selected ? new Budget(selected) : new Budget()} />
			{/key}
		</ul>
	</svelte:fragment>
</Drawer>
