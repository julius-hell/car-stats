<script>
    import {CircleUserIcon, PencilIcon} from "lucide-svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {Button} from "$lib/components/ui/button";

    export let authenticated = false
</script>

<nav class="border-gray-200">
    <div class="container flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Car Stats</span>
        </a>
        {#if authenticated}
            <DropdownMenu.Root preventScroll={false}>
                <DropdownMenu.Trigger>
                    <Button>
                        <CircleUserIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content alignOffset={-36} sideOffset={5}>
                    <DropdownMenu.Group>
                        <DropdownMenu.Label>
                            <a href="/settings">
                            Settings
                            </a>
                        </DropdownMenu.Label>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Label>
                            <form method="post" action="/logout">
                                <button>Logout</button>
                            </form>
                        </DropdownMenu.Label>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        {/if}
    </div>
</nav>
