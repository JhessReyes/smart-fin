<script>
	import { Toast } from '../molecules';
</script>

<div class="grid md:grid-cols-2 h-screen dui-prose prose max-w-none bg-base-100">
	<Toast />
	<div class="md:flex flex-col justify-between gap-5 drop-shadow-md font-bold text-6xl hidden">
		<h1 class="text-5xl capitalize italic m-0 drop-shadow-sm px-12">
			<br /> Calcula

			<strong class="text-primary"> Inteligente, </strong>
			<br />Gasta
			<strong class="text-primary"> Sabiamente... </strong>
		</h1>
		<img
			src="/login-banner.svg"
			alt="SmartFin, Mejora tus finanzas."
			class="m-0 w-full h-fit drop-shadow-sm"
		/>
	</div>
	<div
		class="flex flex-col gap-5 bg-base-200 justify-center items-center prose-lg text-center p-12 md:rounded-l-[2.5rem]"
	>
		<slot><!-- optional fallback --></slot>
	</div>
</div>
