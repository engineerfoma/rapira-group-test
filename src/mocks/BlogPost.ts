import { type BlogPost } from '@/types/blog';

export const mockBlogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Вдохновение в каждом шаге',
        description: 'Наши путешественники находят вдохновение в каждом шаге своего пути.',
        image: '/public/images/image-1.png',
        date: '2024-04-09',
        readTime: '2',
        categories: ['Природа', 'Люди'],
        comments: [
            {
                id: '1',
                author: 'Мира Гусева',
                avatar: '',
                text: 'Эти мгновения наполняют наши сердца радостью и любовью.',
                date: '2024-04-09',
            }
        ]
    },
    {
        id: '2',
        title: 'Моменты тишины и покоя',
        description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
        image: '/public/images/image-2.png',
        date: '2024-04-06',
        readTime: '3',
        categories: ['Природа', 'Животные'],
        comments: []
    },
    {
        id: '3',
        title: 'Цвета природы в наших руках',
        description: 'Наши художники выражают всю красоту окружающего мира через творчество.',
        image: '/public/images/image-3.png',
        date: '2024-02-12',
        readTime: '3',
        categories: ['Природа', 'Искусство'],
        comments: []
    },
    {
        id: '4',
        title: 'Семейные узы в дикой природе',
        description: 'Наши художники выражают всю красоту окружающего мира через творчество.',
        image: '/public/images/image-4.png',
        date: '2024-03-31',
        readTime: '4',
        categories: ['Природа', 'Животные'],
        comments: []
    },
    {
        id: '5',
        title: 'Гармония городских и природных пейзажей',
        description: 'Этот вид напоминает нам о том, как природа и город могут сосуществовать в гармонии.',
        image: '/public/images/image-5.png',
        date: '2024-07-03',
        readTime: '14',
        categories: ['Природа', 'Искусство'],
        comments: []
    },
    {
        id: '6',
        title: 'Моменты, которые остаются в сердце',
        description: 'Эти мгновения наполняют наши сердца радостью и любовью.',
        image: '/public/images/image-6.png',
        date: '2024-05-25',
        readTime: '4',
        categories: ['Природа', 'Люди', 'Животные'],
        comments: []
    },
    {
        id: '7',
        title: 'Объятия, которые говорят больше слов',
        description: 'В мире, где слова иногда теряют свою силу, объятия могут стать самым мощным...',
        image: '/public/images/image-7.png',
        date: '2024-01-01',
        readTime: '10',
        categories: ['Природа', 'Люди'],
        comments: []
    },
    {
        id: '8',
        title: 'Вечная гармония',
        description: 'Фреска с божествами, словно окно в иной мир, где царит вечная гармония и покой.',
        image: '/public/images/image-8.png',
        date: '2024-04-01',
        readTime: '15',
        categories: ['Искусство', 'Люди'],
        comments: []
    },
    {
        id: '9',
        title: 'Вкус лета',
        description: 'Напоминание о том, что простые удовольствия могут приносить огромное счастье.',
        image: '/public/images/image-9.png',
        date: '2024-05-05',
        readTime: '4',
        categories: ['Еда', 'Люди'],
        comments: []
    },
    {
        id: '10',
        title: 'Эхо прошлого',
        description: 'Старинное здание, укрытое под кронами деревьев, словно хранит в себе эхо прошлого.',
        image: '/public/images/image-10.png',
        date: '2024-04-25',
        readTime: '4',
        categories: ['Природа', 'Люди', 'Животные'],
        comments: []
    }
];