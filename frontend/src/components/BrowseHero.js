import React, { useEffect, useState } from 'react';
import { Play, Info, VolumeX, Volume2 } from 'lucide-react';
import { imgUrl, getVideos } from '../services/tmdb';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';

export default function BrowseHero({ item, onPlay }) {
  const { lang } = useApp();
  const [videoId, setVideoId] = useState(null);
  const [muted, setMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!item) return;
    let active = true;
    getVideos(item, lang).then(v => {
      if (active && v) {
        setVideoId(v);
        setTimeout(() => setShowVideo(true), 1500);
      }
    });
    return () => { active = false; };
  }, [item, lang]);

  if (!item) return <div className="h-[80vh] bg-black" />;

  const title = item.title || item.name;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {showVideo && videoId ? (
          <iframe
            title={title}
            className="w-full h-full scale-[1.35] pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0&iv_load_policy=3`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        ) : (
          <img src={imgUrl(item.backdrop_path, 'original')} alt={title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="px-4 md:px-14 pb-16 md:pb-0 max-w-2xl">
          <h1 className="text-white text-3xl md:text-6xl font-black drop-shadow-lg">{title}</h1>
          <p className="text-white/90 mt-4 text-sm md:text-lg line-clamp-3 drop-shadow-md">{item.overview}</p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => onPlay && onPlay(item)} className="flex items-center gap-2 bg-white text-black font-semibold px-5 md:px-8 py-2.5 md:py-3 rounded hover:bg-white/85 transition-colors">
              <Play className="w-5 h-5 fill-black" />
              {t(lang, 'play')}
            </button>
            <button className="flex items-center gap-2 bg-white/20 text-white font-semibold px-5 md:px-8 py-2.5 md:py-3 rounded hover:bg-white/30 transition-colors backdrop-blur">
              <Info className="w-5 h-5" />
              {t(lang, 'more_info')}
            </button>
          </div>
        </div>
      </div>

      {videoId && (
        <button onClick={() => setMuted(m => !m)} className="absolute right-4 md:right-14 bottom-24 z-20 w-10 h-10 rounded-full border-2 border-white/60 text-white flex items-center justify-center hover:border-white bg-black/40">
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </section>
  );
}
