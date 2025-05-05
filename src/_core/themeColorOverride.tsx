'use client';

import { useEffect } from 'react';

export function ThemeColorOverride() {


  useEffect(() => {
    const html = document.documentElement;

    html.style.setProperty('--custom-purple-dark', "#8750f7");
    html.style.setProperty('--custom-purple-light', "#784BA0");
    html.style.setProperty('--custom-gradient-green', "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)");
    html.style.setProperty('--custom-gradient-orange', "linear-gradient(120deg, #f6d365 0%, #fda085 100%)");
    html.style.setProperty('--custom-gradient-red', "linear-gradient(to top, #ff0844 0%, #ffb199 100%)");


      html.style.setProperty('--mantine-color-body', '#ffffff');
      html.style.setProperty('--mantine-color-text', '#000');
      html.style.setProperty('--custom-background-light', '#f6f3fc');
      html.style.setProperty('--custom-hero-dev', 'linear-gradient(90deg, #8750f7 0, #2a1454)');
    document.body.classList.add('theme-loaded');
  }, []);

  return null;
}