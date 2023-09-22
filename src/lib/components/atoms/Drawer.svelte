<script lang="ts">
	export let open: boolean = false;
	let className: string = '';
	export { className as class };
</script>

<div class="drawer {className}">
	<input id="my-drawer" type="checkbox" bind:checked={open} class="drawer-toggle" />
	<div class="drawer-content">
		<slot><!-- optional fallback --></slot>
	</div>
	<div class="drawer-side">
		<label for="my-drawer" class="drawer-overlay" />
		<slot name="drawer-side"><!-- optional fallback --></slot>
	</div>
</div>
