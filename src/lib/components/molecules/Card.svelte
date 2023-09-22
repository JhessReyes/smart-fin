<script lang="ts">
	import { Icon } from '../atoms';

	export let title: string = 'Chris Newton';
	export let background: string = 'bg-success';
	export let progressProps: object = {};
	export let iconProps: object = {};
	export let className: string = '';

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
	class={`card bg-white flex flex-row gap-4 rounded-md p-5 ${className} shadow-lg hover:bg-base-200`}
	on:click
>
	<Icon
		name="pattern"
		className="rounded-full {background} w-12 h-12 flex items-center justify-center"
		{...iconProps}
	/>
	<div class="flex flex-col gap-2 w-full">
		<div class="flex justify-between">
			<h2 class="m-0">{title}</h2>
			<slot><!-- optional fallback --></slot>
		</div>
		<progress class="progress w-full {background}" value={random()} max="100" {...progressProps} />
	</div>
</div>
