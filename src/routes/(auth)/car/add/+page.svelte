<script lang="ts">
    import AddCarForm from "$lib/components/addCarForm/AddCarForm.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<AddCarForm data="{data.form}" />
