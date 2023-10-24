<script lang="ts">
	let className: string = '';
	let checked: boolean = true;
	export { className as class };
</script>

<input type="checkbox" class="dui-toggle {className}" bind:checked />
