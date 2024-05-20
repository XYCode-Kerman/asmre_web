<script setup lang="ts">
const { data } = await useAsyncData('page-data', () => queryContent('/third-party').findOne())
</script>

<template>
    <main
        class="prose max-w-none mx-8 md:mx-16 lg:mx-32 prose-code:text-xs md:prose-code:text-sm lg:prose-code:text-base">
        <ContentRenderer :value="data">
            <h1>{{ data.title }}</h1>
            <ContentRendererMarkdown :value="data" />
        </ContentRenderer>
    </main>
</template>