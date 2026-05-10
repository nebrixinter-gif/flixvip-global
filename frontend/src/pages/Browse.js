import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import BrowseHero from '../components/BrowseHero';
import Row from '../components/Row';
import Footer from '../components/Footer';
import { getTrending, getByGenre, getTopRated, getNetflixOriginals, getVideos } from '../services/tmdb';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';
import { X } from 'lucide-react';

export default function Browse() {
  const { lang } = useApp();
  const [hero, setHero] = useState(null);
  const [data, setData] = useState({});
  const [playing, setPlaying] = useState(null);
  const [playId, setPlayId] = useState(null);

  useEffect(() => {
    (async () => {
      const [trending, originals, topMovies, action, comedy, horror, romance, docs, topTv] = await Promise.all([
        getTrending(lang),
        getNetflixOriginals(lang),
        getTopRated('movie', lang),
        getByGenre(28, 'movie', lang),
        getByGenre(35, 'movie', lang),
        getByGenre(27, 'movie', lang),
        getByGenre(10749, 'movie', lang),
        getByGenre(99, 'movie', lang),
        getTopRated('tv', lang),
      ]);
      const pick = trending[Math.floor(Math.random() * Math.min(trending.length, 6))] || trending[0];
      setHero(pick);
      setData({ trending, originals, topMovies, action, comedy, horror, romance, docs, topTv });
    })();
  }, [lang]);

  const onPlay = async (item) => {
    setPlaying(item);
    const v = await getVideos(item, lang);
    setPlayId(v);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BrowseHero item={hero} onPlay={onPlay} />
      <div className="-mt-24 relative z-10">
        <Row title={t(lang, 'rows_trending')} items={data.trending} onPlay={onPlay} />
        <Row title={t(lang, 'rows_originals')} items={data.originals} large onPlay={onPlay} />
        <Row title={t(lang, 'rows_top_rated')} items={data.topMovies} onPlay={onPlay} />
        <Row title={t(lang, 'rows_action')} items={data.action} onPlay={onPlay} />
        <Row title={t(lang, 'rows_comedy')} items={data.comedy} onPlay={onPlay} />
        <Row title={t(lang, 'rows_horror')} items={data.horror} onPlay={onPlay} />
        <Row title={t(lang, 'rows_romance')} items={data.romance} onPlay={onPlay} />
        <Row title={t(lang, 'rows_documentaries')} items={data.docs} onPlay={onPlay} />
        <Row title={t(lang, 'rows_tv')} items={data.topTv} onPlay={onPlay} />
      </div>
      <Footer />

      {playing && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => { setPlaying(null); setPlayId(null); }}>
          <button onClick={() => { setPlaying(null); setPlayId(null); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800">
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video" onClick={e => e.stopPropagation()}>
            {playId ? (
              <iframe
                title="Player"
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${playId}?autoplay=1&modestbranding=1`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                frameBorder="0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">
                {lang === 'pt-BR' ? 'Trailer indisponível' : 'Trailer unavailable'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
