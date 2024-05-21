<template>
    <div v-if="klass != undefined">
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center">
                    <div>班级 {{ klass.name }}</div>
                    <div class="grow"></div>
                    <div class="flex gap-2 items-center">
                        <Button class="bg-red-500 hover:bg-red-600 shadow-lg" v-if="allowDeleteClass"
                            @click="deleteClass">删除班级</Button>
                    </div>
                </CardTitle>
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
import Swal from 'sweetalert2';
import type { Homework, Klass } from '~/types/klass';
import type { Student } from '~/types/student';

const route = useRoute()

const klassId = route.params.id as string

const [classes, students, homeworks, allowCreateHomework, allowDeleteHomework, allowDeleteClass] = await Promise.all([
    useCustomLazyFetch('/classes/').data as Ref<Klass[] | undefined>,
    useCustomLazyFetch(`/student/by/class/${klassId}`).data as Ref<Student[] | undefined>,
    useCustomLazyFetch(`/homework/by/class/${klassId}`).data as Ref<Homework[] | undefined>,
    checkPermission('/asmre/homework', 'create'),
    checkPermission('/asmre/homework', 'delete'),
    checkPermission(`/asmre/class/${klassId}`, 'delete')
])

const klass = computed(() => {
    if (classes.value == undefined) {
        return undefined
    }

    return classes.value.find(x => x.id == klassId)
})

async function deleteClass() {
    const confirm = await Swal.fire({
        title: '您确认要删除吗？',
        text: `如果确认，请在下方输入 ${klass.value?.name}`,
        icon: 'warning',
        input: 'text',
        inputLabel: '班级名称',
        inputPlaceholder: klass.value?.name || '',
        showCancelButton: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消',
    })

    if (confirm.value != klass.value?.name || !confirm.isConfirmed) {
        Swal.fire({
            title: '已取消',
            icon: 'warning'
        })
    } else {
        const resp = await useCustomFetch(`/classes/${klassId}`, {
            method: 'DELETE'
        })

        if (resp.error.value) {
            Swal.fire({
                title: '删除失败',
                text: resp.error.value?.data?.message || resp.error.value?.data || resp.error.value?.message || resp.error.value?.toString(),
                icon: 'error'
            })
        } else {
            await Swal.fire({
                title: '删除成功',
                icon: 'success'
            })

            useRouter().push('/')
        }
    }
}
</script>