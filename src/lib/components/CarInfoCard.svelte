<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Table from "$lib/components/ui/table";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import type {Car} from "$lib/types/car";

    export let car = undefined as Car | undefined;
</script>

<Card.Root class="h-full">
    <Card.Header>
        <Card.Title>Your car</Card.Title>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Body>
                {#if car}
                    <Table.Row>
                        <Table.Head>Name</Table.Head>
                        <Table.Cell class="text-right">{car.name }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Make</Table.Head>
                        <Table.Cell class="text-right">{car.make }</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Head>Model</Table.Head>
                        <Table.Cell class="text-right">{car.model }</Table.Cell>
                    </Table.Row>
                {:else}
                    <Table.Row>
                        <Table.Head>Name</Table.Head>
                        <Table.Cell class="flex justify-end">
                            <Skeleton class="h-[20px] w-[150px] xl:w-[200px]" />
                        </Table.Cell>
                    </Table.Row>
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
                {/if}
            </Table.Body>
        </Table.Root>
    </Card.Content>
</Card.Root>
