<script lang="ts">
	let className: string = '';
	let checked: boolean = true;
	let props: object = {};
	export { className as class };
	export { checked };
</script>

<input type="checkbox" class="!dui-toggle {className}" bind:checked {...props} />
