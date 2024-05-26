<script>
    import {CogIcon} from "lucide-svelte";
    //import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button";

    export let authenticated = false;
</script>

<nav class="border-gray-100">
    <div class="container flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Car Stats</span>
        </a>
        {#if authenticated}
            <Button href="/settings">
                <CogIcon />
            </Button>
        {/if}
    </div>
</nav>
