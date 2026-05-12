import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { t, formatPrice } from '../i18n/translations';
import { Crown, Check, Sparkles, Zap } from 'lucide-react';
import { KIWIFY_LINK } from '../mock/mock';

function Sparkle({ delay = 0, top, left }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
      style={{ top, left, animationDelay: `${delay}s`, boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)' }}
    />
  );
}

export default function Plans() {
  const { lang, currency } = useApp();
  const navigate = useNavigate();

  const yearly = formatPrice(50, currency, lang);
  const monthly = formatPrice(4.15, currency, lang);
  const daily = formatPrice(0.10, currency, lang);

  const features = [
    t(lang, 'features_4k'),
    t(lang, 'features_devices'),
    t(lang, 'features_downloads'),
    t(lang, 'features_profiles'),
    t(lang, 'features_ads'),
    t(lang, 'features_support'),
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar solid />
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-white/60">{lang === 'pt-BR' ? 'PASSO 2 DE 3' : lang === 'es' ? 'PASO 2 DE 3' : lang === 'fr' ? 'ÉTAPE 2 SUR 3' : lang === 'de' ? 'SCHRITT 2 VON 3' : lang === 'it' ? 'PASSO 2 DI 3' : lang === 'ja' ? 'ステップ 2 / 3' : 'STEP 2 OF 3'}</p>
          <h1 className="text-4xl md:text-6xl font-black mt-3" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t(lang, 'plans_title')}
          </h1>
          <p className="text-white/70 mt-3 text-lg">{t(lang, 'plans_subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto mt-12 relative">
          {/* Sparkles */}
          <Sparkle top="10%" left="5%" />
          <Sparkle top="20%" left="95%" delay={0.5} />
          <Sparkle top="80%" left="10%" delay={1} />
          <Sparkle top="70%" left="90%" delay={1.5} />

          <div className="relative rounded-3xl overflow-hidden border border-[#E50914]/40 shadow-[0_0_60px_rgba(229,9,20,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0509] via-[#0c0205] to-black" />
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#E50914]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#E50914]/10 rounded-full blur-3xl" />

            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E50914] to-[#7a020a] flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl md:text-3xl font-black tracking-wide">{t(lang, 'plan_vip')}</h2>
                      <Sparkles className="w-5 h-5 text-yellow-300" />
                    </div>
                    <p className="text-[#E50914] text-sm font-semibold">{t(lang, 'plan_vip_badge')}</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-yellow-300 text-black text-xs font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  {t(lang, 'plan_vip_save')}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-white/60 text-xs uppercase tracking-wider">{t(lang, 'plan_per_year')}</p>
                  <p className="text-3xl md:text-4xl font-black text-white mt-1">{yearly}</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-white/60 text-xs uppercase tracking-wider">{lang === 'pt-BR' ? 'POR MÊS' : lang === 'es' ? 'POR MES' : lang === 'fr' ? 'PAR MOIS' : lang === 'de' ? 'PRO MONAT' : lang === 'it' ? 'AL MESE' : lang === 'ja' ? '月額' : 'PER MONTH'}</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#E50914] mt-1">{monthly}</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-white/60 text-xs uppercase tracking-wider">{lang === 'pt-BR' ? 'POR DIA' : lang === 'es' ? 'POR DÍA' : lang === 'fr' ? 'PAR JOUR' : lang === 'de' ? 'PRO TAG' : lang === 'it' ? 'AL GIORNO' : lang === 'ja' ? '1日あたり' : 'PER DAY'}</p>
                  <p className="text-2xl md:text-3xl font-bold text-yellow-300 mt-1">{daily}</p>
                </div>
              </div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/90">
                    <span className="w-6 h-6 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://pay.kiwify.com.br/8FZZ0hi"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 block w-full text-center py-5 rounded-xl bg-[#E50914] hover:bg-[#f6121d] text-white text-xl font-black tracking-wide transition-colors shadow-[0_10px_40px_rgba(229,9,20,0.5)]"
              >
                {t(lang, 'subscribe_now')}
              </a>
              <p className="text-center text-white/40 text-xs mt-3">
                {lang === 'pt-BR' ? 'Pagamento seguro • Cancele quando quiser' : 'Secure payment • Cancel anytime'}
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={() => navigate('/premium')} className="text-white/60 hover:text-white text-sm underline">
              {lang === 'pt-BR' ? 'Saiba mais sobre os benefícios VIP' : 'Learn more about VIP benefits'} →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
