<script context="module">
	const CATEGORIES = `query Categories {
  categories {
    rows {
      id
      name
    }
    defaults {
      id
      name
    }
  }
}`;

	const DELETE_CATEGORY = `mutation DeleteCategory($categoryId: ID!) {
  deleteCategory(categoryId: $categoryId) {
    id
    name
  }
}`;
</script>

<script lang="ts">
	import { mutationFetch, queryFetch } from '$lib/client';
	import { Button, Drawer, Icon } from '$lib/components/atoms';
	import { Card, Search } from '$lib/components/molecules';
	import { Module } from '$lib/components/organisms';
	import { filterByValue } from '$lib/helpers';
	import { CategoryRequest } from '$lib/modules/categories';
	import { Category } from '$lib/schemas';
	import { addToast, appState } from '$lib/stores';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	$appState.title = 'Categorías';

	let categories: { defaults: any[]; rows: any[] };
	let selected = null;
	let open = false;
	let value: string;
	const queryClient = useQueryClient();
	const queryCategories = createQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			return queryFetch({
				query: CATEGORIES,
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
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener las categorias', 'error');
			} else {
				categories = await response?.data?.categories;
			}
		}
	});

	const deleteCategory = createMutation({
		mutationKey: ['deleteCategory'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data: any) => {
			return await mutationFetch({
				query: DELETE_CATEGORY,
				variables: {
					categoryId: data?.id
				}
			});
		},
		onSuccess: async (response) => {
			console.log(response);
			if (response?.errors || !response?.data) {
				addToast('Fail!', `Oops, ha ocurrido un error al eliminar la categoria`, 'error');
			} else {
				addToast('Success!', `Se ha eliminado correctamente la categoria`, 'success');
				await queryClient.invalidateQueries();
			}
		}
	});
	$: if (!open) {
		selected = false;
	}
</script>

<Drawer bind:open class="dui-drawer-end">
	<Module loading={$queryCategories?.isLoading || $queryCategories?.isRefetching}>
		<div class="flex flex-col gap-10">
			<div class="flex justify-between">
				<Search bind:value />
				<Button
					class="dui-btn-primary dui-btn-md"
					iconProps={{ name: 'add' }}
					on:click={() => (open = true)}>Agregar Categoría</Button
				>
			</div>
			<div>
				<h2 class="m-0">Categorías Predeterminadas</h2>
				<h6>Estas categorias estan hechas para que empieces con el control de tus finanzas</h6>
				<div class="grid grid-cols-4 gap-4 py-4">
					{#each filterByValue(categories?.defaults?.length > 0 ? categories?.defaults : [{}], value) as category}
						<Card title={category?.name} />
					{/each}
				</div>
			</div>
			<div>
				<h2>Tus Categorías</h2>
				<h6>Todas tus categorías en un solo lugar</h6>
				<div class="grid grid-cols-4 gap-4 py-4">
					{#each filterByValue(categories?.rows?.length > 0 ? categories?.rows : [{}], value) as category}
						<Card title={category?.name} class="cursor-pointer">
							<div class="dui-modal-action">
								<Icon
									name="edit"
									className="rounded-full dui-btn dui-btn-outline dui-btn-warning w-12 h-12 flex items-center justify-center"
									on:click={() => {
										selected = category;
										console.log(selected);
										open = true;
									}}
								/>
								<Icon
									name="delete"
									className="rounded-full dui-btn dui-btn-outline dui-btn-error w-12 h-12 flex items-center justify-center"
									on:click={() => {
										$deleteCategory.mutate(category);
									}}
								/>
							</div>
						</Card>
					{/each}
				</div>
			</div>
		</div>
	</Module>

	<svelte:fragment slot="drawer-side">
		<ul class="menu w-auto min-h-full bg-base-200 text-base-content px-10 gap-2 m-0">
			{#key selected}
				<CategoryRequest category={selected ? selected : new Category()} bind:open />
			{/key}
		</ul>
	</svelte:fragment>
</Drawer>
