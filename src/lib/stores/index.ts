import { writable } from "svelte/store";

export let appState = writable({
    title: 'Inicio',
    icon: 'home',
    subtitle: '',
    module: 'Home',
    theme: true,
    description: 'descripcion',
    image: '',
    status: 200,
    loading: false,
    collapsed: false,
    libraries: {
        google: false
    },
    settings: {
        modules: {}
    }
})