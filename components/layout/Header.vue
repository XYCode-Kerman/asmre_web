<template>
    <NavigationMenu class="w-full justify-start border-b bg-background py-2 px-2">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NuxtLink to="/">
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()" class="font-bold">
                        Atomic Student Manager - Reborn
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NuxtLink to="/user">
                    <NavigationMenuLink :class="navigationMenuTriggerStyle()" class="font-bold">
                        用户
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
</script>