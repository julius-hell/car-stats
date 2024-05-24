<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";

    import { type Car } from "$lib/types/car";
    import {goto} from "$app/navigation";

    import { PlusIcon } from "lucide-svelte";

    export let cars: Car[];
    export let carId = undefined as number | undefined;

    function onCarSelectedChanged(event) {
        goto(`/car/${event.value}`, { invalidateAll: true });
    }

    let selected = undefined;

    if(carId) {
        const selectedCar = cars.find(c => c.id === carId);

        selected = selectedCar ? {
            label: selectedCar.name,
            value: selectedCar.id
        } : undefined;
    }
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Select car</Card.Title>
    </Card.Header>
    <Card.Content>
        <Select.Root onSelectedChange={onCarSelectedChanged} {selected}>
            <Select.Trigger class="w-full">
                <Select.Value placeholder='-' />
            </Select.Trigger>
            <Select.Content>
                {#each cars as car}
                    <Select.Item value={car.id}>{car.name}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        <Button class="w-full mt-2" href="/car/add">
            <PlusIcon class="mr-4 h-4 w-4" />
            Add new car
        </Button>
    </Card.Content>
</Card.Root>

