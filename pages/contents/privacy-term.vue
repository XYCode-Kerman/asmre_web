<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/privacy-term').findOne())
</script>

<template>
    <main class="prose max-w-none mx-32">
        <ContentRenderer :value="data">
            <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
    </main>
</template>