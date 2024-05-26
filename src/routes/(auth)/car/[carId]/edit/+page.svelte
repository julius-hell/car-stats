<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";
    import * as Card from "$lib/components/ui/card";
    import AppLayout from "$lib/components/AppLayout.svelte";

    export let data;
    const { form, enhance } = superForm(data.form);
</script>

<AppLayout title="Edit Car" authenticated="{true}">
<div class="max-w-screen-md mx-auto">
    <Card.Root>
        <Card.Content class="pt-6">
            <form method="POST" use:enhance action="?/updateCar">
                <AddCarForm buttonType="Update" data={form} />
            </form>
        </Card.Content>
    </Card.Root>
</div>
</AppLayout>
