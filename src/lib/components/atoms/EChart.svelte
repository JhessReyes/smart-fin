<script lang="ts">
	import { onMount } from 'svelte';
	//@ts-ignore
	import * as echarts from 'echarts';

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

	onMount(async () => {
		chart = echarts.init(element, {
			width: 'auto',
			renderer: 'canvas'
		});
		let defaultOption = (await options) || setOption;
		chart.setOption(defaultOption);
	});

	$: options && chart?.setOption(options);
</script>

<div class="w-[275px] h-full p-4 sm:w-full sm:h-[350px] {className}" bind:this={element} />
