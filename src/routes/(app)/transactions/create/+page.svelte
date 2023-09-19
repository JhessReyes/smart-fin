<script>
	import { Input, Toggle } from '$lib/components/atoms';
	import { appState } from '$lib/stores';

	$appState.title = 'Crear Transacción';
</script>

<div class="flex justify-between gap-10 h-full w-full">
	<div role="form" class="card shadow-md w-full m-auto p-12">
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
	<section role="complementary" class="card shadow-md w-full m-auto p-12">
		<div />
	</section>
</div>
