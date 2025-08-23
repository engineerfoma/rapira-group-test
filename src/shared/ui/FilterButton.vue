<template>
    <button
        class="flex items-center gap-[4px] text-[var(--gray-500)]"
        data-test="filter-button"
        @click="$emit('click')"
    >
        <span class="text-sm font-medium">{{ $t('buttons.filter') }}</span>
        <img
            :src="isOpen ? ChevronUpIcon : ChevronDownIcon"
            class="w-4 h-4"
        >
    </button>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@/shared/assets/icons/icon-chevron-down.svg';
import ChevronUpIcon from '@/shared/assets/icons/icon-chevron-up.svg';

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>