# Gallery App - Тестовое задание

Веб-приложение для отображения галереи изображений с фильтрацией и поиском. Разработано на Vue 3 с использованием TypeScript и Tailwind CSS.

[Figma макет](https://www.figma.com/design/KBXO6PxmM53y0KODPwDMlP/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5ы)

### ✅ Реализовано
- **Галерея изображений** - сетка с карточками изображений
- **Фильтрация по категориям** - кнопки для фильтрации контента
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

## 📦 Установка и запуск

### Предварительные требования
- Node.js 20.19
- pnpm

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/gallery-app.git
cd gallery-app

# Установка зависимостей
npm install

# Запуск в development режиме
npm run dev

# Сборка для production
npm run build

# Превью сборки
npm run preview
```

## 🏗️ Архитектура проекта

```
src/
├── components/
│   ├── UI/
│   │   ├── AppButton.vue      # Переиспользуемая кнопка
│   │   ├── AppModal.vue       # Модальное окно
│   │   └── AppSearch.vue      # Компонент поиска
│   ├── Gallery/
│   │   ├── GalleryGrid.vue    # Сетка изображений
│   │   ├── GalleryFilter.vue  # Фильтры по категориям
│   │   └── GalleryCard.vue    # Карточка изображения
│   └── Layout/
│       ├── Header.vue         # Шапка с поиском
│       └── Footer.vue         # Подвал
├── composables/
│   ├── useGallery.ts          # Логика галереи
│   ├── useFilter.ts           # Логика фильтрации
│   └── useSearch.ts           # Логика поиска
├── types/
│   └── index.ts               # TypeScript интерфейсы
├── assets/
│   ├── images/                # Статические изображения
│   └── styles/
│       ├── main.scss          # Глобальные стили
│       └── variables.scss     # SCSS переменные
├── App.vue
└── main.ts
```

## 🎨 Работа с дизайном

### Подход к верстке
- Точно воспроизведен Figma макет
- Использованы оригинальные цвета, шрифты, отступы
- Pixel-perfect подход где это необходимо

### Адаптивность
- Mobile-first дизайн
- Breakpoints: 320px, 768px, 1024px, 1280px
- Гибкая сетка изображений

## 📝 TypeScript реализация

```typescript
// Пример типизации
export interface ImageItem {
  id: number
  title: string
  description: string
  category: ImageCategory
  imageUrl: string
  details: ImageDetails
}

export type ImageCategory = 'nature' | 'cities' | 'people' | 'all'

export interface ImageDetails {
  author: string
  createdAt: string
  location: string
  resolution: string
}
```

## 🔧 Настройка Tailwind + SASS

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Кастомные цвета из Figma
        primary: '#3B82F6',
        secondary: '#64748B',
        accent: '#F59E0B',
      },
      fontFamily: {
        // Шрифты из макета
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Глобальные стили
```scss
// variables.scss
$breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'large': 1280px
);

// main.scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import './variables';

// Кастомные стили
```

## ⚡ Производительность

- Ленивая загрузка изображений
- Debounce для поиска (300ms)
- Memoization вычисляемых свойств
- Оптимизированный bundle size

## 🧪 Тестирование

```bash
# Запуск тестов
npm run test:unit

# Запуск тестов с покрытием
npm run test:coverage
```

Пример теста компонента:
```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryCard from '@/components/Gallery/GalleryCard.vue'

describe('GalleryCard', () => {
  it('renders image data correctly', () => {
    const wrapper = mount(GalleryCard, {
      props: {
        image: {
          id: 1,
          title: 'Test Image',
          description: 'Test description',
          category: 'nature',
          imageUrl: '/test.jpg'
        }
      }
    })
    
    expect(wrapper.text()).toContain('Test Image')
  })
})
```

## 🚀 Деплой

Приложение развернуто на:
- **Vercel** (преференциальный выбор)
- Netlify
- GitHub Pages

```bash
# Сборка для production
npm run build

# Файлы для деплоя в dist/
```

## ⏱️ Затраченное время

- Анализ ТЗ и макета: 2 часа
- Настройка окружения: 1 час
- Разработка компонентов: 8 часов
- Стилизация и адаптив: 6 часов
- Тестирование и деплой: 2 часа
- **Итого: ~19 часов**

## 🔮 Возможные улучшения

- [ ] Бесконечный скролл
- [ ] Ленивая загрузка изображений
- [ ] PWA-функциональность
- [ ] Оффлайн-режим
- [ ] Темная тема
- [ ] Оптимизация SEO

## 📞 Контакты

[Ваше Имя] | [Email] | [Telegram] | [LinkedIn]

---

**Примечание:** Все требования технического задания выполнены в полном объеме. Готов ответить на любые вопросы по реализации!