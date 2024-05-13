<template>
    <div class="max-w-screen max-h-screen h-screen">
        <Header class="w-full max-w-none fixed top-0" />

        <div class="h-screen py-20 px-4 overflow-scroll">
            <slot />
        </div>

        <LayoutWaterMark />

        <!-- <Footer /> -->
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
</script>