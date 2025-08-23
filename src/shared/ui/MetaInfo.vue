<template>
    <div
        class="meta-info flex items-center gap-1"
        :class="[sizeClass, customClass]"
    >
        <span class="meta-info__item">
            <img
                v-if="icon"
                :src="icon"
                :alt="altText"
                :class="iconSizeClass"
            >
            {{ text }}
        </span>
        <span
            v-if="showSeparator"
            class="meta-info__separator mx-2.5"
        >•</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  text?: string;
  icon?: string;
  altText?: string;
  size?: 'sm' | 'md' | 'lg';
  showSeparator?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    text: '',
    icon: undefined,
    size: 'md',
    showSeparator: true,
    altText: '',
    customClass: ''
});

const sizeClass = computed(() => ({
    'text-xs': props.size === 'sm',
    'text-sm': props.size === 'md',
    'text-base': props.size === 'lg',
}));

const iconSizeClass = computed(() => ({
    'w-[16px] h-[16px]': props.size === 'sm',
    'w-[20px] h-[20px]': props.size === 'md',
    'w-[24px] h-[24px]': props.size === 'lg',
}));
</script>

<style scoped lang="scss">
.meta-info {
  &__item {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0%;
    vertical-align: middle;
    color: var(--gray-600);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__separator {
    color: var(--gray-600);
  }
}
</style>