<template>
    <button
        class="text-[14px] font-medium text-[#2884EF] hover:text-[#3E97FF] transition-colors"
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