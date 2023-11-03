<script lang="ts">
	import '../../app.css';
	import { addToast, appState } from '$lib/stores';
	import { page } from '$app/stores';
	import { AppLayout } from '$lib/components/templates';
	import { Button } from '$lib/components/atoms';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { PageData } from './$types';
	import { Toast } from '$lib/components/molecules';
	import dayjs from 'dayjs';
	import 'dayjs/locale/es-us';

	dayjs.locale('es-us');

	// Import the functions you need from the SDKs you need
	import { onMessage } from 'firebase/messaging';
	import { getToken } from 'firebase/messaging';
	import { initializeApp } from 'firebase/app';
	import { getMessaging } from 'firebase/messaging/sw';
	import { onMount } from 'svelte';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	const firebaseConfig = {
		apiKey: 'AIzaSyCjNvGpBRDgp7Yo8j01jzA4V3G9dG8iI0s',
		authDomain: 'smart-fin.firebaseapp.com',
		projectId: 'smart-fin',
		storageBucket: 'smart-fin.appspot.com',
		messagingSenderId: '686114140867',
		appId: '1:686114140867:web:4a9b3fe6e470383c802876',
		measurementId: 'G-CWWZ3NBV8B'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const messaging = getMessaging(app);

	// Add the public key generated from the console here.
	getToken(messaging, {
		vapidKey:
			'BDY17TaAoVwrGc4MuOwQheBqo-m2ECH7cDR369L7VuQBWtqvkYR8RsZPumjFNvIryChCz3RoeeLrayNZZEBKZCY'
	})
		.then((currentToken) => {
			if (currentToken) {
				// Send the token to your server and update the UI if necessary
				// ...
			} else {
				// Show permission request UI
				console.log('No registration token available. Request permission to generate one.');
				// ...
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
		});

	function requestPermission() {
		console.log('Requesting permission...');
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				console.log('Notification permission granted.');
			}
		});
	}

	$: onMessage(messaging, (payload) => {
		addToast('Welcome!', 'Let’s make something great!' + payload, 'default');
		console.log('Message receiveds. ', payload);
	});

	export let data: PageData;
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>
<QueryClientProvider client={data?.queryClient}>
	<AppLayout
		theme={$appState?.theme ? 'light' : 'dark' || 'light'}
		currentPage={$page?.url?.pathname || ''}
		title={$appState.title}
	>
		<Toast />
		<svelte:fragment slot="actions">
			<Button
				class="p-2 btn-ghost btn-circle m-0"
				on:click={() => addToast('Welcome!', 'Let’s make something great!', 'default')}
				iconProps={{ name: 'notifications' }}
			/>
		</svelte:fragment>
		<slot><!-- app fallback --></slot>
	</AppLayout>
</QueryClientProvider>
