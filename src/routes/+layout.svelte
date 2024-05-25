<script>
    import "../app.css";
    import { pwaInfo } from 'virtual:pwa-info';

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
    {@html  webManifestLink}
</svelte:head>
<nav class="border-gray-200">
    <div class="container flex flex-wrap items-center justify-between mx-auto py-4">
        <a href="/">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Car Stats</span>
        </a>
    </div>
</nav>
<div class="container">
        <slot />
</div>
