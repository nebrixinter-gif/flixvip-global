import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';
import { Tv, Download, Smartphone, Baby } from 'lucide-react';

function ReasonCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-xl p-6 md:p-8 bg-gradient-to-br from-[#19191e] to-[#0c0612] border border-white/5">
      <div className="flex items-start justify-between">
        <h3 className="text-white text-xl md:text-2xl font-bold leading-snug pr-3">{title}</h3>
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#E50914] flex-shrink-0" />
      </div>
      <p className="text-white/70 mt-3 text-base md:text-lg">{desc}</p>
    </div>
  );
}

export default function Landing() {
  const { lang } = useApp();
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <div className="h-2 bg-zinc-800" />

      <section className="px-4 md:px-14 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-8">{t(lang, 'section_reasons')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ReasonCard icon={Tv} title={t(lang, 'reason1_title')} desc={t(lang, 'reason1_desc')} />
            <ReasonCard icon={Download} title={t(lang, 'reason2_title')} desc={t(lang, 'reason2_desc')} />
            <ReasonCard icon={Smartphone} title={t(lang, 'reason3_title')} desc={t(lang, 'reason3_desc')} />
            <ReasonCard icon={Baby} title={t(lang, 'reason4_title')} desc={t(lang, 'reason4_desc')} />
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
