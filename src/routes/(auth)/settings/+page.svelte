<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import SettingsForm from "$lib/components/settingsForm/SettingsForm.svelte";
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/form";
    import {LogOutIcon, PlusIcon} from "lucide-svelte";

    export let data;
    const { form, enhance } = superForm(data.formSchema);
</script>

<div class="flex flex-col gap-4">
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

<form method="post" action="?/logout">
    <Button variant="destructive" class="w-full">
        <LogOutIcon class="mr-4 h-4 w-4"/>
        Logout
    </Button>
</form>
</div>
