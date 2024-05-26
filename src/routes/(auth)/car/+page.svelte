<script lang="ts">
    import CarSelectCard from "$lib/components/CarSelectCard.svelte";
    import CarInfoCard from "$lib/components/CarInfoCard.svelte";
    export let data;

    $: cars = data.cars;
</script>

<svelte:head>
    <title>Dashboard | Car-Stats</title>
</svelte:head>

<div class="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
    <div>
        <div class="pb-4">
            <CarSelectCard {cars} />
        </div>
        <div class="pb-4">
            <CarInfoCard />
        </div>
    </div>

</div>
