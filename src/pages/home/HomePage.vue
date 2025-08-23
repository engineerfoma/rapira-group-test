<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
                <h1 class="font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
                    О проекте
                </h1>
                <div class="w-24 h-2 bg-[var(--primary-blue-color)] mx-auto rounded-full" />
            </div>

            <div class="bg-white rounded-xl shadow-xl p-8 sm:p-12 backdrop-blur-sm border border-gray-100">
                <p class="font-medium text-md leading-6 text-[var(--gray-900)] text-justify mb-8">
                    Данный проект является тестовым заданием для прохождения к следующему этапу собеседования.<br><br>
                    Качество реализации показывает технический уровень подготовки кандидата. На этой странице будет дублироваться инфомрация из README.md <br><br>
                </p>

                <div class="grid md:grid-cols-2 gap-8 mb-8">
                    <div class="bg-blue-50 rounded-xl p-6">
                        <h3 class="font-semibold text-xl text-blue-900 mb-4">
                            🛠️ Технологии
                        </h3>
                        <ul>
                            <li class="text-gray-600 leading-7">
                                Vue 3 + Composition API
                            </li>
                            <li class="text-gray-600 leading-7">
                                Tailwind CSS и SCSS
                            </li>
                            <li class="text-gray-600 leading-7">
                                TypeScript
                            </li>
                            <li class="text-gray-600 leading-7">
                                Сборщик Vite
                            </li>
                            <li class="text-gray-600 leading-7">
                                Vitest для написания unit-тестов
                            </li>
                        </ul>
                    </div>

                    <div class="bg-green-50 rounded-xl p-6">
                        <h3 class="font-semibold text-xl text-green-900 mb-4">
                            📋 Описание
                        </h3>
                        <p class="text-gray-600 leading-7">
                            Одностраничное веб-приложение для отображения галереи изображений с
                            возможностью их фильтрации и просмотра подробной информации.
                        </p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-xl p-8">
                    <h3 class="font-bold text-2xl text-[var(--gray-900)] text-center mb-6">
                        ✨ Особености
                    </h3>
                    <div>
                        <p class="text-[var(--gray-600)] leading-7">
                            Реализована синхронизация фильтрации и поиска с url-строкой в обе стороны, что позволяет добавить страницу в избранное и перейти отсортированным карточкам галереи.<br><br>
                            Использовался гибридный подход в архитектуре проекта, чтобы при масштабировании легче было перейти на FSD.<br><br>
                            Использовал разный подход к написанию стилей: module, scoped, tailwindcss (просто показать, что знаком с разными подходами).<br><br>
                            Использовал i18n для локализации всех статических выражений. В перспективе можно легко добавить мультиязычность.<br><br>
                            Применил компонентный подход, разделяя функциональность на мелкие, переиспользуемые компоненты<br><br>
                            Придерживался принципов DRY (Don't Repeat Yourself) и KISS (Keep It Simple, Stupid)<br><br>
                            Проект легко поддерживаемый и расширяемый.<br><br>
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <button
                    class="font-semibold bg-[var(--primary-blue-color)] hover:bg-[var(--accent-blue-color)] text-white px-8 py-4 rounded-xl
                      transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <router-link to="/blog">
                        К проекту
                    </router-link>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

* {
  transition: all 0.3s ease;
}
</style>