<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/form";

    export let data;
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Delete car</Card.Title>
    </Card.Header>
    <Card.Content>
        <p>Do you want to delete the car "{data.car.name}"? This action cannot be reversed!</p>
    </Card.Content>
    <Card.Footer>
        <form method="post" class="w-full">
            <Button variant="destructive" class="w-full">Delete {data.car.name}</Button>
        </form>
    </Card.Footer>
</Card.Root>
