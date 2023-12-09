<script>
	import Footer from '$lib/Footer.svelte';
    import Header from '$lib/Header.svelte';
	import '/src/styles/styles.scss';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

    <Footer />
</div>

<style lang="scss">
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh; // Make sure app fills the viewport height
    }

    main {
        padding: 0.5rem 2rem;
        flex-grow: 1; // Allow main to grow and push the footer down
    }
</style>
