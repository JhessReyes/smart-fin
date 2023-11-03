<script lang="ts">
	export let open: boolean = false;
	let className: string = '';
	export { className as class };
</script>

<div class="dui-drawer {className}">
	<input id="my-drawer" type="checkbox" bind:checked={open} class="dui-drawer-toggle" />
	<div class="dui-drawer-content">
		<slot><!-- optional fallback --></slot>
	</div>
	<div class="dui-drawer-side">
		<label for="my-drawer" class="dui-hero-overlay cursor-pointer backdrop-blur" />
		<slot name="drawer-side" class="backdrop-blur"><!-- optional fallback --></slot>
	</div>
</div>
