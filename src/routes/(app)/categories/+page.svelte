<script>
	import { Button } from '$lib/components/atoms';
	import { Module } from '$lib/components/organisms';
	import { appState } from '$lib/stores';

	$appState.title = 'Categorías';
</script>

<Module loading={true}>
	<Button class="!btn-primary">Agregar Transaccion</Button>
	<h1 class="">Hola Mundo</h1>
</Module>
