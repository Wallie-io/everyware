<script lang="ts">
	import { db } from '$everyware';
	import clearAllPosts from '$everyware/clearAllPosts';
	import QueryEditor, { submitForm } from '$lib/QueryEditor.svelte';
	import PaginateButtons from '$lib/Items/PaginateButtons.svelte';
	import Message from '$lib/Message.svelte';
	import loadPosts from '$everyware/loadPosts';
	import { onMount } from 'svelte';

	let query: Object;
	let errorMessage: string = '';
	let posts: any[] = [];
	let totalCount = 0;
	let currentPage = 1;

	async function handlePageChange(event: CustomEvent) {
		currentPage = event.detail.newPage;
		({ posts, totalCount } = await loadPosts(currentPage));
	}

	async function submitFormWrapper() {
		try {
			errorMessage = '';
			query = { ...submitForm(), date: new Date().toISOString() };
			await db.table('posts').add(query);
			({ posts, totalCount } = await loadPosts(currentPage));
		} catch (err: any) {
			errorMessage = err?.message;
		}
	}

	onMount(async () => {
		if (typeof window === 'undefined') return;
		({ posts, totalCount } = await loadPosts(currentPage));
	});
</script>

<database-debugger>
	<h1>Everware Database</h1>

	{#if errorMessage.length}
		<Message message={errorMessage} />
	{/if}

	<QueryEditor />

	<button type="button" on:click={submitFormWrapper}>Submit</button>
	<button type="button" class="warning" on:click={clearAllPosts}>Clear Collection</button>

	<pre class="postList">Posts:{JSON.stringify(posts, null, 3)} </pre>
	<PaginateButtons totalItems={totalCount} on:pageChange={handlePageChange} />
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
	button.warning {
		background-color: orange;
	}

	pre.postList {
		margin-top: 2rem;
	}
</style>
