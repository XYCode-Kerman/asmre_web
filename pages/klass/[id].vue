<template>
    <div>
        <Card>
            <CardHeader>
                <CardTitle>班级 {{ klass?.name }}</CardTitle>
                <CardDescription>
                    <p>简介：{{ klass?.description }}</p>
                    <p>班级 ID：{{ klass?.id }}</p>
                </CardDescription>
            </CardHeader>

            <CardContent class="grid grid-cols-8 gap-2">
                <StudentCard v-for="item in students" :id="item.id || item.name" :student="item" />
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import type { Klass } from '~/types/klass';
import type { Student } from '~/types/student';

const route = useRoute()

const klassId = route.params.id as string

// const klass = ((await useFetch(`/api/classes/`)).data.value as Klass[]).find(x => x.id == klassId)
// const students = (await useFetch(`/api/student/by/class/${klassId}`)).data.value as Student[]

const [classes, students] = await Promise.all([
    useFetch(`/api/classes`).data as Ref<Klass[]>,
    useFetch(`/api/student/by/class/${klassId}`).data as Ref<Student[]>,
])

const klass = computed(() => classes.value.find(x => x.id == klassId))
</script>