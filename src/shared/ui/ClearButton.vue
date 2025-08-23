<template>
    <button
        class="text-[14px] font-medium text-[var(--primary-blue-color)] hover:text-[var(--accent-blue-color)] transition-colors"
        @click="$emit('click')"
    >
        {{ $t('buttons.clear') }}
    </button>
</template>

<script setup lang="ts">
defineEmits<{
  click: [];
}>();
</script>