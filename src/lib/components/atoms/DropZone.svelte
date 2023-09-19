<script>
	import { DropZone } from 'svelte-atoms';

	let fileName = '';
	const onChange = (e) => {
		const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		fileName = file ? file.name : '';
	};
</script>

<DropZone
	fileTitle={fileName}
	dropOnPage
	buttonTitle={'Subir archivo'}
	on:drop={onChange}
	on:change={onChange}
	title={'Arrastra un archivo aquí o'}
	class="zone"
/>
