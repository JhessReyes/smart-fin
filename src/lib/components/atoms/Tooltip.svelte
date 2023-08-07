<script lang="ts">
	export let className: string = '';
	export let tip: string = 'tip';
</script>

<div class={`tooltip tooltip-secondary ${className}`} data-tip={tip}>
	<slot><!-- optional fallback --></slot>
</div>
