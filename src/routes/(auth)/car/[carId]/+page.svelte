<script lang="ts">
    import CarSelectCard from "$lib/components/CarSelectCard.svelte";
    import {page} from "$app/stores";
    import CarInfoCard from "$lib/components/CarInfoCard.svelte";
    import * as Card from "$lib/components/ui/card";
    import {enhance } from "$app/forms";
    import AddMileageForm from "$lib/components/addMileageForm/AddMileageForm.svelte";
    import MileageCard from "$lib/components/MileageCard.svelte";
    import AppLayout from "$lib/components/AppLayout.svelte";

    export let data;

    $: cars = data.cars;
    $: carId = Number($page.params.carId);
    $: selectedCar = data.selectedCar!;
</script>

<svelte:head>
    <title>{selectedCar.name} | Car-Stats</title>
</svelte:head>

<AppLayout title="Dashboard" authenticated="{true}">
<div class="grid lg:grid-cols-3 gap-4 md:grid-cols-2 w-full">
    <div class="flex gap-4 flex-col">
        <div>
            <CarSelectCard {cars} {carId} />
        </div>
        <div class="flex-grow">
            <CarInfoCard car={selectedCar} />
        </div>
    </div>
    <div class="lg:col-span-2 gap-4 flex flex-col w-full">
        <div>
            <form method="post" use:enhance action="?/addMileage">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Add mileage</Card.Title>
                </Card.Header>
                <Card.Content>
                        <AddMileageForm data={data.addMileageFormData} />
                </Card.Content>
            </Card.Root>
            </form>
        </div>
        <div>
            <MileageCard mileageItems={selectedCar.mileage} />
        </div>
    </div>
</div>
</AppLayout>
