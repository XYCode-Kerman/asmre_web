<template>
    <div class="max-w-screen max-h-screen h-screen">
        <Header class="w-full max-w-none fixed top-0" />

        <div class="h-screen py-20 px-4 overflow-scroll">
            <slot />
        </div>

        <LayoutWaterMark />

        <div class="right-4 top-2 absolute text-xs opacity-50 z-50">
            <div>{{ generated_time }}</div>
        </div>

        <!-- <Footer /> -->
    </div>
</template>

<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';

const generated_time = ref('')

if (process.server) {
    generated_time.value = '页面生成时间(SSR): ' + new Date().toLocaleString()
}
</script>