<template>
    <article
        class="blog-card rounded-lg group cursor-pointer w-full"
        @click="$emit('click', post)"
    >
        <div class="rounded-lg overflow-hidden">
            <img
                :src="post.image"
                :alt="post.title"
                class="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            >
        </div>

        <div class="blog-card__meta flex items-center gap-1 mt-2.5">
            <span class="blog-card__meta-item">{{ shortDate(post.date) }}</span>
            <span class="blog-card__meta-separator mx-2.5">•</span>
            <span class="blog-card__meta-item">
                <img
                    :src="IconClock"
                    alt="clock"
                >
                {{ post.readTime }} мин
            </span>
            <span class="blog-card__meta-separator mx-2.5">•</span>
            <span class="blog-card__meta-item">
                <img
                    :src="IconComments"
                    alt="comment"
                >
                {{ commentText(post.comments.length) }}
            </span>
        </div>

        <h3 class="blog-card__title mt-2.5">
            {{ post.title }}
        </h3>

        <p class="blog-card__description mt-2.5">
            {{ post.description }}
        </p>

        <div class="blog-card__categories mt-2.5 flex flex-wrap gap-2">
            <chip-item
                v-for="category in post.categories"
                :key="category"
                class="blog-card__category"
            >
                {{ category }}
            </chip-item>
        </div>
    </article>
</template>

<script setup lang="ts">
import IconComments from '@/shared/assets/icons/icon-comments.svg';
import IconClock from '@/shared/assets/icons/icon-clock.svg';
import type { BlogCardProps, BlogCardEmits } from '@/types/blog';
import { shortDate } from '@/utils/formatDate';
import { pluralize } from '@/utils/pluralize';
import ChipItem from './ChipItem.vue';

defineProps<BlogCardProps>();
defineEmits<BlogCardEmits>();

const commentText = (count: number) => {
    return pluralize(count, {
        one: 'комментарий',
        few: 'комментария',
        many: 'комментариев'
    });
};
</script>

<style scoped lang="scss">
.blog-card {
    width: 100%;

    &__meta {
        &-item {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 14px;
            letter-spacing: 0%;
            vertical-align: middle;
            color: #6B7280;
            display: flex;
            gap: 4px;
        }

        &-separator {
            color: #6B7280;
            font-size: 14px;
        }
    }

    &__title {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 22px;
        line-height: 100%;
        letter-spacing: -1%;
        vertical-align: middle;
    }

    &__description {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: 0%;
        vertical-align: middle;
    }
}

@media (min-width: 800px) {
    .blog-card {
        max-width: 100%;
    }
}
</style>