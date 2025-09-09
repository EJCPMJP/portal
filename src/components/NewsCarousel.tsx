'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Article = {
  title: string;
  subtitle?: string | null;
  image: string;
  slug: string;
};

export default function NewsCarousel({ articles }: { articles: Article[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % articles.length);
    }, 10000);
    return () => clearInterval(id);
  }, [articles.length]);

  const current = articles[index];
  if (!current) return null;

  return (
    <Link
      href={`/artigos/${current.slug}`}
      className="relative block h-64 sm:h-96 overflow-hidden rounded-xl"
    >
      <img
        src={current.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
          {current.title}
        </h1>
        {current.subtitle && (
          <p className="text-sm sm:text-lg">{current.subtitle}</p>
        )}
      </div>
    </Link>
  );
}

