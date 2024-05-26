<script>
    import { SunIcon, MoonIcon, CogIcon, HomeIcon } from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import {toggleMode} from "mode-watcher";

    export let authenticated = false;
    export let title = "Car Stats";
</script>

<nav>
    <div class="container flex flex-wrap items-center justify-between mx-auto py-4">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{ title }</span>
        <div class="flex flex-row gap-4">
        <Button on:click={toggleMode} variant="secondary" size="icon">
            <SunIcon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
        </Button>
        {#if authenticated}
            <Button href="/" size="icon" variant="secondary">
                <HomeIcon />
            </Button>
            <Button href="/settings" size="icon" variant="secondary">
                <CogIcon />
            </Button>
        {/if}
        </div>
    </div>
</nav>
