<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { NAVIGATION } from '@/constants';
import { useMobileMenu } from '@/composables/useMobileMenu';

const router = useRouter();
const route = useRoute();

const { isOpen, toggle, close } = useMobileMenu();

router.afterEach(close);
</script>

<template>
    <header class="sticky top-0 z-50 bg-black shadow-md">
        <!-- Десктоп -->
        <nav class="hidden md:flex items-center justify-between py-[15px] px-[56px]">
            <div class="flex items-center gap-[80px]">
                <router-link
                    to="/"
                    class="text-xl font-bold"
                >
                    <img
                        src="../assets/icons/icon-logo.svg"
                        viewBox="0 0 150 28"
                        width="150"
                        height="28"
                    >
                </router-link>
                <div class="flex items-center gap-[20px]">
                    <router-link
                        v-for="link in NAVIGATION"
                        :key="link.to"
                        :to="link.to"
                        :class="[
                            'text-white hover-link font-semibold text-[16px] leading-none tracking-normal transition-colors py-[8px] px-[14px]',
                            { 'active-link bg-[#1a1a1a] rounded-md': route.path === link.to }
                        ]"
                    >
                        {{ link.text }}
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Мобильный -->
        <div class="flex items-center flex-start gap-0.9 md:hidden py-[25.36px] pl-[22px] pr-[22px]">
            <button
                class="flex flex-col gap-1.5 w-6"
                @click="toggle"
            >
                <span
                    :class="[
                        'w-full h-0.5 bg-white transition-transform', { 'rotate-45 translate-y-2': isOpen }
                    ]"
                />
                <span
                    :class="[
                        'w-full h-0.5 bg-white opacity-30 transition-opacity', { 'opacity-0': isOpen }
                    ]"
                />
                <span
                    :class="[
                        'w-full h-0.5 bg-white opacity-30 transition-transform', { '-rotate-45 -translate-y-2': isOpen }
                    ]"
                />
            </button>

            <router-link
                to="/"
                class="text-xl font-bold ml-[15px]"
            >
                <img
                    src="../assets/icons/icon-logo.svg"
                    viewBox="0 0 150 28"
                    width="150"
                    height="28"
                >
            </router-link>
        </div>

        <!-- Мобильное меню -->
        <div
            :class="[
                'fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden duration-300 ease-in-out',
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            ]"
            @click="close"
        >
            <div
                :class="[
                    'fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                ]"
                @click.stop
            >
                <div class="py-[25.36px] pl-[22px] pr-[22px] bg-black border-b border-gray-200">
                    <img
                        src="../assets/icons/icon-logo.svg"
                        viewBox="0 0 150 28"
                        width="150"
                        height="28"
                    >
                </div>
                <nav class="p-6">
                    <router-link
                        v-for="link in NAVIGATION"
                        :key="link.to"
                        :to="link.to"
                        :class="[
                            'block py-4 text-lg text-gray-700 hover-link border-b border-gray-100 last:border-b-0',
                            { 'active-link': route.path === link.to }
                        ]"
                        active-class="text-blue-600 font-medium"
                        @click="close"
                    >
                        {{ link.text }}
                    </router-link>
                </nav>
            </div>
        </div>
    </header>
</template>
<style scoped>
.active-link {
    color: var(--accent-blue-color);
}

.hover-link:hover {
    color: var(--accent-blue-color);
}
</style>