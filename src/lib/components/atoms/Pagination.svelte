<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '.';

	const dispatch = createEventDispatcher();

	const click = (e: any) => {
		dispatch('click', { value: e });
	};

	export let currentPage = 1;
	export let maxItems = 7; //values 7, 9, 11, 13, 15
	export let totalPages = 1;
	export let className = '';

	function getPaginationItems(currentPage: number, last: number, maxLength: number) {
		const res = [];
		if (last <= maxLength) {
			for (let i = 1; i <= last; i++) {
				res.push(i);
			}
		} else {
			const firstPage = 1;
			const confirmedPages = 3;
			let deductedMaxLength = maxLength - confirmedPages;
			let sideLength = deductedMaxLength / 2;

			if (currentPage - firstPage < sideLength || last - currentPage < sideLength) {
				for (let j = 1; j <= sideLength + firstPage; j++) {
					res.push(j);
				}
				res.push(NaN);
				for (let k = last - sideLength; k <= last; k++) {
					res.push(k);
				}
			} else if (
				currentPage - firstPage >= deductedMaxLength &&
				last - currentPage >= deductedMaxLength
			) {
				const deductedSideLength = sideLength - 1;

				res.push(1);
				res.push(NaN);

				for (let l = currentPage - deductedSideLength; l <= currentPage + deductedSideLength; l++) {
					res.push(l);
				}

				res.push(NaN);
				res.push(last);
			} else {
				const isNearFirstPage = currentPage - firstPage < last - currentPage;

				if (isNearFirstPage) {
					for (let m = 1; m <= currentPage + 1; m++) {
						res.push(m);
					}

					res.push(NaN);
					res.push(last);
				} else {
					for (let o = last; o >= currentPage - 1; o--) {
						res.unshift(o);
					}

					res.unshift(NaN);
					res.unshift(1);
				}
			}
		}
		return res;
	}
</script>

<div class={`flex gap-4 ${className}`}>
	{#each getPaginationItems(currentPage, totalPages, maxItems) as item, i}
		{#if isNaN(item)}
			<Button className="!btn-ghost ">...</Button>
		{:else}
			<Button
				on:click={(e) => click(item)}
				className={`${currentPage == item ? 'btn-active' : '!btn-outline'}`}
				>{item}
			</Button>
		{/if}
	{/each}
</div>
