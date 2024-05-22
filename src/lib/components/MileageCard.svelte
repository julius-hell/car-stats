<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import * as Table from "$lib/components/ui/table";
    import type {MileageItem} from "$lib/types/mileageItem";
    import 'chart.js/auto';
    import { Line } from "svelte-chartjs";
    import 'chartjs-adapter-date-fns';
    export let mileageItems = undefined as MileageItem[] | undefined;

    $: chartData = {
        labels: (mileageItems ?? []).toReversed().map(item => item.created),
        datasets: [
            {
                label: "Car mileage",
                data: (mileageItems ?? []).toReversed().map(item => item.mileage),
                borderColor: "hsl(346.8,77.2%,49.8%)",
                backgroundColor: "hsla(346.8,77.2%,49.8%, 0.075)",
                tension: 0.15,
                fill: true,
            }
        ]
    };

    $: options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                type: "timeseries",
                time: {
                    unit: "date",
                    displayFormats: {
                        date: "dd.MM.yyyy HH:mm"
                    }
                },
            },
        },
    }
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
        {#if chartData.labels.length > 0}
        <Line data={chartData} {options} />
        {/if}
    </Card.Content>
</Card.Root>
