import Image from "next/image";
import Link from "next/link";
import { singles } from "@/data/singles";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Nav />

      {/* Singles Grid */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <h2 className="text-2xl font-semibold text-zinc-300 mb-8">Latest Singles</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {singles.map((single) => (
            <Link
              key={single.slug}
              href={`/single/${single.slug}`}
              className="group block"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 mb-3">
                <Image
                  src={single.albumArt}
                  alt={`${single.title} album art`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <h3 className="font-medium text-white group-hover:text-zinc-300 transition-colors">
                {single.title}
              </h3>
              <p className="text-sm text-zinc-500">
                {new Date(single.releaseDate).getFullYear()}
              </p>
            </Link>
          ))}
        </div>
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
