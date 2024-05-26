<script lang="ts">
    import CarSelectCard from "$lib/components/CarSelectCard.svelte";
    import {page} from "$app/stores";
    import CarInfoCard from "$lib/components/CarInfoCard.svelte";
    import * as Card from "$lib/components/ui/card";
    import * as Tabs from "$lib/components/ui/tabs";
    import { Button} from "$lib/components/ui/form";
    import {enhance } from "$app/forms";
    import AddMileageForm from "$lib/components/addMileageForm/AddMileageForm.svelte";
    import MileageCard from "$lib/components/MileageCard.svelte";
    import AppLayout from "$lib/components/AppLayout.svelte";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

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
            <Card.Root>
                <Card.Header>
                    <Card.Title>Add mileage</Card.Title>
                </Card.Header>
                <Card.Content>
            <Tabs.Root value="text" class="w-full">
                <Tabs.List class="grid w-full grid-cols-2 gap-1 ">
                    <Tabs.Trigger value="text">Text</Tabs.Trigger>
                    <Tabs.Trigger value="ocr">OCR</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="text">
                    <form method="post" use:enhance action="?/addMileage">
                    <AddMileageForm data={data.addMileageFormData} />
                    </form>
                </Tabs.Content>
                <Tabs.Content value="ocr">
                    <form method="post" action="?/addOcrMileage" enctype="multipart/form-data">
                        <div class="grid w-full max-w-sm items-center gap-1.5">
                            <Label for="picture">Picture</Label>
                            <input type="file" id="picture" name="picture" capture="environment" />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Tabs.Content>
            </Tabs.Root>
                </Card.Content>
            </Card.Root>
        </div>
        <div>
            <MileageCard mileageItems={selectedCar.mileage} />
        </div>
    </div>
</div>
</AppLayout>
