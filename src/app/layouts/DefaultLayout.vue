<template>
    <div class=" default-layout">
        <header-content />
        <main>
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
import { HeaderContent } from '@/shared/ui';
</script>

<style lang="scss" module>
</style>
