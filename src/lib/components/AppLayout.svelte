<script lang="ts">
    import NavBar from "$lib/components/NavBar.svelte";

    export let title = "Car Stats";
    export let authenticated: boolean;
</script>

<NavBar {title} {authenticated} />
<div class="container">
    <slot />
</div>
