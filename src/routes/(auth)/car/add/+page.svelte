<script lang="ts">
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";
    import type { PageData } from "./$types";
    import {superForm} from "sveltekit-superforms";
    import AppLayout from "$lib/components/AppLayout.svelte";

    export let data: PageData;
    const { form, enhance } = superForm(data.form)
</script>

<svelte:head>
    <title>Add car | Car-Stats</title>
</svelte:head>

<AppLayout title="Add Car" authenticated="{true}">
<div class="max-w-screen-md mx-auto">
    <form method="POST" use:enhance action="/car/add?/addCar">
        <AddCarForm data="{form}" />
    </form>
</div>
</AppLayout>
