import { create } from 'zustand';

const useLanguageStore = create((set) => ({
  language: localStorage.getItem('language') || 'RU', // Достаем язык из localStorage или устанавливаем значение по умолчанию
  setLanguage: (lang) => {
    localStorage.setItem('language', lang); // Сохраняем выбранный язык в localStorage
    set({ language: lang });
  },
}));

export default useLanguageStore;
