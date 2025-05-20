'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import JokeCard from './components/JokeCard';
import ExtraJokes from './components/ExtraJokes';

// Import ThemeToggle động để tránh lỗi hydration
const ThemeToggle = dynamic(() => import('./components/ThemeToggle'), {
  ssr: false,
});

// Danh sách thể loại joke
const CATEGORIES = [
  'Any',
  'Programming',
  'Misc',
  'Pun',
  'Spooky',
  'Christmas',
  'Dark',
];

// Lựa chọn lọc nội dung
const CONTENT_FILTERS = ['Clean', 'Edgy'];

export default function Home() {
  const [category, setCategory] = useState<string>('Any');
  const [contentFilter, setContentFilter] = useState<string>('Clean');
  const [key, setKey] = useState<number>(0); // Key để buộc render lại JokeCard
  const jokeCardRef = useRef<HTMLDivElement>(null);

  // Xử lý đọc to joke
  const handleReadAloud = () => {
    if (!window.speechSynthesis) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc giọng nói.');
      return;
    }

    // Tìm phần tử joke để đọc
    if (!jokeCardRef.current) return;
    
    const jokeElement = jokeCardRef.current.querySelector('p');
    if (!jokeElement) return;
    
    const text = jokeElement.textContent || '';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Jokes từ API đang là tiếng Anh
    
    // Xóa các utterance hiện tại
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Lấy joke mới
  const getNewJoke = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black/[.05] dark:bg-white/[.06] py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🤣 Mỗi ngày một câu đùa</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        {/* Random Jokes Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Random Jokes</h2>
          
          <div className="joke-card mb-8" ref={jokeCardRef}>
            <JokeCard 
              key={key} 
              category={category} 
              contentFilter={contentFilter} 
              onReadAloud={handleReadAloud} 
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={getNewJoke}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 px-4"
            >
              Joke Mới
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="category-select" className="text-sm">Thể loại:</label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border border-solid border-black/[.1] dark:border-white/[.2] rounded-md p-2 text-sm h-10"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="content-filter" className="text-sm">Nội dung:</label>
              <select
                id="content-filter"
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value)}
                className="bg-transparent border border-solid border-black/[.1] dark:border-white/[.2] rounded-md p-2 text-sm h-10"
              >
                {CONTENT_FILTERS.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleReadAloud}
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-4"
              aria-label="Đọc to"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              Đọc to
            </button>
          </div>
        </div>

        {/* Dad Jokes Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Dad Jokes</h2>
          <ExtraJokes />
        </div>
      </main>

      <footer className="py-4 px-6 text-center text-sm text-black/60 dark:text-white/60">
        <p>Powered by <a href="https://jokeapi.dev/" target="_blank" rel="noreferrer" className="underline">JokeAPI</a>, <a href="https://icanhazdadjoke.com/api" target="_blank" rel="noreferrer" className="underline">icanhazdadjoke</a> | Made with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}
