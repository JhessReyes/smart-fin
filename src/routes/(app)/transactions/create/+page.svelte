<script>
	import { Input, Toggle } from '$lib/components/atoms';
	import { Image, Upload } from '$lib/components/icons';
	import { appState } from '$lib/stores';

	$appState.title = 'Crear Transacción';
</script>

<div class="flex justify-between gap-10 h-full w-full overflow-y-auto">
	<div role="form" class="card shadow-md w-full h-full m-auto p-12 bg-base-100">
		<div class="flex flex-col gap-4 w-full">
			<Input placeholder="Nombre de la Transacción" />
			<Input placeholder="Monto de la Transacción" props={{ type: 'number' }} />
			<div class="flex justify-between">
				<span class="font-semibold"> Mes en curso </span>
				<div class="flex items-center gap-2">
					<span class="font-light text-sm">Agregar al mes en curso</span>
					<Toggle />
				</div>
			</div>
		</div>
	</div>
	<section role="complementary" class="card shadow-md w-full h-full m-auto p-12 bg-base-100 overflow-y-auto">
		<div class="card bg-base-200 p-6 h-72 flex items-center justify-center gap-4">
			<svelte:component this={Image} class="w-24 h-24" />
			<div class="flex gap-2 items-center">
				<svelte:component this={Upload} class="w-4 h-4" />
				<span class="text-secondary underline"> Subir archivo </span>
			</div>
			<div class="flex flex-col items-center text-center">
				Sube un archivo para tu transacción
				<span class="text-sm">
					Formato de archivos <strong> jpeg, png </strong> Tamaño Recomendado
					<strong> 600x600 (1:1) </strong>
				</span>
			</div>
		</div>
		<h4>Imagenes Adicionales</h4>
		<div class="grid grid-cols-2 gap-4 h-auto">
			<div class="card bg-base-200 p-6 h-auto flex flex-col items-center justify-center gap-4">
				<svelte:component this={Image} class="w-24 h-24" />
				<div class="flex gap-2 items-center">
					<svelte:component this={Upload} class="w-4 h-4" />
					<span class="text-secondary"> Subir archivo </span>
				</div>
			</div>
			<div class="card p-6 h-72 border-dotted border-4" />
		</div>
	</section>
</div>
