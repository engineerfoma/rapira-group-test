import { ref } from 'vue';

export function useMobileMenu() {
    const isOpen = ref(false);

    const toggle = () => {
        isOpen.value = !isOpen.value;
        document.body.style.overflow = isOpen.value ? 'hidden' : 'auto';
    };

    const close = () => {
        isOpen.value = false;
        document.body.style.overflow = 'auto';
    };

    return {
        isOpen,
        toggle,
        close
    };
}