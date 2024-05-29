<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";
    import AddImageForm from "$lib/components/addImageForm/AddImageForm.svelte";
    import * as Card from "$lib/components/ui/card";
    import AppLayout from "$lib/components/AppLayout.svelte";
    import { enhance } from "$app/forms";

    export let data;
    const addCarForm = superForm(data.form);
</script>

<AppLayout title="Edit Car" authenticated="{true}">
<div class="max-w-screen-md mx-auto">
    <Card.Root>
        <Card.Content class="pt-6">
            <form method="POST" use:addCarForm.enhance action="?/updateCar">
                <AddCarForm buttonType="Update" data={addCarForm.form} />
            </form>
        </Card.Content>
    </Card.Root>

    <Card.Root class="mt-6">
        <Card.Header>
            <Card.Title>Update picture</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="POST" action="?/updatePicture" enctype="multipart/form-data" use:enhance>
                <AddImageForm />
            </form>
        </Card.Content>
    </Card.Root>
</div>
</AppLayout>
