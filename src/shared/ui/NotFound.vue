<template>
    <div class="flex bg-white justify-center h-[50vh] mx-2.5 xl:mx-auto mt-[10px] md:mt-[20px] rounded-[12px] max-w-[1300px]">
        <div class="flex flex-col justify-center align-center w-[327px]">
            <img
                class="w-[46px] h-[46px] self-center mb-2.5"
                :src="NotFound"
                alt="Ничего не найдено"
            >
            <h2 class="self-center text-sm leading-[14px] text-center font-medium text-[var(--gray-600)] mb-[4px]">
                {{ $t('notFound.title') }}
            </h2>
            <p class="self-center text-xs leading-5 text-center font-medium text-[var(--gray-500)]">
                {{ $t('notFound.description') }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import NotFound from '../../../public/images/search-list.jpg';
</script>

<style scoped>

</style>