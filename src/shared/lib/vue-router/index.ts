export const pathKeys = {
    root: '/',

    home() {
        return pathKeys.root;
    },

    blog() {
        return pathKeys.root.concat('blog/');
    },
} as const;