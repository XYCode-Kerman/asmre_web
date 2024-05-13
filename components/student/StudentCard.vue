<template>
    <NuxtLink :to="'/student/' + student.name">
        <Card class="h-14">
            <CardContent
                class="flex justify-center items-center h-full p-0 gap-2 hover:bg-zinc-100 duration-100 cursor-pointer group">
                <StudentName :student="student" />
                <CreditText :credit="credit" class="text-4xl font-bold absolute opacity-50 group-hover:opacity-100" />
            </CardContent>
        </Card>
    </NuxtLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Student } from '~/types/student';

const props = defineProps({
    student: {
        type: Object as PropType<Student>,
        required: true
    }
})

const credit = (await useFetch(`/api/credit/${props.student.name}/credit`)).data.value as number
</script>