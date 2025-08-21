<script lang="ts" setup>
import { HeaderContent } from '@/shared/ui';
</script>

<template>
    <div class=" default-layout">
        <header-content />
        <main>
            <slot />
        </main>
    </div>
</template>

<style lang="scss" module>
</style>
