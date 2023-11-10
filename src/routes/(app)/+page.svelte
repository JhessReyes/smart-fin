<script lang="ts">
	import { Module } from '$lib/components/organisms';
	import { appState } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { EChart } from '$lib/components/atoms';
	import {
		incomeExpensesChart,
		top5Categories,
		transactionsByDayOfWeek
	} from '$lib/modules/dashboard/charts';

	export let data: PageData;

	let me = undefined;
	onMount(async () => {
		//@ts-ignore
		me = data?.queryClient?.getQueryData(['Me'])?.data?.me;
		me?.currecy && ($appState.currecy = me?.currecy);
	});
	$appState.title = 'Dashboard';
</script>

<Module loading={!me?.transactions} class="w-full">
	<div class="w-full justify-center flex gap-4 h-full">
		<div class="bg-base-300 shadow w-full p-2 rounded-lg overflow-y-auto flex flex-col gap-20">
			<EChart options={incomeExpensesChart(me?.transactions)} />
		</div>
		<div class="bg-base-300 shadow w-1/2 p-2 rounded-lg overflow-y-auto flex flex-col gap-20">
			<EChart options={top5Categories(me?.transactions)} class="!h-96" />
			<EChart options={transactionsByDayOfWeek(me?.transactions)} class="!h-96" />
		</div>
	</div>
</Module>
