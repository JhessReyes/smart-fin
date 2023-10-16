<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Icon, Pagination } from '../atoms';
	import type { TableHead } from '$lib/types';

	const dispatch = createEventDispatcher();
	export let className: string = '';
	export let headers: Array<TableHead> = [];
	export let rows: Array<any> = [];
	export let footers: Array<any> = [];
	export let sort = {
		key: '',
		direction: true // true: asc, false: desc
	};
	export let pageSize = 25;
	export let currentPage = 1;
	export let totalPages: number = 1; // result depends of pageSize
	export let showPagination = false;

	let displayedData: Array<any> = [];
	let start: number;
	let end: number;
	function updateDisplayedData(data: any[], pageNumber: number) {
		start = (pageNumber - 1) * pageSize;
		end = start + pageSize;
		displayedData = data.slice(start, end);
	}

	//Sorting data
	function handleHeaderClick(header: { sortable?: any; key: any; direction?: boolean }) {
		if (header.sortable) {
			if (sort.direction) {
				rows = [...rows].sort((a, b) => {
					if (a[header.key] < b[header.key]) return -1;
					if (a[header.key] > b[header.key]) return 1;
					return 0;
				});
			} else {
				rows = [...rows].sort((a, b) => {
					if (a[header.key] > b[header.key]) return -1;
					if (a[header.key] < b[header.key]) return 1;
					return 0;
				});
			}
			// rows = orderByProperties([...rows], [header.key], [sort.direction ? 'asc' : 'desc'])
			updateDisplayedData(rows, currentPage);
			sort = {
				...header,
				direction: sort.direction === true ? false : true
			};
			dispatch('sort', sort);
		}
	}

	onMount(() => {
		updateDisplayedData(rows, currentPage);
	});

	$: showPagination === false && (pageSize = rows.length);
	$: updateDisplayedData(rows, currentPage);
	$: totalPages = Math.ceil(rows.length / pageSize);
</script>

<table class={'w-full ' + className}>
	<thead>
		<tr>
			{#each headers as header}
				<th on:click={() => handleHeaderClick(header)} class={`${!header?.label && 'w-4'}`}>
					<div class={`flex items-center justify-between ${header?.sortable && 'cursor-pointer'}`}>
						<slot name="head" key={header?.key} {header} />
						{#if header.sortable}
							{#if sort.key == header.key}
								<Icon name={sort.direction ? 'arrow_drop_up' : 'arrow_drop_down'} />
							{:else}
								<Icon name="sort" />
							{/if}
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each displayedData as row}
			<tr>
				{#each headers as header}
					<td>
						<slot name="body" key={header?.key} {row} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	{#if footers}
		<tfoot>
			<tr>
				{#each footers as footer}
					<th>
						<slot name="foot" key={footer?.key} {footer} />
					</th>
				{/each}
			</tr>
		</tfoot>
	{/if}
</table>

{#if $$slots.footer && showPagination === false}
	<slot name="footer" />
{:else if totalPages > 1}
	<div class="flex justify-between">
		<span>
			Mostrando {currentPage === totalPages ? displayedData.length : pageSize} datos del {start + 1}
			al {currentPage === totalPages ? start + displayedData.length : end}, Pagina {currentPage} de {totalPages}
		</span>
		<Pagination
			{currentPage}
			{totalPages}
			on:click={(e) => (currentPage = e?.detail?.value)}
			className="justify-end"
		/>
	</div>
{/if}
