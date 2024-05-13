<template>
    <div v-text="credit" :class="{
        'text-red-500': credit < 0,
        'text-green-500': credit > 0,
        'text-foreground': credit == 0
    }" class="font-bold"></div>
</template>

<script lang="ts" setup>
defineProps({
    credit: {
        type: Number,
        required: true
    }
})
</script>