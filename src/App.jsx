import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
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
          <Route path={ROUTES.home_page} element={<HomePage />} />
          <Route path={ROUTES.product_page} element={<ProductPage />} />
          <Route path={ROUTES.privacy_policy_page} element={<PrivacyPolicyPage />} />
        </Routes>
        <ContactForm />
        <CornerButtons />
        <Footer />
      </HashRouter>
    </RecoilRoot>
  );
};

export default App;
