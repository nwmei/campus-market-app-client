import React from 'react';

export const mockCardData = [
  {
    seller : {
      firstName: 'Samantha',
      lastName: 'Smith',
      imageUrl: "data:image/png;base64,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",
      emailAddress: 'sam.smith@northeastern.edu',
    },
    name: 'Chem 101 book',
    category: 'books',
    neighborhood: 'West Campus',
    description: 'contains dried up teardrops',
    date: '01/02/21',
    price: 25,
    daysAgo: 3,
    imageUrls: ['https://di2ponv0v5otw.cloudfront.net/posts/2020/12/28/5feaaa1cbcdb2f6631988f58/m_5feaaa2a446e59fd4a41b91b.jpg']
  },
  {
    seller : {
      firstName: 'Cathy',
      lastName: 'Thomas',
      imageUrl: "https://img.pngeasy.com/lrtk/down/png/1610/16young-avatar-collection/girl-1.png",
      emailAddress: 'cathy.t@bu.edu',
    },
    name: 'french press',
    category: 'kitchen',
    neighborhood: 'Stuvi 2',
    description: 'works as good as new',
    date: '01/02/21',
    price: 2,
    daysAgo: 4,
    imageUrls: ['https://secure.img1-fg.wfcdn.com/im/12067736/resize-h600-w600%5Ecompr-r85/5363/53638004/Bodum+Chambord+French+Press+Coffee+Maker.jpg']
  },
  {
    seller : {
      firstName: 'Nelson',
      lastName: 'Mei',
      imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gjnsz19TcAIvCQV7q3bnlT8vSaddl69HQgkUmHIzA=s96-c",
      emailAddress: 'nwmei@bu.edu',
    },
    name: 'desk chair (like new)',
    category: 'furniture',
    neighborhood: 'Warren Towers',
    description: 'I sat on this chair for a bit, but then decided to go for a gaming chair LOL but this is still new!',
    date: '01/02/21',
    price: 2,
    daysAgo: 2,
    imageUrls: ['https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQkEkxv3nvu4_AUretYQvt8fCuvQkiECqbMKQQ90X1JhTJAYOzWtTRS-IOFIQ8hSSLFLta3pKgsCHKV-qpWkZr9BAheWivOq5NCsXxL4w1&usqp=CAc']
  },
];
