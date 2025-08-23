<template>
    <base-loading v-if="loading" />
    <not-found v-else-if="!loading && !posts.length" />
    <div
        v-else
        :class="gridClasses"
    >
        <blog-card-item
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @click="openPostModal(post)"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BlogCardItem from './BlogCardItem.vue';
import type { BlogPost } from '@/types/blog';
import { BaseLoading, NotFound } from '@/shared/ui';

defineProps<{
    posts: BlogPost[];
    error: string | null;
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: 'openModal', post: BlogPost): void;
}>();

const gridClasses = computed(() => ([
    'grid grid-cols-1 gap-5',
    'max-w-[1300px]',
    'mx-[10px] mt-[10px] mb-[30px] p-[15px]',
    'rounded-xl bg-white',
    'md:grid-cols-2',
    'xl:grid-cols-3',
    'xl:mt-[20px] xl:mx-auto xl:p-[30px]'
]));

const openPostModal = (post: BlogPost) => {
    emit('openModal', post);
};
</script>