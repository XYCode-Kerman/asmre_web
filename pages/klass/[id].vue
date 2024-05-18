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

            <CardContent v-if="students != undefined && homeworks != undefined">
                <!-- 作业面板 -->
                <HomeworkCard :homeworks="homeworks" :allow-create="allowCreateHomework"
                    :allow-delete="allowDeleteHomework" :klass="klass" />

                <div class="my-4 h-0.5 bg-zinc-200"></div>

                <!-- 学生面板 -->
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    <StudentCard v-for="item in students" :id="item.id || item.name" :student="item" />
                </div>
            </CardContent>
            <!-- 骨架屏 -->
            <CardContent v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                <Skeleton class="aspect-[4/2]" v-for="i in 6" />
            </CardContent>
        </Card>
    </div>
    <!-- 骨架屏 -->
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
import type { Homework, Klass } from '~/types/klass';
import type { Student } from '~/types/student';

const route = useRoute()

const klassId = route.params.id as string

const [classes, students, homeworks, allowCreateHomework, allowDeleteHomework] = await Promise.all([
    useCustomLazyFetch('/classes/').data as Ref<Klass[] | undefined>,
    useCustomLazyFetch(`/student/by/class/${klassId}`).data as Ref<Student[] | undefined>,
    useCustomLazyFetch(`/homework/by/class/${klassId}`).data as Ref<Homework[] | undefined>,
    checkPermission('/asmre/homework', 'create'),
    checkPermission('/asmre/homework', 'delete'),
])

const klass = computed(() => {
    if (classes.value == undefined) {
        return undefined
    }

    return classes.value.find(x => x.id == klassId)
})
</script>