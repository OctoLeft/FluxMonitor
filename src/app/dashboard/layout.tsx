"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES } from '@/lib/translations';
import { useSettings } from '@/lib/SettingsContext';
import GlobalTerminal from '@/components/GlobalTerminal';
import { useTheme } from '@/lib/ThemeContext';
import SFSymbol, { type SFSymbolName } from '@/components/SFSymbol';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { config, loading: settingsLoading } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const mounted = !settingsLoading;

  const features = config?.features || {};
  const version = config?.version || '';
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsLangMenuOpen(false);
    setIsThemeMenuOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  if (!mounted) {
    return <div className="app-layout" style={{ opacity: 0 }}></div>;
  }

  return (
    <div className={`app-layout ${isMenuOpen ? 'menu-open' : ''}`}>
      {/* Mobile Top Header */}
      <header className="mobile-header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="logo-icon">
            <img src="/logo.png" alt="Flux Monitor" style={{ width: '24px', height: '24px', borderRadius: '5.4px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1 }}>{t.login.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.2em' }}>{t.login.logoText}</span>
              {version && <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)', opacity: 0.5 }}>v{version}</span>}
            </div>
          </div>
        </div>
        <button
          className="btn btn-ghost icon-only-btn mobile-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsLangMenuOpen(false);
            setIsThemeMenuOpen(false);
          }}
        >
          <SFSymbol name={isMenuOpen ? "xmark" : "line.3.horizontal"} size={20} />
        </button>
      </header>

      {/* Sidebar Navigation (Desktop) / Drawer (Mobile) */}
      <aside className={`app-sidebar glass-panel ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header flex-between desktop-only">
          <a 
            href="https://github.com/chentao1006/FluxMonitor" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sidebar-logo-link"
          >
            <div className="logo-icon">
              <img src="/logo.png" alt="Flux" style={{ width: '28px', height: '28px', borderRadius: '6.3px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, letterSpacing: '0.1em', lineHeight: 1 }}>{t.login.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '4px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.4em', textIndent: '0.2em' }}>{t.login.logoText}</span>
                {version && <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', opacity: 0.5 }}>v{version}</span>}
              </div>
            </div>
          </a>
        </div>

        <div className="app-sidebar-content">
          <nav className="nav-list no-scrollbar">
            {features?.monitor !== false && <NavLink href="/dashboard" icon="waveform.path.ecg" onClick={closeMenus}>{t.sidebar.monitor}</NavLink>}
            {features?.processes !== false && <NavLink href="/dashboard/processes" icon="square.stack.3d.up" onClick={closeMenus}>{t.sidebar.processes}</NavLink>}
            {features?.logs !== false && <NavLink href="/dashboard/logs" icon="doc.text" onClick={closeMenus}>{t.sidebar.logs}</NavLink>}
            {features?.configs !== false && <NavLink href="/dashboard/configs" icon="gearshape" onClick={closeMenus}>{t.sidebar.configs}</NavLink>}
            {features?.launchagent !== false && <NavLink href="/dashboard/launchagent" icon="paperplane" onClick={closeMenus}>{t.sidebar.launchagent}</NavLink>}
            {features?.docker !== false && <NavLink href="/dashboard/docker" icon="shippingbox" onClick={closeMenus}>{t.sidebar.docker}</NavLink>}
            {features?.nginx !== false && <NavLink href="/dashboard/nginx" icon="server.rack" onClick={closeMenus}>{t.sidebar.nginx}</NavLink>}
          </nav>

          <div className="sidebar-footer">
            <div className="footer-icons-row">
              <NavLink href="/dashboard/settings" icon="slider.horizontal.3" onClick={closeMenus} isIconOnly={true} title={t.sidebar.settings}>{t.sidebar.settings}</NavLink>
              <div style={{ position: 'relative' }}>
                <button
                  className="btn btn-ghost icon-only-btn"
                  onClick={() => {
                    setIsLangMenuOpen((prev) => !prev);
                    setIsThemeMenuOpen(false);
                  }}
                  title={t.common.toggleLanguage}
                >
                  <SFSymbol name="character.bubble" size={20} />
                </button>
                {isLangMenuOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="card glass-panel dropdown-menu">
                      <button
                        className={`btn btn-sm ${language === 'auto' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
                        onClick={() => { setLanguage('auto'); setIsLangMenuOpen(false); }}
                      >
                        {t.common.systemDefault}
                      </button>
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button
                          key={lang}
                          className={`btn btn-sm ${language === lang ? 'btn-primary' : 'btn-ghost'}`}
                          style={{ justifyContent: 'flex-start', fontSize: '0.75rem' }}
                          onClick={() => { setLanguage(lang); setIsLangMenuOpen(false); }}
                        >
                          {LANGUAGE_NAMES[lang]}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Theme Toggle */}
              <div style={{ position: 'relative' }}>
                <button
                  className="btn btn-ghost icon-only-btn"
                  onClick={() => {
                    setIsThemeMenuOpen((prev) => !prev);
                    setIsLangMenuOpen(false);
                  }}
                  title={t.settings.appearance}
                >
                  <SFSymbol name={theme === 'dark' ? "moon" : theme === 'light' ? "sun.max" : "sun.max.and.moon"} size={20} />
                </button>
                {isThemeMenuOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
                      onClick={() => setIsThemeMenuOpen(false)}
                    />
                    <div className="card glass-panel dropdown-menu">
                      <button
                        className={`btn btn-sm ${theme === 'auto' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ justifyContent: 'flex-start', fontSize: '0.75rem', gap: '0.5rem' }}
                        onClick={() => { setTheme('auto'); setIsThemeMenuOpen(false); }}
                      >
                        <SFSymbol name="sun.max.and.moon" size={14} /> {t.settings.systemDefault}
                      </button>
                      <button
                        className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ justifyContent: 'flex-start', fontSize: '0.75rem', gap: '0.5rem' }}
                        onClick={() => { setTheme('light'); setIsThemeMenuOpen(false); }}
                      >
                        <SFSymbol name="sun.max" size={14} /> {t.settings.light}
                      </button>
                      <button
                        className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ justifyContent: 'flex-start', fontSize: '0.75rem', gap: '0.5rem' }}
                        onClick={() => { setTheme('dark'); setIsThemeMenuOpen(false); }}
                      >
                        <SFSymbol name="moon" size={14} /> {t.settings.dark}
                      </button>
                    </div>
                  </>
                )}
              </div>


              <button
                className="btn btn-ghost icon-only-btn"
                title={t.sidebar.logout}
                onClick={async () => {
                  if (confirm(t.sidebar.logoutConfirm)) {
                    await fetch('/api/auth/logout', { method: 'POST' });
                    window.location.href = '/login';
                  }
                }}
              >
                <SFSymbol name="rectangle.portrait.and.arrow.right" size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenus}></div>}

      {/* Main Content Area */}
      <main className="app-main animate-fade-in">
        {children}
      </main>
      <GlobalTerminal />
    </div>
  );
}

function NavLink({
  href,
  children,
  icon,
  onClick,
  isIconOnly,
  title,
}: {
  href: string;
  children: React.ReactNode;
  icon: SFSymbolName;
  onClick?: () => void;
  isIconOnly?: boolean;
  title?: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === href || (href !== '/dashboard' && pathname?.startsWith(href));

  return (
    <Link href={href} style={{ textDecoration: 'none' }} onClick={onClick} title={title}>
      <div className={`btn nav-link-button ${isActive ? '' : 'btn-ghost'}`} style={{
        width: isIconOnly ? '42px' : '100%',
        height: isIconOnly ? '42px' : 'auto',
        justifyContent: isIconOnly ? 'center' : 'flex-start',
        padding: isIconOnly ? '0' : '0.85rem 1rem',
        borderRadius: 'var(--radius-sm)', gap: '0.75rem', fontWeight: 500,
        background: isActive ? 'var(--color-primary-light)' : '',
        color: isActive ? 'var(--color-primary)' : ''
      }}>
        <SFSymbol name={icon} size={20} strokeWidth={isActive ? 2.1 : 1.9} />
        {!isIconOnly && <span>{children}</span>}
      </div>
    </Link>
  )
}
