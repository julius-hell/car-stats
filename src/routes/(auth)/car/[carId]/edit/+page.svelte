<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";
    import * as Card from "$lib/components/ui/card";

    export let data;
    const { form, enhance } = superForm(data.form);
</script>

<div class="max-w-screen-md mx-auto">
    <Card.Root>
        <Card.Header>
            <Card.Title>Edit car</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance action="?/updateCar">
                <AddCarForm buttonType="Update" data={form} />
            </form>
        </Card.Content>
    </Card.Root>
</div>
