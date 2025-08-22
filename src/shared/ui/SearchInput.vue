<template>
    <div class="relative w-full">
        <input
            :value="modelValue"
            class="w-full h-[40px] pl-10 pr-4 py-2 bg-[var(--gray-100)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2884EF] focus:border-transparent placeholder-[var(--gray-400)] text-[13px] font-medium md:max-w-[400px]"
            placeholder="Поиск"
            type="text"
            @input="handleInput"
        >
        <img
            :src="SearchIcon"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-[14px] h-[14px]"
        >
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SearchIcon from '@/shared/assets/icons/icon-magnifier.svg';

const props = defineProps<{
  modelValue: string;
  debounce?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputValue = ref(props.modelValue);
let timeoutId: number | null = null;

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    inputValue.value = value;

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
        emit('update:modelValue', value);
    }, props.debounce || 300) as unknown as number;
};

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});
</script>