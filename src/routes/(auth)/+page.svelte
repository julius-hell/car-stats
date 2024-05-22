<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Select from "$lib/components/ui/select";
    import * as Table from "$lib/components/ui/table/index.js";

    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import AddMileageForm from "$lib/components/addMileageForm/AddMileageForm.svelte";
import {enhance } from "$app/forms";
    export let data;

    $: cars = data.cars;
    $: selectedCar = data.selectedCar;
    $: mileageItems = data.selectedCar?.mileage ?? [];
    $: selectedObject = selectedCar ? {
        label: selectedCar.name,
        value: selectedCar.id
    } : undefined;

    function onCarSelectionChanged(event) {
        const query = $page.url.searchParams;
        query.set("car", event.value);
        goto(`?${query.toString()}`, { invalidateAll: true }); // working;
    }
</script>

<div class="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
    <div>
        <Card.Root class="h-full">
            <Card.Header>
                <Card.Title>Select car</Card.Title>
            </Card.Header>
            <Card.Content>
                <Select.Root onSelectedChange={onCarSelectionChanged} selected={selectedObject}>
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
    </div>
    <div class="lg:col-span-2">
        <Card.Root>
            <Card.Header>
                <Card.Title>Mileage</Card.Title>
            </Card.Header>
            <Card.Content>
                {#if selectedCar}
                    <form method="POST" use:enhance action="?/addMileage">
                    <AddMileageForm carId="{selectedCar.id}" data={data.addMileageForm} />
                    </form>
                {/if}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Distance</Table.Head>
                            <Table.Head class="sm:text-right md:text-left">Timestamp</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {#each mileageItems as mileageItem}
                            <Table.Row>
                                <Table.Cell>{mileageItem.mileage} km</Table.Cell>
                                <Table.Cell class="sm:text-right md:text-left">{mileageItem.created.toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        {/each}
                    </Table.Body>
                </Table.Root>
            </Card.Content>
        </Card.Root>
    </div>
    <div>
        <Card.Root>
            <Card.Header>
                <Card.Title>Your car</Card.Title>
            </Card.Header>
            <Card.Content>
                <Table.Root>
                    <Table.Body>
                        <Table.Row>
                            <Table.Head>Name</Table.Head>
                            <Table.Cell class="text-right">{selectedCar?.name ?? '-' }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Head>Make</Table.Head>
                            <Table.Cell class="text-right">{selectedCar?.make ?? '-' }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Head>Model</Table.Head>
                            <Table.Cell class="text-right">{selectedCar?.model ?? '-' }</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Content>
        </Card.Root>
    </div>
</div>

