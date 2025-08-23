<template>
    <div class="relative w-full">
        <input
            :value="modelValue"
            class="w-full h-[40px] pl-10 pr-4 py-2 bg-[var(--gray-100)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue-color)] focus:border-transparent placeholder-[var(--gray-400)] text-[13px] font-medium md:max-w-[400px]"
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
import { onUnmounted, ref, watch } from 'vue';
import { debounce } from 'lodash-es';
import SearchIcon from '@/shared/assets/icons/icon-magnifier.svg';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputValue = ref(props.modelValue);

const debouncedEmit = debounce((value: string) => {
    emit('update:modelValue', value);
}, 300);

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    inputValue.value = value;
    debouncedEmit(value);
};

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
});

onUnmounted(() => {
    debouncedEmit.cancel();
});
</script>