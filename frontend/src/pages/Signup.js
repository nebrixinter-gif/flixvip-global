import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

export default function Signup() {
  const { lang, login } = useApp();
  const [email, setEmail] = useState(sessionStorage.getItem('nf_signup_email') || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate('/plans');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar solid />
      <div className="flex-1 pt-24 pb-12 px-4 flex justify-center items-center">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#E50914] flex items-center justify-center">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-sm text-zinc-700 uppercase font-semibold tracking-wide">{lang === 'pt-BR' ? 'PASSO 1 DE 3' : 'STEP 1 OF 3'}</p>
          <h1 className="text-zinc-900 text-3xl font-bold mt-2">{t(lang, 'signup_title')}</h1>
          <p className="text-zinc-700 mt-3">{t(lang, 'signup_subtitle')}</p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4 text-left">
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t(lang, 'signup_email')}
              className="h-14 px-4 bg-white border border-zinc-400 text-zinc-900 rounded focus:outline-none focus:border-zinc-900"
            />
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder={t(lang, 'signup_password')}
              className="h-14 px-4 bg-white border border-zinc-400 text-zinc-900 rounded focus:outline-none focus:border-zinc-900"
            />
            <button type="submit" className="h-12 bg-[#E50914] hover:bg-[#f6121d] text-white font-semibold rounded transition-colors text-lg">
              {t(lang, 'signup_continue')}
            </button>
          </form>
        </div>
      </div>
      <div className="bg-zinc-100"><Footer /></div>
    </div>
  );
}
