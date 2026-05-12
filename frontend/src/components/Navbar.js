import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Search, Bell, Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t, SUPPORTED_LANGS } from '../i18n/translations';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from './ui/dropdown-menu';

const LANG_LABEL = {
  'pt-BR': 'Português', 'en': 'English', 'es': 'Español', 'fr': 'Français', 'de': 'Deutsch', 'it': 'Italiano', 'ja': '日本語'
};

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bgClass = solid || scrolled
    ? 'bg-black'
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${bgClass}`}>
      <div className="flex items-center justify-between px-4 md:px-14 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-6 md:h-8 w-auto select-none"
              draggable={false}
            />
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-5 text-sm text-white/90">
              <Link to="/browse" className="hover:text-white/70 transition-colors">{lang === 'pt-BR' ? 'Início' : 'Home'}</Link>
              <Link to="/browse" className="hover:text-white/70 transition-colors">{lang === 'pt-BR' ? 'Séries' : 'TV Shows'}</Link>
              <Link to="/browse" className="hover:text-white/70 transition-colors">{lang === 'pt-BR' ? 'Filmes' : 'Movies'}</Link>
              <Link to="/plans" className="hover:text-white/70 transition-colors">{lang === 'pt-BR' ? 'Planos' : 'Plans'}</Link>
              <Link to="/premium" className="text-[#E50914] font-semibold hover:text-[#ff1a25] transition-colors">VIP</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {user && (
            <>
              <Search className="w-5 h-5 text-white hidden md:block" />
              <Bell className="w-5 h-5 text-white hidden md:block" />
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-white text-sm border border-white/40 px-2.5 py-1 rounded-sm hover:bg-white/10 transition-colors">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{LANG_LABEL[lang]}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/95 border-white/20 text-white">
              {SUPPORTED_LANGS.map(l => (
                <DropdownMenuItem key={l} onClick={() => setLang(l)} className="cursor-pointer hover:bg-white/10">
                  {LANG_LABEL[l]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-white/80 hover:text-white">
              {lang === 'pt-BR' ? 'Sair' : 'Sign Out'}
            </button>
          ) : (
            location.pathname !== '/login' && (
              <button
                onClick={() => navigate('/login')}
                className="bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-semibold px-4 py-1.5 rounded-sm transition-colors"
              >
                {t(lang, 'nav_signin')}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
