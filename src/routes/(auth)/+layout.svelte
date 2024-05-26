<script>
import {CircleUserIcon} from "lucide-svelte";
import NavBar from "$lib/components/NavBar.svelte";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<NavBar authenticated={true} />

<div class="container">
    <slot />
</div>
