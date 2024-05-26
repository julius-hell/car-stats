<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/form";
    import AppLayout from "$lib/components/AppLayout.svelte";

    export let data;
</script>

<AppLayout title="Delete Car?" authenticated="{true}">
<Card.Root>
    <Card.Content class="pt-6">
        <p>Do you want to delete the car "{data.car.name}"? <b>WARNING: This action cannot be reversed!</b></p>
    </Card.Content>
    <Card.Footer>
        <form method="post" class="w-full">
            <Button variant="destructive" class="w-full">Delete {data.car.name}</Button>
        </form>
    </Card.Footer>
</Card.Root>
</AppLayout>
