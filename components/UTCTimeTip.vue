<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger class="inline-flex">
                <HelpCircle class="w-4" />
            </TooltipTrigger>
            <TooltipContent>
                <p>该时间为 <u>协调世界时(UTC)</u>，是目前使用最广泛的时间表示方式</p>
                <p>北京时间(BJT)比UTC <u>快8小时</u>，数学上缩写为 <span v-html="katex.renderToString('BJT = UTC + 8')"></span></p>
                <p>相较于格林尼治时间(GMT)而言，协调世界时快了 <span v-html="katex.renderToString('27s')"></span></p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script lang="ts" setup>
import katex from 'katex';
import 'katex/dist/katex.css';
import { HelpCircle } from 'lucide-vue-next';
</script>