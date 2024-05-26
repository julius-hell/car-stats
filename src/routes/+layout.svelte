<script>
    import "../app.css";
    import { pwaInfo } from 'virtual:pwa-info';

    import { CircleUserIcon } from "lucide-svelte";

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
    {@html  webManifestLink}
</svelte:head>

<slot />
