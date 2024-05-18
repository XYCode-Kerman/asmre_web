<template>
    <div v-if="klass != undefined">
        <Card>
            <CardHeader>
                <CardTitle>班级 {{ klass.name }}</CardTitle>
                <CardDescription>
                    <p>简介：{{ klass.description }}</p>
                    <p>班级 ID：{{ klass.id }}</p>
                </CardDescription>
            </CardHeader>

            <CardContent class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2" v-if="students != undefined">
                <StudentCard v-for="item in students" :id="item.id || item.name" :student="item" />
            </CardContent>
            <CardContent v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <Skeleton class="aspect-[4/2]" v-for="i in 6" />
            </CardContent>
        </Card>
    </div>
    <div v-else>
        <Card>
            <CardHeader>
                <Skeleton class="h-8" />
            </CardHeader>

            <CardContent class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <Skeleton class="aspect-[4/2]" v-for="i in 6" />
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import type { Klass } from '~/types/klass';
import type { Student } from '~/types/student';

const route = useRoute()

const klassId = route.params.id as string

const [classes, students] = await Promise.all([
    useCustomLazyFetch('/classes/').data as Ref<Klass[] | undefined>,
    useCustomLazyFetch(`/student/by/class/${klassId}`).data as Ref<Student[] | undefined>,
])

const klass = computed(() => {
    if (classes.value == undefined) {
        return undefined
    }

    return classes.value.find(x => x.id == klassId)
})
</script>