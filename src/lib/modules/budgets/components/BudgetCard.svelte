<script lang="ts">
	import { Icon as MaterialIcon } from '$lib/components/atoms';
	import { appState } from '$lib/stores';
	import Icon from '@iconify/svelte';
	export let title: string = 'Restaurantes y Cafe';
	export let categories: any[] = [];
	export let description: string = new Date().toLocaleDateString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	export let background: string = 'bg-success';
	export let progressProps: object = {};
	export let iconProps: object = {};
	export let className: string = '';
	export let summedTransactions: object | any = {};
	export let limit: number = 0;
	export let value: number = 0;
	export { className as class };

	const random = () => {
		// Genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo)
		const numeroDecimal = Math.random();
		// Escala el número decimal para obtener un número entre 0 y 100 (ambos inclusive)
		const numeroAleatorio = Math.floor(numeroDecimal * 101); // Multiplicamos por 101 para incluir el 100
		return numeroAleatorio;
	};

	const getLimit = (array: any[]): void => {
		limit = 0;
		for (let i = 0, l = array.length; i < l; i++) {
			limit += array[i].amount;
		}
	};

	const getValue = (array: any[]): void => {
		value = 0;
		for (let i = 0, l = array.length; i < l; i++) {
			value += summedTransactions[array[i].category.id] || 0;
		}
	};

	$: categories?.length && (getValue(categories), getLimit(categories));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`dui-card bg-base-200 flex flex-row gap-4 rounded-md p-5 ${className} shadow-lg hover:bg-base-200`}
	on:click
>
	<MaterialIcon
		name="pattern"
		className="rounded-full {background} w-12 h-12 flex items-center justify-center"
		{...iconProps}
	/>
	<div class="flex flex-col gap-2 w-full">
		<div class="flex justify-between">
			<span>
				<h2 class="m-0">{title}</h2>
				<span class="m-0">{description}</span>
			</span>
			<div class="flex gap-4 items-center justify-center">
				<span class="mx-2">
					<strong>Limite: </strong>
					{$appState.currecy}
					{parseFloat(limit.toString() || '0').toFixed(2)}
				</span>

				<slot><!-- optional fallback --></slot>
				<!-- <MaterialIcon
						name="push_pin"
						className="rounded-xl bg-info w-10 h-10 flex items-center justify-center"
					/>
					<MaterialIcon
						name="close"
						className="rounded-xl bg-info w-10 h-10 flex items-center justify-center"
					/> -->
			</div>
		</div>
		<div class="flex items-center gap-2">
			<progress
				class="dui-progress w-full {value >= limit && '!dui-progress-error'} {background}"
				{value}
				max={limit}
				{...progressProps}
			/>
			{#if value >= limit}
				<div class="text-error flex flex-col items-center justify-center">
					<Icon icon="line-md:chevron-small-double-up" class="text-error w-6 h-6 m-0" />
					{parseFloat((value * 100) / limit + '').toFixed(2)}%
				</div>
			{/if}
		</div>
		<!-- <progress class="dui-progress w-full {background}" {value} max={limit} {...progressProps} /> -->
	</div>
</div>
