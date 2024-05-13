<template>
    <div class="flex flex-col items-center border rounded-lg p-2 text-center">
        <p class="text-2xl font-bold">{{ data }}</p>
        <span class="text-xs">{{ label }}</span>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    data: {
        required: true
    },
    label: {
        type: String,
        required: true
    }
})
</script>