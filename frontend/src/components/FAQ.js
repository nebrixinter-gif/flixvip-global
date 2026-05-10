import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';
import { faqs } from '../mock/mock';

export default function FAQ() {
  const { lang } = useApp();
  const list = faqs[lang] || faqs.en;
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-black px-4 md:px-14 py-16 border-t-8 border-zinc-800">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-10">{t(lang, 'faq_title')}</h2>
        <div className="flex flex-col gap-2">
          {list.map((f, i) => (
            <div key={i} className="bg-zinc-800">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left p-5 hover:bg-zinc-700 transition-colors"
              >
                <span className="text-white text-lg md:text-2xl">{f.q}</span>
                {open === i ? <X className="w-7 h-7 text-white flex-shrink-0" /> : <Plus className="w-7 h-7 text-white flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="p-5 bg-zinc-800 border-t border-black">
                  <p className="text-white text-base md:text-xl whitespace-pre-line">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
