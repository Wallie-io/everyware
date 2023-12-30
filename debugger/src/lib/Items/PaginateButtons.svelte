<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let totalItems: number;
	let currentPage: number = 1;
	const itemsPerPage: number = 3;

	$: totalPages = Math.ceil(totalItems / itemsPerPage);
	$: pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1);

	function selectPage(page: number) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
		dispatch('pageChange', { currentPage });
	}

	function nextPage() {
		selectPage(currentPage + 1);
	}

	function prevPage() {
		selectPage(currentPage - 1);
	}

	function lastPage() {
		selectPage(totalPages);
	}
</script>

<nav class="pagination">
	<button
		on:click={() => {
			selectPage(1);
		}}
		disabled={currentPage === 1}>First</button
	>
	<button on:click={prevPage} disabled={currentPage === 1}>Back</button>

	{#each pageNumbers as page}
		<button class:active={page === currentPage} on:click={() => selectPage(page)}>
			{page}
		</button>
	{/each}

	<button on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
	<button on:click={lastPage} disabled={currentPage === totalPages}>Last</button>
</nav>

<style>
	.pagination {
	}
	.active {
	}
	button:disabled {
	}
</style>
