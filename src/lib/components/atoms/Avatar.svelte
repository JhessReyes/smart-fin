<script lang="ts">
	export let image: string = undefined;
	export let name: string = 'J R';
	export let type: string = '';
	export { className as class };

	let className: string = '';
	let imageError = false;

	const getInitials = (name: string) => {
		if (!name) name = 'J R';
		const initials = name.trim().split(' ');
		if (initials.length > 1) {
			return initials.reduce((i, w) => i + w[0], '');
		} else {
			return name.slice(0, 2);
		}
	};
</script>

{#if !imageError && image}
	<div class={`dui-avatar ${type}`}>
		<div class={`w-10 ${className}`}>
			<img src={image} on:error={(e) => (imageError = true)} alt={name} />
		</div>
	</div>
{:else}
	<div class={`dui-avatar ${type}  dui-placeholder`} title={name}>
		<div class={`bg-neutral-focus text-neutral-content w-10 ${className}`}>
			<span class="uppercase">{getInitials(name)}</span>
		</div>
	</div>
{/if}
