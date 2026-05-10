// Mock data and constants for Netflix clone

export const TMDB_KEYS = [
  'c8dea14dc917687ac631a52620e4f7ad',
  '3cb41ecea3bf606c56552db3d17adefd'
];

export const TMDB_BASE = 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p';

export const KIWIFY_LINK = 'https://kiwify.app/K5rE2km';

// Fallback movie/series data in case TMDB fails
export const FALLBACK_MOVIES = [
  {
    id: 1,
    title: 'Stranger Things',
    overview: 'Quando um garoto desaparece, uma pequena cidade descobre um mistério envolvendo experimentos secretos.',
    backdrop_path: 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    poster_path: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    vote_average: 8.6,
    youtubeId: 'b9EkMc79ZSU'
  }
];

// Faqs (Netflix style)
export const faqs = {
  'pt-BR': [
    { q: 'O que é a Netflix?', a: 'A Netflix é um serviço de streaming que oferece uma ampla variedade de séries, filmes e documentários premiados em milhares de aparelhos conectados à internet.' },
    { q: 'Quanto custa a Netflix?', a: 'Assine a Netflix por um preço mensal acessível. Sem contratos ou taxas extras.' },
    { q: 'Onde posso assistir?', a: 'Assista onde quiser, quando quiser. Faça login com sua conta Netflix em netflix.com pelo computador ou em qualquer aparelho conectado.' },
    { q: 'Como faço para cancelar?', a: 'A Netflix oferece flexibilidade. Sem contratos complicados. Você pode cancelar a conta online em apenas dois cliques.' },
    { q: 'O que posso assistir na Netflix?', a: 'A Netflix tem um acervo gigantesco de filmes, documentários, séries, animes e originais Netflix premiados.' },
    { q: 'A Netflix é boa para crianças?', a: 'A experiência infantil da Netflix faz parte da sua assinatura para que pais possam acompanhar o que crianças assistem em seu próprio espaço.' }
  ],
  'en': [
    { q: 'What is Netflix?', a: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.' },
    { q: 'How much does Netflix cost?', a: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee.' },
    { q: 'Where can I watch?', a: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer.' },
    { q: 'How do I cancel?', a: 'Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.' },
    { q: 'What can I watch on Netflix?', a: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.' },
    { q: 'Is Netflix good for kids?', a: 'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films.' }
  ],
  'es': [
    { q: '¿Qué es Netflix?', a: 'Netflix es un servicio de streaming que ofrece una amplia variedad de películas, series, documentales y más en miles de dispositivos conectados a internet.' },
    { q: '¿Cuánto cuesta Netflix?', a: 'Disfruta de Netflix en tu smartphone, tablet, Smart TV, laptop o dispositivo de streaming, todo por una tarifa mensual fija.' },
    { q: '¿Dónde puedo ver?', a: 'Mira donde sea, cuando sea. Inicia sesión con tu cuenta de Netflix para ver al instante.' },
    { q: '¿Cómo cancelo?', a: 'Netflix es flexible. No hay contratos molestos ni compromisos. Cancela tu cuenta en línea fácilmente con dos clics.' },
    { q: '¿Qué puedo ver en Netflix?', a: 'Netflix tiene una extensa biblioteca de películas, documentales, series, anime, originales premiados y más.' },
    { q: '¿Netflix es bueno para niños?', a: 'La experiencia infantil de Netflix está incluida en tu membresía para que los padres tengan control mientras los niños disfrutan de series y películas familiares.' }
  ]
};
