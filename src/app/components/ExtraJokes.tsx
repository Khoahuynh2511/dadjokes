'use client';

import { useState, useEffect, useRef } from 'react';

type DadJoke = {
  id: string;
  joke: string;
  status: number;
};

export default function ExtraJokes() {
  const [dadJoke, setDadJoke] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const jokeRef = useRef<HTMLParagraphElement>(null);

  const fetchDadJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Không thể kết nối API Dad Jokes');
      }
      
      const data: DadJoke = await response.json();
      setDadJoke(data.joke);
      
    } catch (err) {
      console.error('Lỗi khi tải Dad Joke:', err);
      setError('Không thể tải Dad Joke. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDadJoke();
  }, []);

  const handleRefresh = () => {
    fetchDadJoke();
  };

  const handleReadAloud = () => {
    if (!window.speechSynthesis) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc giọng nói.');
      return;
    }

    const text = dadJoke;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Dad Jokes từ API đang là tiếng Anh
    
    // Xóa các utterance hiện tại
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="min-h-[150px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black/[.05] dark:bg-white/[.06] rounded-lg">
      <div className="mb-4">
        <p ref={jokeRef} className="text-lg italic">{dadJoke}</p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleRefresh}
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm h-10 px-4"
        >
          Dad Joke Mới
        </button>

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
  );
} 