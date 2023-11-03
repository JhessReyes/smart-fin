<script context="module">
	const ADD_CATEGORY = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
  }
}`;
	const UPDATE_CATEGORY = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    id
    name
  }
}`;
</script>

<script lang="ts">
	import { mutationFetch } from '$lib/client';
	import { Button, Input } from '$lib/components/atoms';
	import { Category } from '$lib/schemas';
	import { addToast } from '$lib/stores';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	export let category = new Category();
	export let open;
	const queryClient = useQueryClient();
	const mutationCategory = createMutation({
		mutationKey: category?.id ? ['addCategory'] : ['updateCategory'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data: any) => {
			return await mutationFetch({
				query: data?.id ? UPDATE_CATEGORY : ADD_CATEGORY,
				variables: {
					input: data
				}
			});
		},
		onSuccess: async (response) => {
			console.log(response);
			if (response?.errors || !response?.data) {
				addToast(
					'Fail!',
					`Oops, ha ocurrido un error al ${category?.id ? 'actualizar' : 'crear'} la categoria`,
					'error'
				);
			} else {
				addToast(
					'Success!',
					`Se ha ${category?.id ? 'actualizado' : 'creado'} correctamente la categoria`,
					'success'
				);
				open = false;
				await queryClient.invalidateQueries();
			}
		}
	});
</script>

<form
	on:submit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		$mutationCategory.mutate(category);
	}}
>
	<h2 class="text-center">{category?.id ? 'Actualizar' : 'Crear'} Categoria</h2>
	<span>Nombre</span>
	<Input placeholder="Nombre de la categoria" bind:value={category.name} />

	<div class="dui-modal-action">
		<Button class="dui-btn-ghost" on:click={() => (open = false)}>Cacelar</Button>
		<Button class="dui-btn-primary" type="submit">{category?.id ? 'Actualizar' : 'Guardar'}</Button>
	</div>
</form>
