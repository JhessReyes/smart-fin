<script lang="ts">
	import { Module } from '$lib/components/organisms';
	import { appState } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { EChart } from '$lib/components/atoms';
	import { incomeExpensesChart } from '$lib/modules/dashboard/charts';

	export let data: PageData;

	let me = undefined;
	onMount(async () => {
		//@ts-ignore
		me = data?.queryClient?.getQueryData(['Me'])?.data?.me;
		$appState.currecy = me?.currecy;
	});
	$appState.title = 'Dashboard';
</script>

<Module loading={!me?.transactions}>
	<EChart options={incomeExpensesChart(me?.transactions)} />
	<!-- 	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1>
	<h1 class="">Hola Mundo</h1> -->
</Module>
