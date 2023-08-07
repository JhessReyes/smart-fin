<script lang="ts">
	export let name: string = 'mood';
	export let className: string = '';
	export let title: string = '';
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	class={`material-symbols-rounded custom-icon ${className}`}
	on:click
	on:keydown
	on:keyup
	on:keypress
	{title}
>
	{name}
</span>
