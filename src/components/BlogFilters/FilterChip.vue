<template>
    <button
        class="inline-flex items-center gap-1.5 rounded-full transition-colors duration-200"
        :class="chipClasses"
        @click="$emit('toggle')"
    >
        <span class="text-sm font-medium leading-none tracking-normal">
            {{ label }}
        </span>
        <component
            :is="iconComponent"
            class="w-3 h-3"
        />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PlusIcon from '@/assets/icons/plus.svg?component';
import CheckIcon from '@/assets/icons/check.svg?component';

defineProps<{
  label: string;
  isSelected: boolean;
}>();

defineEmits<{
  toggle: [];
}>();

const chipClasses = computed(() => ({
    'bg-[#EEF6FF] text-[#2884EF]': !isSelected,
    'bg-[#3E97FF] text-white': isSelected,
}));

const iconComponent = computed(() =>
    isSelected ? CheckIcon : PlusIcon
);
</script>