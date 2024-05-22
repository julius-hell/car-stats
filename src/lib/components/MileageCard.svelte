<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Table from "$lib/components/ui/table";
    import type {MileageItem} from "$lib/types/mileageItem";

    export let mileageItems = undefined as MileageItem[] | undefined;
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Mileage</Card.Title>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Distance</Table.Head>
                    <Table.Head class="sm:text-right md:text-left">Timestamp</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if mileageItems}
                    {#each mileageItems as mileageItem}
                        <Table.Row>
                            <Table.Cell>{mileageItem.mileage} km</Table.Cell>
                            <Table.Cell class="sm:text-right md:text-left">{mileageItem.created.toLocaleDateString()}</Table.Cell>
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>
    </Card.Content>
</Card.Root>
