import React from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';

export default function Footer() {
  const { lang } = useApp();
  const links = [
    'footer_faq', 'footer_help', 'footer_account', 'footer_media', 'footer_relations',
    'footer_jobs', 'footer_redeem', 'footer_buy_gift', 'footer_ways', 'footer_terms',
    'footer_privacy', 'footer_cookies', 'footer_info', 'footer_contact', 'footer_speed',
    'footer_legal', 'footer_originals'
  ];
  return (
    <footer className="bg-black text-white/60 border-t border-zinc-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12 text-sm">
        <p className="mb-6">{t(lang, 'footer_questions')}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map(k => (
            <a key={k} href="#" className="hover:underline">{t(lang, k)}</a>
          ))}
        </div>
        <p className="mt-8 text-xs">© 1997-{new Date().getFullYear()} Netflix Clone (demo)</p>
      </div>
    </footer>
  );
}
