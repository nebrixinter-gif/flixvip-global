import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { t, formatPrice } from '../i18n/translations';
import { Crown, Check, Sparkles, Award, Shield, Globe2, Headphones, Tv } from 'lucide-react';
import { KIWIFY_LINK } from '../mock/mock';

export default function Premium() {
  const { lang, currency } = useApp();
  const yearly = formatPrice(50, currency, lang);
  const monthly = formatPrice(4.15, currency, lang);

  const benefits = [
    { icon: Tv, title: t(lang, 'features_4k'), desc: lang === 'pt-BR' ? 'Qualidade de cinema na sua casa.' : 'Cinema-grade quality at home.' },
    { icon: Award, title: t(lang, 'features_ads'), desc: lang === 'pt-BR' ? 'Experiência totalmente livre de interrupções.' : 'Fully uninterrupted experience.' },
    { icon: Shield, title: lang === 'pt-BR' ? 'Conteúdo exclusivo VIP' : 'Exclusive VIP content', desc: lang === 'pt-BR' ? 'Acesso antecipado a lançamentos.' : 'Early access to releases.' },
    { icon: Globe2, title: lang === 'pt-BR' ? 'Catálogo global' : 'Global catalog', desc: lang === 'pt-BR' ? 'Acesso a títulos de todas as regiões.' : 'Access titles from every region.' },
    { icon: Headphones, title: t(lang, 'features_support'), desc: lang === 'pt-BR' ? 'Atendimento prioritário 24h.' : 'Priority 24h support.' },
    { icon: Check, title: t(lang, 'features_profiles'), desc: lang === 'pt-BR' ? 'Compartilhe com a família.' : 'Share with your family.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar solid />
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#E50914]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7a020a]/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E50914]/40 bg-[#E50914]/10 text-[#E50914] text-sm font-semibold">
            <Crown className="w-4 h-4" /> {t(lang, 'plan_vip_badge')}
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t(lang, 'plan_vip')}
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {lang === 'pt-BR'
              ? 'A experiência Netflix definitiva. Cinemática, sem anúncios e em 4K HDR.'
              : 'The ultimate Netflix experience. Cinematic, ad-free and in 4K HDR.'}
          </p>
          <div className="mt-8 inline-flex items-baseline gap-2">
            <span className="text-6xl md:text-7xl font-black">{yearly}</span>
            <span className="text-white/60">/{t(lang, 'plan_per_year')}</span>
          </div>
          <p className="text-[#E50914] font-semibold mt-2">{lang === 'pt-BR' ? 'Equivalente a' : 'Equivalent to'} {monthly} / {lang === 'pt-BR' ? 'mês' : 'month'}</p>
          <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer"
             className="inline-block mt-8 px-10 py-4 rounded-lg bg-[#E50914] hover:bg-[#f6121d] text-white text-lg font-bold transition-colors shadow-[0_10px_40px_rgba(229,9,20,0.5)]">
            {t(lang, 'subscribe_now')}
          </a>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map(b => (
            <div key={b.title} className="p-7 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 hover:border-[#E50914]/40 transition-colors">
              <b.icon className="w-9 h-9 text-[#E50914]" />
              <h3 className="mt-4 text-xl font-bold">{b.title}</h3>
              <p className="text-white/60 mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto text-center rounded-3xl p-10 md:p-14 bg-gradient-to-br from-[#1a0509] to-black border border-[#E50914]/30">
          <Sparkles className="w-10 h-10 text-yellow-300 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-black mt-4">
            {lang === 'pt-BR' ? 'Comece hoje. Cancele quando quiser.' : 'Start today. Cancel anytime.'}
          </h2>
          <p className="text-white/70 mt-3">
            {lang === 'pt-BR' ? 'Menos de R$ 0,10 por dia para entreterimento ilimitado.' : 'Less than $0.02 a day for unlimited entertainment.'}
          </p>
          <a href={KIWIFY_LINK} target="_blank" rel="noopener noreferrer"
             className="inline-block mt-6 px-10 py-4 rounded-lg bg-[#E50914] hover:bg-[#f6121d] text-white font-bold transition-colors">
            {t(lang, 'subscribe_now')}
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
