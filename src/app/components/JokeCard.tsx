'use client';

import { useState, useEffect } from 'react';

type JokeType = {
  joke?: string;
  setup?: string;
  delivery?: string;
  error?: boolean;
};

type JokeCardProps = {
  category: string;
  contentFilter: string;
};

export default function JokeCard({ category, contentFilter }: JokeCardProps) {
  const [joke, setJoke] = useState<JokeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      // Xây dựng URL API với bộ lọc nội dung
      let blacklistFlags = '';
      if (contentFilter === 'Clean') {
        blacklistFlags = 'nsfw,religious,political,racist,sexist,explicit';
      }
      
      const url = `https://v2.jokeapi.dev/joke/${category}?${blacklistFlags ? `blacklistFlags=${blacklistFlags}` : ''}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.error) {
        setJoke({ error: true });
      } else {
        setJoke(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải joke:', error);
      setJoke({ error: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [category, contentFilter, fetchJoke]);

  if (loading) {
    return (
      <div className="min-h-[150px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (joke?.error) {
    return (
      <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-500 dark:text-red-400">Không thể tải joke. Vui lòng thử lại!</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black/[.05] dark:bg-white/[.06] rounded-lg relative">
      {joke?.joke ? (
        <p className="text-lg">{joke.joke}</p>
      ) : joke?.setup && joke?.delivery ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">{joke.setup}</p>
          <p className="text-lg italic">{joke.delivery}</p>
        </div>
      ) : null}
    </div>
  );
} 