<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";

    export let data;
    const { form, enhance } = superForm(data.form);
</script>

<div class="max-w-screen-md mx-auto">
    <form method="POST" use:enhance action="?/updateCar">
        <AddCarForm buttonType="Update" data={form} />
    </form>
</div>
