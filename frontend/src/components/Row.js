import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Plus, ThumbsUp } from 'lucide-react';
import { imgUrl, getVideos } from '../services/tmdb';
import { useApp } from '../contexts/AppContext';

export default function Row({ title, items, large = false, onPlay }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(() => setCanLeft(el.scrollLeft > 10), 500);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="px-4 md:px-14 mb-10 md:mb-14">
      <h2 className="text-white text-lg md:text-2xl font-semibold mb-3">{title}</h2>
      <div className="relative group">
        {canLeft && (
          <button
            aria-label="Scroll left"
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-10 md:w-14 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={() => setCanLeft((scrollRef.current?.scrollLeft || 0) > 10)}
          className="flex gap-2 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
        >
          {items.map((item) => (
            <Card key={`${item.id}-${item.title || item.name}`} item={item} large={large} onPlay={onPlay} />
          ))}
        </div>
        <button
          aria-label="Scroll right"
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 md:w-14 bg-black/60 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}

function Card({ item, large, onPlay }) {
  const { lang } = useApp();
  const [hover, setHover] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const poster = large ? item.poster_path : item.backdrop_path;
  const src = imgUrl(poster, large ? 'w500' : 'w500');

  useEffect(() => {
    let active = true;
    if (hover && !videoId) {
      getVideos(item, lang).then(v => { if (active) setVideoId(v); });
    }
    return () => { active = false; };
  }, [hover, item, lang, videoId]);

  return (
    <div
      className={`relative flex-shrink-0 ${large ? 'w-[180px] md:w-[220px]' : 'w-[260px] md:w-[320px]'} cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onPlay && onPlay(item)}
    >
      <div className="relative rounded-md overflow-hidden bg-zinc-900 aspect-[16/9]">
        {src ? (
          <img src={src} alt={item.title || item.name} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white/50 text-sm">{item.title || item.name}</div>
        )}
        {hover && videoId && (
          <iframe
            title={item.title || item.name}
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}
      </div>
      {hover && (
        <div className="absolute left-0 right-0 top-full bg-zinc-900 rounded-b-md p-3 shadow-2xl z-40 -mt-1">
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90">
              <Play className="w-4 h-4 fill-black" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-white/60 text-white flex items-center justify-center hover:border-white">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-white/60 text-white flex items-center justify-center hover:border-white">
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button className="ml-auto w-8 h-8 rounded-full border-2 border-white/60 text-white flex items-center justify-center hover:border-white">
              <Info className="w-4 h-4" />
            </button>
          </div>
          <p className="text-white text-sm font-semibold line-clamp-1">{item.title || item.name}</p>
          <div className="flex items-center gap-2 mt-1 text-xs">
            <span className="text-green-400 font-semibold">{Math.round((item.vote_average || 7) * 10)}% {lang === 'pt-BR' ? 'relevante' : 'Match'}</span>
            <span className="text-white/60">{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
