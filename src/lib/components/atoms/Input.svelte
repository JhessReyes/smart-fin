<script lang="ts">
	export let input: HTMLInputElement = '' as unknown as HTMLInputElement;
	export let value: any = '';
	export let form: string = '';
	export let placeholder: string = '';
	export let props: object = {};
	export let required: boolean = false;

	let className: string = '';
	export { className as class };
</script>

<input
	bind:this={input}
	class={`dui-input dui-input-bordered w-full ${className}`}
	bind:value
	{form}
	{...props}
	{placeholder}
	{required}
	on:change
	on:input
/>
