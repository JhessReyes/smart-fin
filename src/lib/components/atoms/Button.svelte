<script lang="ts">
	import { Icon } from '.';

	export let disabled: boolean = false;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let iconProps: object = undefined;

	let className: string = '!normal-case';

	export { className as class };
</script>

<button {disabled} {type} class={`dui-btn normal-case ${className}`} on:click on:keydown on:keyup on:keypress>
	{#if $$slots.icon}
		<slot name="icon" />
	{:else if iconProps}
		<Icon {...iconProps} />
	{/if}
	<slot><!-- optional fallback --></slot>
</button>
