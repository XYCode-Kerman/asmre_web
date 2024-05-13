<template>
    <div>
        <Card>
            <CardHeader>
                <CardTitle class="flex gap-2 items-center">
                    <StudentName :student="student" />
                    <CreditText :credit="credit" />
                </CardTitle>

                <CardDescription class="grid grid-cols-4">
                    <div>学生 ID：{{ student.id }}</div>
                    <div>绑定用户 ID：{{ student.user.id }}</div>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <CreditUpdateTable :allowCreate="allowCreate" :allowUpdate="allowUpdate" :allowDelete="allowDelete"
                    v-model:credit="credit" v-model:creditUpdates="creditUpdates" :allowOprationStudents="[student]" />
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import type { CreditUpdate } from '~/types/credit';
import type { Student } from '~/types/student';

const route = useRoute()

const studentName = route.params.name
const student = ((await useFetch('/api/student/')).data.value as Student[]).find(x => x.name == studentName) as Student
const credit = (await useFetch(`/api/credit/${student.name}/credit`)).data.value as number
const creditUpdates = (await useFetch(`/api/credit/${student.name}`)).data.value as CreditUpdate[]
const allowCreate = (await useFetch(`/api/user/check?resource=/asmre/credit/${student.name}&action=create`)).data.value as boolean
const allowUpdate = (await useFetch(`/api/user/check?resource=/asmre/credit/${student.name}&action=write`)).data.value as boolean
const allowDelete = (await useFetch(`/api/user/check?resource=/asmre/credit/${student.name}&action=delete`)).data.value as boolean
</script>