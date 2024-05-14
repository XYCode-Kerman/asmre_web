<template>
    <div>
        <Card class="rounded-none py-0">
            <CardHeader class="pb-2 pt-4">
                <CardTitle>Atomic Student Manager Reborn</CardTitle>
            </CardHeader>

            <div class="my-1 h-[2px] bg-gray-200"></div>

            <CardContent class="grid grid-cols-3 text-xs text-gray-600 py-2 gap-8">
                <!-- 栏1 项目地址等信息 -->
                <div class="flex flex-col">
                    <h1 class="text-base font-extrabold mb-1">About ASMRE</h1>

                    <p>Atomic Student Manager - Reborn 是一款自由软件，我们已经开放了该软件的全部源代码，唯需遵守开源协议即可使用和修改。代码地址如下：</p>

                    <div class="h-1"></div>

                    <a href="https://github.com/XYCode-Kerman/asmre_web" class="link">
                        <Github class="link-img" /> ASMRE 前端实现
                    </a>

                    <a href="https://github.com/XYCode-Kerman/asmre_backend" class="link">
                        <Github class="link-img" /> ASMRE 后端实现
                    </a>
                </div>

                <!-- 版本信息等 -->
                <div class="flex flex-col">
                    <h1 class="text-base font-extrabold mb-1">Developing Stage Warning</h1>

                    <p>ASMRE 目前处于开发阶段，您 <u>不得</u> 擅自移除或修改右下角的水印信息。</p>

                    <p>本项目支持使用 <u>Vercel</u> 部署。</p>
                </div>

                <!-- 版权信息等 -->
                <div class="flex flex-col">
                    <h1 class="text-base font-extrabold mb-1">Copyright</h1>

                    <p>版权所有 © 2024 ASMRE 全体贡献者</p>

                    <p>本软件允许任何人重新部署、修改和再分发其的任何代码。</p>
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Github } from 'lucide-vue-next';

</script>

<style>
.link {
    @apply hover:underline flex items-center gap-1;
}

.link-img {
    @apply w-4;
}
</style>