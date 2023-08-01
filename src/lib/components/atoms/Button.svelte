<script lang="ts">
	export let className: string = '';
	export let disabled: boolean = false;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
</script>

<button
	{disabled}
	{type}
	class={`btn !normal-case ${className}`}
	on:click
	on:keydown
	on:keyup
	on:keypress
>
	<slot><!-- optional fallback --></slot>
</button>
