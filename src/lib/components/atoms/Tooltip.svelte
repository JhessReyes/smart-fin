<script lang="ts">
	export let className: string = '';
	export let tip: string = 'tip';
</script>

<div class={`dui-tooltip dui-tooltip-secondary ${className}`} data-tip={tip}>
	<slot><!-- optional fallback --></slot>
</div>
