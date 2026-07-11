import React from 'react';
import { getTranslator } from '../lib/i18n';

interface FooterProps {
  lang?: 'es' | 'en';
}

const Footer = ({ lang = 'es' }: FooterProps) => {
  const t = getTranslator(lang);

  return (
    <footer className="bg-white dark:bg-black p-4">
      <div className="flex flex-row flex-wrap justify-center gap-x-[2rem] gap-y-[2rem]">
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey"
        >
          {t('footer.githubrepository')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey/issues"
        >
          {t('footer.issues')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href="https://github.com/marcelo-earth/platkey#-contributing"
        >
          {t('footer.contributions')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href={lang === 'en' ? '/en/#faq' : '/#faq'}
        >
          {t('footer.faq')}
        </a>
        <a
          className="text-emerald-700 dark:text-green hover:underline"
          href={lang === 'en' ? '/en/privacy/' : '/privacy/'}
        >
          {t('footer.privacy')}
        </a>
      </div>
      <div className="flex flex-row p-4 justify-center">
        <p className="text-blue dark:text-white text-center max-w-[42rem]">
          {t('footer.disclaimer')}
        </p>
      </div>
      <div className="flex flex-row justify-center">
        <p className="text-emerald-700 dark:text-green text-sm text-center">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
