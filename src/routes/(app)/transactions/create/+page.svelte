<script lang="ts">
	import { Button, Input, Toggle } from '$lib/components/atoms';
	import DropZone from '$lib/components/atoms/DropZone.svelte';
	// @ts-ignore
	import { Calendar, Image, Upload } from '$lib/components/icons';
	import { addToast, appState } from '$lib/stores';
	import { createMutation } from '@tanstack/svelte-query';
	import { mutationFetch } from '$lib/client';
	import { ADDTRANSACTION } from '$lib/api/transactions';
	import { SelectCategories } from '$lib/modules/categories/components';
	import { DatePicker } from 'stwui';
	import { fade } from 'svelte/transition';
	import { Transaction } from '$lib/schemas';

	let request: string = 'ADD';
	let transaction: any | object | { id: string } = new Transaction();
	let current: boolean = true;
	const handleSubmit = () => $mutationTransaction.mutate(transaction);
	const mutationTransaction = createMutation({
		mutationKey: request == 'ADD' ? ['addTransaction'] : ['updateTransaction'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data: any) => {
			const input = { ...data };
			input.amount = parseFloat(input.amount);
			return await mutationFetch({
				query: ADDTRANSACTION,
				variables: {
					input: input
				}
			});
		},
		onSuccess: async (response) => {
			if (response?.errors || !response?.data) {
				addToast(
					'Fail!',
					`Oops, ha ocurrido un error al ${
						transaction?.id ? 'actualizar' : 'crear'
					} la transacción`,
					'error'
				);
			} else {
				addToast(
					'Success!',
					`Se ha ${transaction?.id ? 'actualizado' : 'creado'} correctamente la transacción`,
					'success'
				);
				history.back();
			}
		}
	});

	$appState.title = 'Crear Transacción';
</script>

<div class="flex justify-between top-0 gap-10 h-full w-full overflow-y-auto py-2">
	<form id="transaction" on:submit|preventDefault|stopPropagation={handleSubmit} />
	<div
		class="dui-card shadow-md w-full m-auto bg-base-100 overflow-y-auto flex flex-col justify-between h-full p-12 overflow-auto"
	>
		<div class="flex flex-col gap-4 w-full">
			<SelectCategories bind:value={transaction.categoryId} />
			<Input
				form="transaction"
				placeholder="Monto de la Transacción"
				props={{ type: 'number', step: 0.01 }}
				required
				bind:value={transaction.amount}
			/>
			<textarea
				form="transaction"
				placeholder="Agregar Descripción"
				required
				class="dui-textarea dui-textarea-bordered dui-textarea-md h-32"
				bind:value={transaction.description}
			/>
			<div class="flex justify-end">
				<div class="flex items-center gap-2">
					<span class="font-light text-sm">Agregar al mes en curso</span>
					<Toggle bind:checked={current} />
				</div>
			</div>

			{#if !current}
				<div transition:fade>
					<label for="date" class="text-sm font-medium">Fecha de la transaccion</label>
					<DatePicker
						name="date"
						showTime
						format="MMMM D YYYY h:mm A"
						placeholder={'Fecha de la transacción'}
						bind:value={transaction.date}
					>
						<DatePicker.Trailing slot="trailing" data={Calendar} />
					</DatePicker>
				</div>
			{/if}
		</div>
		<div class="dui-modal-action">
			<Button on:click={() => history.back()}>Cacelar</Button>
			<Button form="transaction" type="submit" class="dui-btn-secondary normal-case">
				Aceptar
			</Button>
		</div>
	</div>

	<section
		role="complementary"
		class="dui-card shadow-md w-full h-full m-auto p-12 bg-base-100 overflow-y-auto relative"
	>
		<div
			class="overlay dui-hero-overlay absolute w-full h-full z-[1] right-0 top-0 text-center flex items-center justify-center"
		>
			<div class="bg-base-100 dui-card p-2 text-secondary italic text-lg">Actualiza tu plan</div>
		</div>
		<div class="dui-card bg-base-200 p-6 h-72 flex items-center justify-center gap-4">
			<svelte:component this={Image} class="w-24 h-24" />
			<div class="flex gap-2 items-center">
				<svelte:component this={Upload} class="w-4 h-4" />
				<span class="text-secondary underline"> Subir archivo </span>
			</div>
			<div class="flex flex-col items-center text-center">
				Sube un archivo para tu transacción
				<span class="text-sm">
					Formato de archivos <strong> jpeg, png </strong> Tamaño Recomendado
					<strong> 600x600 (1:1) </strong>
				</span>
			</div>
		</div>
		<h4>Imagenes Adicionales</h4>
		<div class="grid grid-cols-2 gap-4 h-auto">
			<div class="dui-card bg-base-200 p-6 h-auto flex flex-col items-center justify-center gap-4">
				<svelte:component this={Image} class="w-24 h-24" />
				<div class="flex gap-2 items-center">
					<svelte:component this={Upload} class="w-4 h-4" />
					<span class="text-secondary"> Subir archivo </span>
				</div>
			</div>
			<DropZone />
		</div>
	</section>
</div>
