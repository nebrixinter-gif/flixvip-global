import React, { createContext, useContext, useEffect, useState } from 'react';
import { COUNTRY_MAP, SUPPORTED_LANGS } from '../i18n/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('nf_lang') || 'pt-BR');
  const [currency, setCurrency] = useState(() => localStorage.getItem('nf_currency') || 'BRL');
  const [country, setCountry] = useState(() => localStorage.getItem('nf_country') || 'BR');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nf_user') || 'null'); } catch { return null; }
  });
  const [detected, setDetected] = useState(false);

  // Auto-detect country/lang/currency by IP
  useEffect(() => {
    if (localStorage.getItem('nf_detected')) {
      setDetected(true);
      return;
    }
    (async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const code = data.country_code;
        if (code && COUNTRY_MAP[code]) {
          const m = COUNTRY_MAP[code];
          setCountry(code);
          setLang(m.lang);
          setCurrency(m.currency);
          localStorage.setItem('nf_country', code);
          localStorage.setItem('nf_lang', m.lang);
          localStorage.setItem('nf_currency', m.currency);
        } else {
          // Fallback to browser language
          const browserLang = (navigator.language || 'pt-BR');
          const match = SUPPORTED_LANGS.find(l => browserLang.toLowerCase().startsWith(l.toLowerCase().split('-')[0]));
          if (match) setLang(match);
        }
      } catch {
        // ignore
      } finally {
        localStorage.setItem('nf_detected', '1');
        setDetected(true);
      }
    })();
  }, []);

  const changeLang = (l) => { setLang(l); localStorage.setItem('nf_lang', l); };
  const changeCurrency = (c) => { setCurrency(c); localStorage.setItem('nf_currency', c); };

  const login = (email) => {
    const u = { email };
    setUser(u);
    localStorage.setItem('nf_user', JSON.stringify(u));
  };
  const logout = () => { setUser(null); localStorage.removeItem('nf_user'); };

  return (
    <AppContext.Provider value={{ lang, setLang: changeLang, currency, setCurrency: changeCurrency, country, user, login, logout, detected }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
