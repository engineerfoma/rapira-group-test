<template>
    <base-modal
        :is-open="isOpen"
        @close="$emit('close')"
    >
        <div class="p-[15px]">
            <h1 class="text-[20px] md:text-[24px] font-semibold mb-2.5">
                {{ post.title }}
            </h1>

            <div class="flex items-center gap-1 mb-[15px]">
                <MetaInfo
                    :text="shortDate(post.date)"
                    size="sm"
                />
                <MetaInfo
                    :text="`${post.readTime} мин`"
                    :icon="IconClock"
                    alt-text="Время чтения"
                    size="sm"
                />
                <MetaInfo
                    :text="commentText(post.comments.length)"
                    :icon="IconComments"
                    alt-text="Комментарии"
                    :show-separator="false"
                    size="sm"
                />
            </div>

            <div class="relative mb-[15px]">
                <img
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-cover rounded-xl"
                >
            </div>

            <p class="text-[14px] md:text-[16px] mb-2.5 font-medium">
                {{ post.text }}
            </p>

            <div class="flex flex-wrap gap-2 mb-[15px]">
                <chip-item
                    v-for="category in post.categories"
                    :key="category"
                >
                    {{ category }}
                </chip-item>
            </div>

            <div>
                <h3 class="text-md font-semibold mb-2.5 text-[var(--gray-900)]">
                    {{ $t('modal.comments') }}
                    <span class="font-medium text-[var(--gray-600)]">
                        {{ post.comments.length }}
                    </span>
                </h3>
                <textarea-expander
                    v-model="newComment"
                    :placeholder="$t('modal.enterAComment')"
                    @submit="handleAddComment"
                    @cancel="handleCancelComment"
                />
                <div
                    v-if="post.comments.length > 0"
                    class="space-y-4"
                >
                    <div
                        v-for="comment in post.comments"
                        :key="comment.id"
                        class="px-3 pt-3"
                    >
                        <div class="flex items-start gap-3">
                            <img
                                :src="comment.avatar ?? '/public/images/unknown.webp'"
                                :alt="comment.author"
                                class="w-10 h-10 rounded-full"
                            >
                            <div class="flex flex-col gap-1.5">
                                <span class="font-semibold text-[16px] leading-none text-[var(--gray-900)]">{{ comment.author }}</span>
                                <p class="text-[14px] leading-[20px] text-gray-700">
                                    {{ comment.text }}
                                </p>
                                <span class="text-[12px] font-medium leading-none text-[var(--gray-600)]">{{ dayjs(comment.date).format('D.MM.YYYY в HH:mm') }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <p
                    v-else
                    class="text-gray-500 text-center py-4"
                >
                    {{ $t('modal.noComents') }}
                </p>
            </div>
        </div>
    </base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BaseModal } from '@/shared/ui';
import IconComments from '@/shared/assets/icons/icon-comments.svg';
import IconClock from '@/shared/assets/icons/icon-clock.svg';
import { MetaInfo, ChipItem, TextareaExpander } from '@/shared/ui';
import { shortDate, pluralize } from '@/utils';
import type { BlogPost, Comment } from '@/types/blog';
import dayjs from 'dayjs';

interface Props {
  isOpen: boolean;
  post: BlogPost;
}

interface Emits {
  (e: 'close'): void;
  (e: 'addComment', payload: { postId: string; comment: Omit<Comment, 'id'> }): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const newComment = ref('');

const commentText = (count: number) => {
    return pluralize(count, {
        one: 'комментарий',
        few: 'комментария',
        many: 'комментариев'
    });
};

const handleAddComment = (text: string) => {
    const comment: Omit<Comment, 'id'> = {
        author: 'Анонимный пользователь',
        avatar: null,
        text,
        date: new Date().toISOString(),
    };
    emit('addComment', { postId: props.post.id, comment });
};

const handleCancelComment = () => {
    newComment.value = '';
};
</script>