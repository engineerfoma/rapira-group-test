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
            <MetaInfo :text="shortDate(post.date)" />
            <MetaInfo
                :text="`${post.readTime} мин`"
                :icon="IconClock"
                alt-text="Время чтения"
            />
            <MetaInfo
                :text="commentText(post.comments.length)"
                :icon="IconComments"
                alt-text="Комментарии"
                :show-separator="false"
            />
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
import type { BlogPost } from '@/types/blog';
import { shortDate, pluralize } from '@/utils';
import { ChipItem, MetaInfo } from '@/shared/ui';

export interface BlogCardProps {
    post: BlogPost;
}

export interface BlogCardEmits {
    (e: 'click', post: BlogPost): void;
    (e: 'addComment', payload: { postId: string; comment: Omit<Comment, 'id'> }): void;
}

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