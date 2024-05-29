<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Table from "$lib/components/ui/table";
    import {Button} from "$lib/components/ui/button";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import type {Car} from "$lib/types/car";

    import {PencilIcon, Trash2Icon} from "lucide-svelte";



    export let car = undefined as Car | undefined;

    $: editUrl = car ? `/car/${car.id}/edit` : undefined;
    $: deleteUrl = car ? `/car/${car.id}/delete` : undefined;
    $: mileage = car && car.mileage.length > 0 ? `${car.mileage[0].mileage} km` : '-';

</script>

<Card.Root class="h-full">
    <Card.Header>
        <Card.Title>{car ? car.name : 'Your car'}</Card.Title>
    </Card.Header>
    <Card.Content>
        {#if car?.picture}
            <img src={car.picture} alt="your car" />
        {/if}
        <Table.Root>
            <Table.Body>
                {#if car}
                    <Table.Row>
                        <Table.Head>Make</Table.Head>
                        <Table.Cell class="text-right">{car.make }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Model</Table.Head>
                        <Table.Cell class="text-right">{car.model }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Mileage</Table.Head>
                        <Table.Cell class="text-right">
                            {mileage}
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Head>Make</Table.Head>
                        <Table.Cell class="flex justify-end">
                            <Skeleton class="h-[20px] w-[100px] xl:w-[150px]" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Model</Table.Head>
                        <Table.Cell class="flex justify-end">
                            <Skeleton class="h-[20px] w-[100px] xl:w-[150px]" />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Mileage</Table.Head>
                        <Table.Cell class="flex justify-end">
                            <Skeleton class="h-[20px] w-[100px] xl:w-[150px]" />
                        </Table.Cell>
                    </Table.Row>
                {/if}
            </Table.Body>
        </Table.Root>
    </Card.Content>
    <Card.Footer class="justify-between">
        <Button href={editUrl}>
            <PencilIcon class="mr-2 h-4 w-4" />
            Edit
        </Button>
        <Button href={deleteUrl} variant="destructive">
            <Trash2Icon class="mr-4 h-4 w-4" />
            Delete
        </Button>
    </Card.Footer>
</Card.Root>
