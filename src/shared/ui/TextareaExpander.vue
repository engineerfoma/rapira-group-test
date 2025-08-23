<template>
    <div class="textarea-expander">
        <div
            class="textarea-wrapper"
            :class="{
                'has-text': hasText,
                'expanded': isExpanded,
                'error': showError
            }"
            @click="focusTextarea"
        >
            <textarea
                ref="textareaRef"
                v-model="internalValue"
                :placeholder="placeholder"
                class="custom-textarea"
                :rows="isExpanded ? 4 : 1"
                @focus="isExpanded = true"
                @blur="handleBlur"
                @input="handleInput"
            />
        </div>

        <div
            v-if="isExpanded"
            class="buttons-container"
        >
            <button
                class="cancel-btn"
                @click="handleCancel"
            >
                {{ $t('modal.cancel') }}
            </button>
            <button
                class="submit-btn"
                :disabled="showError"
                @click="handleSubmit"
            >
                {{ $t('modal.publish') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';

interface Props {
  modelValue?: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Введите текст'
});

const emit = defineEmits<Emits>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isExpanded = ref(false);
const internalValue = ref(props.modelValue);

const hasText = computed(() => internalValue.value.trim().length > 0);
const showError = computed(() => !hasText.value && isExpanded.value);

const focusTextarea = () => {
    if (!isExpanded.value) {
        isExpanded.value = true;
        nextTick(() => {
            textareaRef.value?.focus();
        });
    }
};

const handleInput = () => {
    emit('update:modelValue', internalValue.value);
};

const handleBlur = () => {
    if (!hasText.value) {
        isExpanded.value = false;
    }
};

const handleCancel = () => {
    internalValue.value = '';
    isExpanded.value = false;
    emit('update:modelValue', '');
    emit('cancel');
};

const handleSubmit = () => {
    if (hasText.value) {
        emit('submit', internalValue.value);
        internalValue.value = '';
        isExpanded.value = false;
        emit('update:modelValue', '');
    }
};

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
});
</script>

<style scoped lang="scss">
.textarea-expander {
  width: 100%;
}

.textarea-wrapper {
  width: 600px;
  height: 52px;
  border-radius: 6px;
  border: 1px solid var(--gray-color);
  padding: 15px;
  gap: 10px;
  background: white;
  transition: all 0.2s ease;
  cursor: text;

  &.has-text {
    border-color: var(--accent-blue-color);
    box-shadow: 0px 0px 0px 2px rgba(62, 151, 255, 0.32);
  }

  &.error {
    border-color: var(--border-error);
    box-shadow: 0px 0px 0px 2px rgba(241, 65, 108, 0.32);
  }

  &.expanded {
    height: auto;
    min-height: 120px;
  }
}

.custom-textarea {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0%;
  background: transparent;

  &::placeholder {
    color: var(--gray-400);
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
  }
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.cancel-btn, .submit-btn {
  width: 120px;
  height: 38px;
  border-radius: 6px;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 13px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: var(--primary-light);
  color: var(--accent-blue-color);

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
}

.submit-btn {
  background: var(--accent-blue-color);
  color: white;

  &:disabled {
    background: var(--gray-100);
    color: var(--gray-400);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--hover-blue-color);
  }
}
</style>