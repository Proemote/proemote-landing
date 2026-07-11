/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Header from './components/Header';
import HeroSections from './components/HeroSections';
import ServicesSections from './components/ServicesSections';
import SocialSections from './components/SocialSections';
import FaqSections from './components/FaqSections';
import FooterSections from './components/FooterSections';

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#05020a] font-sans transition-colors duration-300">
      <Header />
      
      <main>
        <HeroSections />
        <ServicesSections />
        <SocialSections />
        <FaqSections />
      </main>

      <FooterSections />
    </div>
  );
}
