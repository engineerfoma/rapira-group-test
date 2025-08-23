<template>
    <button
        class="inline-flex items-center gap-1.5 transition-colors duration-200"
        :class="chipClasses"
        @click="$emit('toggle')"
    >
        <span class="text-sm font-medium leading-none tracking-normal whitespace-nowrap">
            {{ label }}
        </span>
        <img
            :src="isSelected ? CheckIcon : PlusIcon"
            class="w-4 h-4 flex-shrink-0"
            alt="icon"
        >
    </button>
</template>

<script setup lang="ts">
import PlusIcon from '@/shared/assets/icons/icon-plus.svg';
import CheckIcon from '@/shared/assets/icons/icon-check.svg';
import { computed } from 'vue';

const props = defineProps<{
    label: string;
    isSelected: boolean;
}>();

defineEmits<{
    toggle: [];
}>();

const chipClasses = computed(() => ({
    'bg-[var(--primary-light)] text-[--primary-blue-color]': !props.isSelected,
    'bg-[var(--accent-blue-color)] text-white': props.isSelected,
    'py-1.5 px-3.5 rounded-full md:py-2': true,
}));
</script>