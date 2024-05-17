<template>
    <NuxtLink :to="'/student/' + student.name">
        <Card class="h-14">
            <CardContent
                class="flex justify-center items-center h-full p-0 gap-2 hover:bg-zinc-100 duration-100 cursor-pointer group">
                <CreditText :credit="student.credit"
                    class="text-xl md:text-2xl lg:text-3xl font-bold group-hover:opacity-100" />
                <StudentName :student="student" />
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
</script>