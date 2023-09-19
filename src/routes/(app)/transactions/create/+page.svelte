<script>
	import { Button, Input, Toggle } from '$lib/components/atoms';
	import DropZone from '$lib/components/atoms/DropZone.svelte';
	// @ts-ignore
	import { Select } from 'svelte-atoms';
	import { Image, Upload } from '$lib/components/icons';
	import { appState } from '$lib/stores';
	import { createMutation } from '@tanstack/svelte-query';
	import { mutationFetch } from '$lib/client';
	import { ADDTRANSACTION } from '$lib/api/transactions';

	let request = 'ADD';
	let transaction = {};
	const mutationTransaction = createMutation({
		mutationKey: request == 'ADD' ? ['addTransaction'] : ['updateTransaction'],
		/**
		 * @param {any} data
		 */
		mutationFn: async (data) => {
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
			console.log(response);
			history.back();
			/* if (response?.errors || !response?.data) {
				addNotification({
					text: `Oops, ha ocurrido un error al ${
						request == 'ADD' ? 'crear' : 'actualizar'
					} la alerta ${alert?.name}`,
					position: 'bottom-right',
					type: 'error',
					removeAfter: 5000
				});
			} else {
				addNotification({
					text: `Se ha ${request == 'ADD' ? 'creado' : 'actualizado'} correctamente la alerta ${
						alert?.name
					}`,
					position: 'bottom-right',
					type: 'success',
					removeAfter: 10000
				});
				history.back();
			}
			await queryClient.invalidateQueries(); */
		}
	});

	$appState.title = 'Crear Transacción';
</script>

<div class="flex justify-between top-0 gap-10 h-full w-full overflow-y-auto py-2">
	<form
		class="card shadow-md w-full h-full m-auto bg-base-100 overflow-y-auto"
		on:submit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			$mutationTransaction.mutate(transaction);
		}}
	>
		<div class="flex flex-col justify-between h-full p-12 overflow-auto">
			<div class="flex flex-col gap-4 w-full">
				<Select
					bind:value={transaction.categoryId}
					options={[
						{ label: 'Food', value: '5d9b17ed-5555-4d7d-892d-73930fde0ee4' },
						{ label: 'Gastos Varios', value: '04fba686-1509-461b-b8c6-11efd4bd3b5d' }
					]}
					placeholder="Agregar Categoria"
					size="medium"
				/>
				<Input
					placeholder="Monto de la Transacción"
					props={{ type: 'number' }}
					required
					bind:value={transaction.amount}
				/>
				<textarea
					placeholder="Agregar Descripción"
					required
					class="textarea textarea-bordered textarea-md h-32"
					bind:value={transaction.description}
				/>
				<div class="flex justify-between">
					<span class="font-semibold"> Mes en curso </span>
					<div class="flex items-center gap-2">
						<span class="font-light text-sm">Agregar al mes en curso</span>
						<Toggle />
					</div>
				</div>

				<div>
					<label for="date" class="text-sm font-medium">Fecha de la transaccion</label>
					<div class="flex gap-2">
						<Input props={{ type: 'date' }} />
						<Input props={{ type: 'time' }} />
					</div>
				</div>
			</div>
			<div class="modal-action">
				<Button on:click={() => history.back()}>Cacelar</Button>
				<Button type="submit" class="btn-secondary normal-case">Aceptar</Button>
			</div>
		</div>
	</form>
	<section
		role="complementary"
		class="card shadow-md w-full h-full m-auto p-12 bg-base-100 overflow-y-auto"
	>
		<div class="card bg-base-200 p-6 h-72 flex items-center justify-center gap-4">
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
			<div class="card bg-base-200 p-6 h-auto flex flex-col items-center justify-center gap-4">
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