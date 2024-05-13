<template>
    <div class="justify-center items-center flex flex-col h-full">
        <Tabs default-value="login" class="w-2/5">
            <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                    登录
                </TabsTrigger>
                <TabsTrigger value="register">
                    注册
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <login />
            </TabsContent>
            <TabsContent value="register">
                <register />
            </TabsContent>
        </Tabs>
    </div>
</template>

<script setup lang="ts">
import login from './login.vue';
import register from './register.vue'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
</script>