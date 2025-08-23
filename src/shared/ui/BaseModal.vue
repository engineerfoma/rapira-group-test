<template>
    <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div
            v-if="isOpen"
            class="fixed inset-0 z-50 overflow-y-auto"
        >
            <div
                class="fixed layout inset-0 bg-black bg-opacity-50"
                @click="$emit('close')"
            />
            <div class="flex items-center justify-center min-h-full p-4">
                <div class="relative bg-white rounded-xl shadow-xl w-full min-w-[350px] max-w-[630px] max-h-[90vh] overflow-y-auto">
                    <button
                        class="absolute top-5 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
                        @click="$emit('close')"
                    >
                        <img
                            :src="IconClose"
                            alt=""
                        >
                    </button>

                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import IconClose from '@/shared/assets/icons/icon-close.svg';

interface Props {
isOpen: boolean;
}

interface Emits {
(e: 'close'): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<style scoped>
.layout {
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(4px);
}
</style>