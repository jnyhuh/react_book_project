import product1Image from 'assets/img/products/mockingbird.jpg';
import product2Image from 'assets/img/products/guitar.jpg';
import product3Image from 'assets/img/products/educated.jpg';
import product4Image from 'assets/img/products/reckoning.jpg';

import user1Image from 'assets/img/users/100_1.jpg';
import user2Image from 'assets/img/users/100_2.jpg';
import user3Image from 'assets/img/users/100_3.jpg';

export const productsData = [
  {
    id: 1,
    image: product1Image,
    title: 'To Kill a Mockingbird',
    description: 'Harper Lee',
    right: '$10.99',
  },
  {
    id: 2,
    image: product2Image,
    title: 'Guitar for Dummies',
    description: 'Jon Chappell, Mark Phillips',
    right: '$9',
  },
  {
    id: 3,
    image: product3Image,
    title: 'Educated',
    description: 'Tara Westover',
    right: '$12.99',
  },
  {
    id: 4,
    image: product4Image,
    title: 'The Reckoning',
    description: 'John Grisham',
    right: '$20',
  },
];

export const booksRead = [
  {
    id: 1,
    image: product1Image,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    review: 'This was a great book. I read it when I was in middle school and now I\'m reading it again as an adult.',
    stars: '5',
  },
  {
    id: 2,
    image: product2Image,
    title: 'Guitar for Dummies',
    author: 'Jon Chappell, Mark Phillips',
    right: '$9',
  },
  {
    id: 3,
    image: product3Image,
    title: 'Educated',
    author: 'Tara Westover',
    right: '$12.99',
  },
  {
    id: 4,
    image: product4Image,
    title: 'The Reckoning',
    author: 'John Grisham',
    right: '$20',
  },
];

export const avatarsData = [
  {
    avatar: user1Image,
    name: 'Tom',
    date: '3 months ago',
  },
  {
    avatar: user2Image,
    name: 'Jenny',
    date: '2 months ago',
  },
  {
    avatar: user3Image,
    name: 'Sim',
    date: '2 hours ago',
  },
];

export const userProgressTableData = [
  {
    avatar: user1Image,
    name: 'Tom',
    date: '3 months ago',
    progress: 75,
  },
  {
    avatar: user2Image,
    name: 'Jenny',
    date: '2 months ago',
    progress: 60,
  },
  {
    avatar: user3Image,
    name: 'Sim',
    date: '2 hours ago',
    progress: 90,
  },
];

export const supportTicketsData = [
  {
    id: 1,
    avatar: user1Image,
    name: 'Sim',
    date: '30 mins ago',
    text:
      'Awesome book. I give it five stars. Hugged my puppy and told him how much I loved him at the end and cried. Was literally, like, wonderful.',
  },
  {
    id: 2,
    avatar: user2Image,
    name: 'Jane',
    date: '1 hour ago',
    text:
      'I shouldn\'t have wasted my time on this book. The first few chapters were interesting. Then, it started talking about plants.',
  },
  {
    id: 3,
    avatar: user3Image,
    name: 'Tom',
    date: 'yesterday',
    text:
      'I don\'t like to read, but this comic book was fun.',
  },
];
