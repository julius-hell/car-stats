<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import { type Car } from "$lib/types/car";
    import {goto} from "$app/navigation";

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
    </Card.Content>
</Card.Root>

