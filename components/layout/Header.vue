<template>
    <Menubar>
        <MenubarMenu>
            <NuxtLink to="/">
                <MenubarTrigger class="max-w-32 text-[0.7rem] md:max-w-none md:text-base">Atomic Student Manager -
                    Reborn</MenubarTrigger>
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

        <MenubarMenu>
            <MenubarTrigger>其他</MenubarTrigger>
            <MenubarContent>
                <NuxtLink to="/contents/term-use">
                    <MenubarItem>使用条款</MenubarItem>
                </NuxtLink>

                <NuxtLink to="/contents/privacy-term">
                    <MenubarItem>隐私政策</MenubarItem>
                </NuxtLink>

                <NuxtLink to="/contents/third-party-info">
                    <MenubarItem>第三方版权信息</MenubarItem>
                </NuxtLink>
            </MenubarContent>
        </MenubarMenu>
    </Menubar>
</template>

<script setup lang="ts">
</script>