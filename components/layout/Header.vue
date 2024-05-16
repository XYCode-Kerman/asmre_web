<template>
    <Menubar>
        <MenubarMenu>
            <NuxtLink to="/">
                <MenubarTrigger>Atomic Student Manager - Reborn</MenubarTrigger>
            </NuxtLink>
        </MenubarMenu>

        <MenubarMenu>
            <MenubarTrigger>用户</MenubarTrigger>
            <MenubarContent>
                <NuxtLink to="/user/login-and-register">
                    <MenubarItem>登录和注册</MenubarItem>
                </NuxtLink>
                <NuxtLink to="/user/me">
                    <MenubarItem>个人信息</MenubarItem>
                </NuxtLink>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
</template>

<script setup lang="ts">
</script>