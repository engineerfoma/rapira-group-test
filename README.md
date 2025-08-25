# Gallery App - Тестовое задание

Веб-приложение для отображения галереи изображений с фильтрацией и поиском. Разработано на Vue 3 с использованием TypeScript и Tailwind CSS.

[Figma макет](https://www.figma.com/design/KBXO6PxmM53y0KODPwDMlP/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5ы)

### ✅ Реализовано
- **Галерея изображений** - сетка с карточками изображений
- **Фильтрация по категориям** - кнопки для фильтрации контента
- **Мок API** - имитация APi запросов на сервер
- **Поиск по заголовкам** - реальный поиск с debounce
- **Модальное окно** - детальная информация об изображении
- **Адаптивный дизайн** - mobile-first подход
- **TypeScript** - полная типизация компонентов и данных

### 🎯 Особенности реализации
- Composition API с setup syntax
- Кастомные composables для логики
- Semantic HTML и доступность

## 🛠️ Технологии

- **Vue 3** - Composition API, Script Setup
- **TypeScript** - строгая типизация
- **Tailwind CSS** - утилитарные стили
- **SASS/SCSS** - сложные стили и переменные
- **Vite** - сборка и dev server
- **Vue Router** - навигация
- **msw** - моковый API

## 📦 Установка и запуск

### Предварительные требования
- Node.js 20.19
- pnpm

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/engineerfoma/rapira-group-test.git
cd rapira-group-test

# Установка зависимостей
pnpm install

# Запуск в development режиме
pnpm run dev

# Сборка для production
pnpm run build

# Превью сборки
npm run preview

# создает mockServiceWorker.ts в /public для работы с моками
npx msw init public/ --save
```

## 🏗️ Архитектура проекта

```
src/
├── app/
│   ├── layouts/
│   │   └── DefaultLayout.vue  # Дефолтный layout проекта
│   ├── router/ 
│   │   └── index.ts           # Настройки vue-router
│   │── main.ts
│   └── App.vue
├── components/
│   ├── BlogCardList/
│   │   ├── BlogCardItem.vue       # Карточка галереи
│   │   ├── BlogCardList.vue       # Сетка карточек галереи
│   │   ├── BlogCardModal.vue      # Модалка для карточки
│   │   └── index.ts               # exports
│   ├── BlogFilters/
│   │   ├── BlogFilters.vue        # Обёртка над фильтром и поиском
│   │   ├── FilterChip.vue         # Категории
│   │   └── index.ts               # exports
│   └── index.ts                   # exports
├── composables/
│   ├── useBlogPosts.ts            # Логика получения постов (фильтрация, поиск)
│   ├── useMobileMenu.ts           # Логика бургер меню
│   ├── useUrlParams.ts            # Логика синхронизации url с поиском и фильтрацией
│   └── index.ts                   # exports
├── constants/
│   ├── blog.ts                    # Начальное состояние выбранной карточки
│   ├── navigation.ts              # Элементы навигации
│   └── index.ts                   # exports
├── locales/
│   └── ru.json                    # Локализация
├── mocks/
│   ├── blogPosts.ts               # Моковые данные постов
│   ├── browser.ts                 # Конфигурация для перехвата сетевых запросов
│   ├── db.ts                      # База данных для моков
│   ├── handlers.ts                # Оработчик запросов
│   └── server.ts                  # Конфиг для имитация node в тестах
├── pages/
│   ├── blog/
│   │   ├── BlogPage.vue           # Страница галереи
│   │   └── index.ts               # Данные для роута
│   └── home/
│       ├── HomePage.vue           # Главная страница
│       └── index.ts               # Данные для роута
├── shared/
│   ├── assets/
│   │   ├── fonts                  # Шрифты
│   │   ├── icons                  # svg
│   │   └── styles                 # Стили
│   ├── ui/
│   │   ├── BaseLoading.vue        # Лоадер
│   │   ├── BaseModal.vue          # Модалка
│   │   ├── ChipItem.vue           # Категория
│   │   ├── ClearButton.vue        # Кнопка очистки
│   │   ├── FilterButton.vue       # Кнопка применения фильтров
│   │   ├── HeaderContent.vue      # Шапка сайта
│   │   ├── MetaInfo.vue           # Свойства карточки
│   │   ├── NotFound.vue           # Заглушка поиска
│   │   ├── SearchInput.vue        # Поиск
│   │   ├── TextareaExpander.vue   # Инпут комментария
│   │   └── index.ts               # exports
│   └── lib/
│       └── vue-router               
│           └── index.ts           # Ключи для роутера
├── types/
│   └── blog.ts                    # TypeScript интерфейсы
└──  utils/                        # Утилиты
```

## 🎨 Работа с дизайном

### Подход к верстке
- Точно воспроизведен Figma макет
- Использованы оригинальные цвета, шрифты, отступы
- Pixel-perfect подход где это необходимо

### Адаптивность
- Mobile-first дизайн
- Breakpoints: 375px, 800px, 1400px
- Гибкая сетка изображений

## 🧪 Тестирование

```bash
# Запуск тестов
pnpm run test:unit
```

```bash
# Сборка для production
npm run build

```

## ⏱️ Затраченное время

- Анализ ТЗ и макета: 2 часа
- Настройка окружения: 3 час
- Разработка компонентов: 8 часов
- Разработка бизнес логики: 10 часов
- Стилизация и адаптив: 6 часов
- Настройка msw: 3 часа
- Тестирование: 4 часа
- **Итого: ~36 часов**

## 🔮 Возможные улучшения

- [ ] Бесконечный скролл или пагинацию
- [ ] Ленивая загрузка изображений
- [ ] PWA-функциональность
- [ ] Оффлайн-режим
- [ ] Темная тема
- [ ] Мультиязычность
- [ ] Авторизация
- [ ] Оптимизация SEO

## 📞 Контакты

[Фоменко Николай] | [fomen_94@bk.ru] | [@fomenko_nick]

---

**Примечание:** Все требования технического задания выполнены в полном объеме. Готов ответить на любые вопросы по реализации!