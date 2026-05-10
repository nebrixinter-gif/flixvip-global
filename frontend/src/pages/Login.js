import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { t } from '../i18n/translations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const { lang, login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/browse');
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <Navbar solid />
      <div className="relative z-10 pt-28 pb-20 px-4 flex justify-center">
        <div className="w-full max-w-md bg-black/75 p-8 md:p-14 rounded">
          <h1 className="text-white text-3xl font-bold mb-7">{t(lang, 'login_title')}</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t(lang, 'login_email')}
              className="h-14 px-4 bg-zinc-800 text-white rounded border-b-2 border-transparent focus:outline-none focus:border-[#E50914]"
            />
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder={t(lang, 'login_password')}
              className="h-14 px-4 bg-zinc-800 text-white rounded border-b-2 border-transparent focus:outline-none focus:border-[#E50914]"
            />
            <button type="submit" className="mt-4 h-12 bg-[#E50914] hover:bg-[#f6121d] text-white font-semibold rounded transition-colors">
              {t(lang, 'login_button')}
            </button>
            <div className="flex justify-between text-white/70 text-sm mt-2">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-white" /> {t(lang, 'login_remember')}</label>
              <a href="#" className="hover:underline">{t(lang, 'login_help')}</a>
            </div>
          </form>
          <p className="text-white/70 mt-12">
            {t(lang, 'login_new')} <button onClick={() => navigate('/signup')} className="text-white hover:underline">{t(lang, 'login_signup')}</button>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
