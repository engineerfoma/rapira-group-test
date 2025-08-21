<template>
    <component
        :is="iconComponent"
        v-if="iconComponent"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        :aria-labelledby="iconName"
        role="presentation"
        class="svg-icon"
        :class="iconClasses"
    />
    <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="viewBox"
        :aria-labelledby="iconName"
        role="presentation"
        class="svg-icon"
        :class="iconClasses"
    >
        <title
            v-if="iconName"
            :id="iconName"
        >
            {{ iconName }}
        </title>
        <g>
            <template
                v-if="path"
            >
                <path :d="path" />
            </template>
            <slot v-else />
        </g>
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { type IconName, iconList } from '@/shared/assets/icons';

type IconColors = 'default' | 'black' | 'light-blue';

const BASE_CLASS = 'svg-icon';

const props = defineProps({

    name: {
        type: String as () => IconName,
        default: undefined,
        validator: (value) => typeof value === 'string'
                && iconList.includes(value as IconName),
    },

    iconName: {
        type: String as () => string,
        default: undefined,
    },

    width: {
        type: [String, Number],
        default: 24,
    },

    height: {
        type: [String, Number],
        default: 24,
    },

    color: {
        type: String as () => IconColors,
        default: 'default',
        validator: (value: IconColors) => typeof value === 'string' && [
            'default', 'black', 'light-blue',
        ].includes(value),
    },

    viewBox: {
        default: '0 0 24 24',
        type: String,
    },

    path: {
        type: String,
        default: undefined,
    },

    left: {
        type: Boolean,
        default: false,
    },

    right: {
        type: Boolean,
        default: false,
    },
});

const iconClasses = computed(() => ({
    [`${BASE_CLASS}--${props.color}`]: props.color,
    [`${BASE_CLASS}--left`]: props.left,
    [`${BASE_CLASS}--right`]: props.right,
}));

const icons = Object.fromEntries(
    Object.entries(
        import.meta.glob(
            '../assets/icons/*.svg',
            { query: 'component', eager: true },
        ),
    ).map(
        ([key, value]) => {
            const filename = key.split('/').pop()!.split('.').shift();
            return [filename, value];
        },
    ),
);
console.log('icons', icons);
const iconComponent = computed(() => (props.name ? icons[props.name] : null));
console.log('iconComponent', iconComponent);

</script>

<style lang="scss">

.svg-icon {
    &--default {
        fill: var(--white-color);
    }

    &--black {
        fill: var(--black-color);
    }

    &--light-blue {
        fill: var(--primary-blue-color);
    }

    &--right {
        margin-left: 8px
    }

    &--left {
        margin-right: 8px
    }
}
</style>
