import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LiftProductPage from './pages/LiftProductPage';
import LightingProductPage from './pages/LightingProductPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactForm from './components/ContactForm';
import ROUTES from './assets/routes.json';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import Footer from './components/Footer';
import CornerButtons from './components/CornerButtons';

const App = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RecoilRoot>
      <HashRouter>
        <Header />
        <Routes>
          <Route exact path={ROUTES.product_lifts_page} element={<LiftProductPage />} />
          <Route exact path={ROUTES.product_lighting_page} element={<LightingProductPage />} />
          <Route exact path={ROUTES.privacy_policy_page} element={<PrivacyPolicyPage />} />
          <Route path={ROUTES.home_page} element={<HomePage />} />
          <Route path={'*'} element={<HomePage />} />
        </Routes>
        <ContactForm />
        <CornerButtons />
        <Footer />
      </HashRouter>
    </RecoilRoot>
  );
};

export default App;
