<template>
    <div :class="{
        'bg-red-500': action.action === 'reduce_credit',
        'bg-green-500': action.action === 'add_credit'
    }" class="min-h-16 min-w-16 rounded-md p-2 flex relative items-center justify-center">
        <div class="absolute left-2 top-1 text-sm">
            {{ { 'add_credit': '+', 'reduce_credit': '-' }[action.action] }}
        </div>

        <div class="font-bold text-lg">
            {{ action.data }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { TaskAction } from '~/types/student';

defineProps({
    action: {
        type: Object as PropType<TaskAction>,
        required: true
    }
})
</script>