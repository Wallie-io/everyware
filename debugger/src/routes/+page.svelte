<script lang="ts">
	import everywhere from '$everyware';
	import QueryEditor, { getQuery, submitForm } from '$lib/QueryEditor.svelte';
	let query: Object;
	everywhere();

	import { onMount, onDestroy } from 'svelte';

	function handleGlobalKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
			submitFormWrapper();
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', handleGlobalKeyDown);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleGlobalKeyDown);
		}
	});
	function submitFormWrapper() {
		try {
			submitForm();
			query = getQuery();
		} catch (err) {}
	}
</script>

<database-debugger>
	<h1>Welcome to Everware Database Debugger</h1>
	<QueryEditor />
	<button type="button" on:click={submitFormWrapper}>Submit</button>
	{#if query}
		<p>{JSON.stringify(query, null, 3)}</p>
	{/if}
</database-debugger>

<style lang="scss">
	button {
		padding: 1rem;
		border-radius: 5px;
		border: none;
		background-color: #333;
		color: #fff;
		font-size: 1.2rem;
		cursor: pointer;
	}
</style>
