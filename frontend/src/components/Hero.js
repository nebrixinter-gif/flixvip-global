import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t, formatPrice } from '../i18n/translations';

export default function Hero() {
  const { lang, currency } = useApp();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email) {
      sessionStorage.setItem('nf_signup_email', email);
      navigate('/signup');
    }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwzfHxmaWxtJTIwcmVlbHxlbnwwfHx8YmxhY2t8MTc3ODQzOTMwOXww&ixlib=rb-4.1.0&q=85"
          alt="Netflix backdrop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-3xl px-4 md:px-8">
        <h1 className="text-white font-black text-4xl md:text-6xl leading-tight tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
          {t(lang, 'hero_title')}
        </h1>
        <p className="text-white text-xl md:text-2xl mt-5 font-medium">
          {lang === 'pt-BR'
            ? `Por apenas ${formatPrice(4.15, currency, lang)}/mês. Cancele quando quiser.`
            : lang === 'es'
            ? `Desde ${formatPrice(4.15, currency, lang)}/mes. Cancela cuando quieras.`
            : `Starts at ${formatPrice(4.15, currency, lang)}/month. Cancel anytime.`}
        </p>
        <p className="text-white text-base md:text-lg mt-6">
          {t(lang, 'hero_cta')}
        </p>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t(lang, 'hero_email')}
            className="flex-1 w-full sm:w-auto h-14 px-4 bg-black/60 border border-white/40 text-white placeholder-white/70 rounded text-base focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="h-14 px-6 sm:px-8 bg-[#E50914] hover:bg-[#f6121d] text-white font-semibold text-xl rounded flex items-center gap-2 whitespace-nowrap transition-colors"
          >
            {t(lang, 'hero_get_started')}
            <ChevronRight className="w-6 h-6" />
          </button>
        </form>
      </div>
    </section>
  );
}
