<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import Github from "lucide-svelte/icons/github";
    import AppLayout from "$lib/components/AppLayout.svelte";
</script>
<AppLayout title="Login" authenticated="{true}">
    <div class="flex h-screen items-center justify-center">
        <Button href="/login/github">
            <Github class="mr-2 h-4 w-4" />
            Login with Github
        </Button>
</div>
</AppLayout>
