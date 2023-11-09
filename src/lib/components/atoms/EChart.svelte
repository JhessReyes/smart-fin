<script lang="ts">
	//@ts-ignore
	import * as echarts from 'echarts';
	import { appState } from '$lib/stores';

	const setOption = {
		title: {
			text: 'ECharts Getting Started Example'
		},
		tooltip: {},
		xAxis: {
			data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
		},
		yAxis: {},
		series: [
			{
				name: 'sales',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}
		]
	};

	let className: string = '';
	export let options: any = null;
	export { className as class };
	let element: any = null;
	let chart: any = null;

	const mountChart = async (mode: string) => {
		chart = echarts.init(element, mode, {
			width: 'auto',
			renderer: 'canvas'
		});
		let defaultOption = (await options) || setOption;
		chart.setOption(defaultOption);
	};

	$: options && chart?.setOption(options);
	$: if (element) mountChart(!$appState.theme ? 'dark' : null);
</script>

{#key $appState.theme}
	<div class="w-full h-full m-0 {className}" bind:this={element} />
{/key}
