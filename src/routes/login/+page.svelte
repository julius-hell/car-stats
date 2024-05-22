<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Github from "lucide-svelte/icons/github";
</script>
<div class="container flex h-screen items-center justify-center">
    <Button href="/login/github">
        <Github class="mr-2 h-4 w-4" />
        Login with Github
    </Button>
</div>
