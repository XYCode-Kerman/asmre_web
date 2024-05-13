<template>
    <NuxtLink :to="`/student/${student.name}`" class="flex items-center gap-2 hover:underline">
        <img :src="student.user.avatar" alt="" class="h-8 rounded-2xl">
        <div class="font-bold">{{ student.name }}</div>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Student } from '~/types/student';

defineProps({
    student: {
        type: Object as PropType<Student>,
        required: true
    }
})
</script>