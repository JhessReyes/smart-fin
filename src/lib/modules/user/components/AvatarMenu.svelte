<script lang="ts">
	import { Avatar } from '$lib/components/atoms';
	export let avatarProps: object = {};
</script>

<div class="dui-dropdown dui-dropdown-top dui-dropdown-right z-[1]">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="dui-btn dui-btn-ghost dui-btn-circle">
		<Avatar {...avatarProps} class="rounded-full" />
		<ul
			tabindex="0"
			class="dui-menu dui-dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-52 not-prose"
		>
			<li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a data-sveltekit-preload-data data-sveltekit-preload-code href="/profile">
					Perfil
					<span class="dui-badge dui-badge-info dui-badge-outline">Nuevo</span>
				</a>
			</li>
			<!-- svelte-ignore a11y-missing-attribute -->
			<!-- <li>
				<a data-sveltekit-preload-data data-sveltekit-preload-code href="/sessions">Sesiones</a>
			</li> -->
		</ul>
	</label>
</div>
