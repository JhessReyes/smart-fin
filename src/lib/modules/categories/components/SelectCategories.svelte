<script context="module">
	const OPTION_CATEGORIES = `query Categories {
        categories {
            rows {
                value:id
                label:name
            }
            defaults {
                value:id
                label:name
            }
        }
    }`;
</script>

<script lang="ts">
	import { queryFetch } from '$lib/client';

	import { addToast } from '$lib/stores';

	import { createQuery } from '@tanstack/svelte-query';
	import { Select } from 'svelte-atoms';

	export let value: any = '';
	export let options: any = [];
	export let props: object = { size: 'medium' };

	const queryOptions = createQuery({
		queryKey: ['optionCategories'],
		queryFn: async () => {
			return queryFetch({
				query: OPTION_CATEGORIES,
				variables: {
					options: {
						limit: -1
					}
				}
			})();
		},
		refetchOnMount: 'always',
		onSuccess: async (response) => {
			if (response?.errors || !response?.data) {
				addToast('Fail!', 'Ocurrió un error al obtener las categorias', 'error');
			} else {
				const { defaults, rows } = response?.data?.categories;
				options.push(...defaults);
				options.push(...rows);
			}
		}
	});
</script>

<Select
	bind:value
	bind:options
	placeholder="Agregar Categoria"
	{...props}
	isLoading={$queryOptions?.isLoading || $queryOptions?.isRefetching}
/>
