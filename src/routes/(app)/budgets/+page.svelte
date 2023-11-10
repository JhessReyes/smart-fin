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
	import { Button, Drawer, Icon as MaterialIncon } from '$lib/components/atoms';
	import { Card, Search } from '$lib/components/molecules';
	import { Module } from '$lib/components/organisms';
	import { filterByValue } from '$lib/helpers';
	import BudgetRequest from '$lib/modules/budgets/BudgetRequest.svelte';
	import { BudgetCard } from '$lib/modules/budgets/components';
	import { summedCategoryGroup } from '$lib/modules/budgets/helpers.js';
	import { Budget } from '$lib/schemas';
	import { addToast, appState } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import { onMount } from 'svelte';
	import { circIn } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	$appState.title = 'Presupuestos';

	export let data;
	let budgets: any[];
	let value: string;
	let selected: any = null;
	let categories: any = undefined;
	let open: boolean = false;
	let me: any = undefined;

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

	onMount(async () => {
		//@ts-ignore
		me = data?.queryClient?.getQueryData(['Me'])?.data?.me;
	});

	$: if (!open) selected = false;
	$: console.log('AAA', me?.transactions);
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
			<div class="flex md:flex-row flex-col h-full gap-8">
				<div class="bg-base-100 grow dui-card right-0 w-full p-5 gap-4">
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
							summedTransactions={summedCategoryGroup(me?.transactions)}
							on:click={(e) => (categories = budget.categories)}
						>
							<div class="dui-modal-action m-0">
								<MaterialIncon
									name="edit"
									className="rounded-full dui-btn dui-btn-outline dui-btn-warning w-12 h-12 flex items-center justify-center"
									on:click={() => {
										selected = budget;
										console.log(selected);
										open = true;
									}}
								/>
								<MaterialIncon
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
						class="bg-base-100 dui-card p-5 w-1/3 top-0"
						in:fly={{ x: '100%', duration: 300, easing: circIn }}
						out:fly={{ x: '100%', easing: circIn }}
					>
						<!-- out:fly={{ x: '100%', duration: 500 }} -->
						<div class="flex justify-between">
							<span class="text-xl font-bold">Categorias</span>
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span on:click={(e) => (categories = undefined)}>
								<Icon
									icon="line-md:close-small"
									class="cursor-pointer rounded-full p-1 shadow-sm shadow-secondary w-6 h-6"
								/>
							</span>
						</div>

						<div class="grid grid-cols-1 gap-4 py-4">
							{#each categories as c}
								<Card
									title={c?.category.name}
									progressProps={{
										max: c?.amount,
										value: summedCategoryGroup(me?.transactions)?.[c?.category.id] || 0
									}}
									showProgress
								/>
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
