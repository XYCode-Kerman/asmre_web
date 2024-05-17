<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/third-party').findOne())
</script>

<template>
    <main class="prose max-w-none mx-32">
        <ContentRenderer :value="data">
            <h1>{{ data.title }}</h1>
            <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
    </main>
</template>