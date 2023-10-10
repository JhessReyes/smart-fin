<script>
	import { Module } from '$lib/components/organisms';
	import { BudgetCard } from '$lib/modules/budgets/components';
	import { appState } from '$lib/stores';

	$appState.title = 'Presupuestos';
	let month = new Date().toLocaleDateString(undefined, {
		month: 'long'
	});
</script>

<Module loading={false}>
	<div class="flex items-center h-full w-full gap-8">
		<div class="bg-base-100 flex card h-full right-0 w-full p-5 gap-4">
			<h2 class="m-0">Presupuestos</h2>
			<span class="flex justify-between">
				<strong class="text-lg capitalize">{month}</strong>
				<span>Numero de transacciones: </span>
				<span>Valor: Q. 500.00</span>
			</span>
			<BudgetCard />
		</div>
		<div class="bg-base-100 card h-full left-0 p-5 w-[50rem]">
			<span class="text-xl font-bold">Actividad</span>npm
		</div>
	</div>
</Module>
