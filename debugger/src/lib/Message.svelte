<script>
	export let message = '';
</script>

{#if message.length}
	<div class="alert">
		<span class="exclamation">!</span>
		<span class="message">{message}</span>
	</div>
{/if}

<style>
	.alert {
		display: flex;
		align-items: center;
		background-color: #cc0000;
		color: white;
		width: 100%;
		padding: 0.5rem;
	}

	.exclamation {
		font-weight: bold;
		font-size: 1.5rem; /* Larger size for the exclamation point */
		margin-right: 1rem; /* Space between exclamation point and text */
	}

	.message {
		font-size: 1rem;
	}
</style>
