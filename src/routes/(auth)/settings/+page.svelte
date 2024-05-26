<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import SettingsForm from "$lib/components/settingsForm/SettingsForm.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/form";

    export let data;
    const { form, enhance } = superForm(data.formSchema);
</script>

<form method="post" use:enhance action="?/updateSettings">
    <Card.Root>
        <Card.Header>
            <Card.Title>Settings</Card.Title>
        </Card.Header>
        <Card.Content>
                <SettingsForm schema={form} cars={data.cars} />
        </Card.Content>
        <Card.Footer>
            <Button>Update Settings</Button>
        </Card.Footer>
    </Card.Root>
</form>
