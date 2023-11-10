<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Icon as MaterialIcon } from '../atoms';
	import { appState } from '$lib/stores';

	export let title: string = 'Chris Newton';
	export let background: string = 'bg-success';
	export let progressProps: object | any = {};
	export let iconProps: object = {};
	export let className: string = '';
	export let showProgress: boolean = false;
	export { className as class };

	const random = () => {
		// Genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo)
		const numeroDecimal = Math.random();
		// Escala el número decimal para obtener un número entre 0 y 100 (ambos inclusive)
		const numeroAleatorio = Math.floor(numeroDecimal * 101); // Multiplicamos por 101 para incluir el 100
		return numeroAleatorio;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`dui-card bg-base-100 flex flex-row gap-4 rounded-md p-5 ${className} shadow-lg hover:bg-base-200`}
	on:click
>
	<MaterialIcon
		name="pattern"
		className="rounded-full {background} w-12 h-12 flex items-center justify-center"
		{...iconProps}
	/>
	<div class="flex flex-col gap-2 w-full">
		<div class="flex justify-between">
			<h2 class="m-0">{title}</h2>
			<slot name="actions"><!-- optional fallback --></slot>
		</div>
		<slot><!-- optional fallback --></slot>

		{#if showProgress}
			<span class="mx-2">
				<strong>Limite: </strong>
				{$appState.currecy}
				{parseFloat(progressProps?.max).toFixed(2)}
			</span>
			<span class="mx-2">
				<strong>Registro: </strong>
				{$appState.currecy}
				{parseFloat(progressProps?.value).toFixed(2)}
			</span>
			<div class="flex items-center gap-2">
				<progress
					class="dui-progress w-full {progressProps?.value >= progressProps?.max &&
						'!dui-progress-error'} {background}"
					value={random()}
					max="100"
					{...progressProps}
				/>
				{#if progressProps?.value >= progressProps?.max}
					<div class="text-error flex flex-col items-center justify-center">
						<Icon icon="line-md:chevron-small-double-up" class="text-error w-6 h-6 m-0" />
						{(progressProps?.value * 100) / progressProps?.max}%
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
