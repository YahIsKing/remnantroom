import { notFound } from "next/navigation";
import { singles } from "@/data/singles";
import { Metadata } from "next";
import Nav from "@/components/Nav";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return singles.map((single) => ({
    slug: single.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const single = singles.find((s) => s.slug === slug);
  if (!single) return { title: "Not Found" };

  return {
    title: `${single.title} | Remnant Room`,
    description: `Listen to ${single.title} and read the lyrics`,
  };
}

export default async function SinglePage({ params }: PageProps) {
  const { slug } = await params;
  const single = singles.find((s) => s.slug === slug);

  if (!single) {
    notFound();
  }

  const formatLyrics = (lyrics: string) => {
    return lyrics.split("\n\n").map((section, sectionIndex) => {
      const lines = section.split("\n");
      const firstLine = lines[0];
      const isHeader = /^(Verse|Chorus|Bridge|Outro|Intro|Pre-Chorus|Hook)/i.test(firstLine);

      return (
        <div key={sectionIndex} className="mb-8">
          {isHeader ? (
            <>
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-3">
                {firstLine}
              </p>
              {lines.slice(1).map((line, lineIndex) => (
                <p key={lineIndex} className="text-xl md:text-2xl leading-relaxed text-white/90">
                  {line}
                </p>
              ))}
            </>
          ) : (
            lines.map((line, lineIndex) => (
              <p key={lineIndex} className="text-xl md:text-2xl leading-relaxed text-white/90">
                {line}
              </p>
            ))
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Nav />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Song Info */}
        <header className="mb-8">
          <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
            Single
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {single.title}
          </h1>
          <p className="text-zinc-400">
            Released {new Date(single.releaseDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        {/* YouTube Embed */}
        {single.streamingLinks.youtube && (
          <section className="mb-6">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900">
              <iframe
                src={`https://www.youtube.com/embed/${single.streamingLinks.youtube.split("v=")[1]?.split("&")[0]}`}
                title={single.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </section>
        )}

        {/* Streaming Links */}
        <div className="flex flex-wrap gap-3 mb-12">
          {single.streamingLinks.spotify && (
            <a
              href={single.streamingLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 hover:bg-[#1DB954] text-zinc-400 hover:text-black rounded-full transition-colors"
              aria-label="Listen on Spotify"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          )}
          {single.streamingLinks.amazonMusic && (
            <a
              href={single.streamingLinks.amazonMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-900 hover:bg-[#00A8E1] text-zinc-400 hover:text-white rounded-full transition-colors"
              aria-label="Listen on Amazon Music"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.078c-1.06-.879-1.247-1.287-1.829-2.126-1.747 1.784-2.984 2.318-5.248 2.318-2.68 0-4.764-1.653-4.764-4.963 0-2.585 1.403-4.346 3.398-5.207 1.73-.753 4.146-.887 5.994-1.095v-.41c0-.752.058-1.641-.384-2.291-.384-.575-1.117-.813-1.767-.813-1.2 0-2.269.616-2.531 1.893-.053.284-.261.565-.549.579l-3.074-.331c-.259-.058-.548-.266-.472-.662C5.771 1.756 8.765.5 11.468.5c1.384 0 3.194.365 4.285 1.404 1.384 1.296 1.252 3.026 1.252 4.907v4.447c0 1.337.555 1.921 1.077 2.644.183.26.223.574-.013.762-.59.491-1.64 1.402-2.217 1.912l-.008-.012-.708-.719zM21.131 20.245c-4.153 3.065-10.181 4.692-15.371 4.692-7.274 0-13.827-2.687-18.783-7.158-.389-.351-.042-.832.427-.56 5.349 3.115 11.973 4.991 18.811 4.991 4.612 0 9.686-.957 14.348-2.937.703-.303 1.293.461.568.972zM22.514 18.636c-.531-.678-3.508-.32-4.849-.162-.408.049-.47-.305-.103-.561 2.374-1.669 6.269-1.187 6.723-.628.455.562-.12 4.457-2.347 6.317-.343.286-.669.134-.517-.245.502-1.251 1.624-4.043 1.093-4.721z"/>
              </svg>
            </a>
          )}
        </div>

        {/* Lyrics */}
        <section className="border-t border-zinc-900 pt-12">
          <h2 className="text-zinc-500 text-sm uppercase tracking-widest mb-8">
            Lyrics
          </h2>
          <div className="font-serif">{formatLyrics(single.lyrics)}</div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-zinc-900">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Remnant Room. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
