<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 已有 -->
        <StudentTask v-for="task in tasks" :key="task.id" :task="task"
            class="shadow-md rounded-lg p-2 md:p-4 col-span-2" />

        <!-- 新增 -->
        <StudentNewTask v-if="allowCreateTask" :student="student"
            class="shadow-md rounded-lg p-4 col-span-2 md:col-span-1" />
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Student, Task } from '~/types/student';

const props = defineProps({
    tasks: {
        type: Array as PropType<Task[]>,
        required: true
    },
    allowCreateTask: {
        type: Boolean,
        default: false
    },
    student: {
        type: Object as PropType<Student>,
        required: true
    }
})
</script>

<style scoped>
td {
    @apply py-3 px-2;
}
</style>