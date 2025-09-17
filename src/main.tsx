import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { QuiSuisJe } from '@/pages/QuiSuisJe';
import { ChampionDetail } from '@/pages/ChampionDetail';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="qui-suis-je" element={<QuiSuisJe />} />
            <Route path="champion/:championId" element={<ChampionDetail />} />
          </Route>
        </Routes>
      </HashRouter>
    </StrictMode>,
  );
}
