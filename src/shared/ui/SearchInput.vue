<template>
    <div class="relative">
        <input
            :value="modelValue"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2884EF] focus:border-transparent"
            placeholder="Поиск"
            type="text"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg?component';

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>