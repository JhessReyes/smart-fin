<script context="module">
	const ADD_BUDGET = `mutation CreateBudget($input: CreateBudgetInput!) {
  createBudget(input: $input) {
    id
    name
  }
}`;

	const UPDATE_BUDGET = `mutation UpdateBudget($input: UpdateBudgetInput!) {
  updateBudget(input: $input) {
    id
    name
  }
}`;
</script>

<script lang="ts">
	import { mutationFetch } from '$lib/client';
	import { Button, Input, Modal } from '$lib/components/atoms';
	import { Budget } from '$lib/schemas';
	import { addToast } from '$lib/stores';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { SelectCategories } from '../categories/components';
	import { DatePicker } from 'stwui';
	import { categoriesState } from './store';
	import Icon from '@iconify/svelte';
	import type { IInputBudgetCategory } from '$lib/interfaces';
	import { onMount } from 'svelte';
	import { Calendar } from '$lib/components/icons';

	export let budget = new Budget();
	export let open: boolean;
	let add: boolean = false;
	let budgetCategory: IInputBudgetCategory = { amount: undefined, categoryId: undefined };
	let optionsCategory: any = [];

	const addCategory = (e: SubmitEvent) => {
		e?.preventDefault;
		const l = $categoriesState.length; // get our current categories list count
		const object = { amount: budgetCategory.amount, category: { id: budgetCategory.categoryId } };
		$categoriesState[l] = object;
		add = false;
	};
	const removeCategory = (index: number) => {
		$categoriesState = $categoriesState.filter(function (value: any, i: number) {
			if (i != index) return value;
		});
	};
	const queryClient = useQueryClient();
	const mutationCategory = createMutation({
		mutationKey: budget?.id ? ['addBudget'] : ['updateBudget'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data: any) => {
			console.log('AAA', data);
			data.categories = $categoriesState.map((c) => ({
				categoryId: c.category.id,
				amount: parseFloat(c.amount)
			}));
			return await mutationFetch({
				query: data?.id ? UPDATE_BUDGET : ADD_BUDGET,
				variables: {
					input: data
				}
			});
		},
		onSuccess: async (response) => {
			if (response?.errors || !response?.data) {
				addToast(
					'Fail!',
					`Oops, ha ocurrido un error al ${budget?.id ? 'actualizar' : 'crear'} el presupuesto`,
					'error'
				);
			} else {
				addToast(
					'Success!',
					`Se ha ${budget?.id ? 'actualizado' : 'creado'} correctamente el presupuesto`,
					'success'
				);
				await queryClient.invalidateQueries();
				open = false;
			}
		}
	});

	onMount(() => {
		$categoriesState = budget.categories;
	});
</script>

{#key open}
	<form
		on:submit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('ANTESD', budget);
			// $mutationCategory.mutate(budget);
		}}
	>
		<h2 class="text-center text-base-content">{budget?.id ? 'Actualizar' : 'Crear'} Presupuesto</h2>
		<div class="flex flex-col gap-4">
			<span class="text-sm font-medium">Nombre</span>
			<Input placeholder="Nombre del presupuesto" class="form-input" bind:value={budget.name} />
			<span class="text-sm font-medium">Inicio</span>
			<DatePicker
				name="date"
				showTime
				format="MMMM D, YYYY - h:mm A"
				placeholder={'Inicio del presupuesto'}
				bind:value={budget.start}
			>
				<DatePicker.Trailing slot="trailing" data={Calendar} />
			</DatePicker>
			<span class="text-sm font-medium">Final</span>
			<DatePicker
				name="date"
				showTime
				format="MMMM D, YYYY - H:mm"
				placeholder={'Inicio del presupuesto'}
				bind:value={budget.end}
			>
				<DatePicker.Trailing slot="trailing" data={Calendar} />
			</DatePicker>
			<span class="text-sm font-medium">Categorias</span>
			{#each $categoriesState as c, i}
				{#if c.category.id}
					<div class="flex justify-between">
						<span>
							{optionsCategory.find((o) => o.value == c.category.id)?.label || c?.category?.name}
						</span>
						<div class="flex gap-4">
							<strong>Q. {c.amount}</strong>
							{#key $categoriesState || open}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<div
									on:click={() => removeCategory(i)}
									class="cursor-pointer rounded-full m-auto p-1 shadow-sm shadow-secondary"
								>
									<Icon icon="line-md:close" />
								</div>
							{/key}
						</div>
					</div>
				{/if}
			{/each}
			<Button
				class="border-dotted border-2 border-secondary hover:bg-transparent hover:border-primary"
				on:click={() => (add = true)}
			>
				Agregar categoria
				<Icon icon="line-md:document-add" />
			</Button>

			<Modal bind:open={add} class="h-auto">
				<svelte:fragment slot="title">
					<h2 class="m-0">Agrega un limite para cada categoria</h2>
				</svelte:fragment>
				<form method="post" on:submit={addCategory}>
					<div class="flex flex-col gap-4">
						<SelectCategories
							bind:value={budgetCategory.categoryId}
							bind:options={optionsCategory}
						/>
						<span class="text-sm font-medium">Limite</span>
						<Input
							props={{ type: 'number', step: 0.01 }}
							bind:value={budgetCategory.amount}
							class="w-full dui-input-md"
							required
						/>
					</div>
					<div class="dui-modal-action">
						<button class="dui-btn" type="button" on:click={() => (add = false)}>Cancelar</button>
						<button class="dui-btn dui-btn-success" type="submit"
							>Agregar <Icon icon="line-md:confirm" /></button
						>
					</div>
				</form>
			</Modal>
		</div>
		<div class="dui-modal-action">
			<Button class="dui-btn-ghost" on:click={() => (open = false)}>Cacelar</Button>
			<Button class="dui-btn-primary" type="submit">{budget?.id ? 'Actualizar' : 'Guardar'}</Button>
		</div>
	</form>
{/key}
