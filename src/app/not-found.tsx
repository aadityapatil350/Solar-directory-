import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-content mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-2 font-body">
              HTTP Error 404
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-ink">
              Page not found
            </h1>
            <p className="text-sm text-ink-2 font-body leading-relaxed">
              This solar company listing, guide, or tool may have moved or been updated under our canonical directory consolidation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 bg-sun text-ink font-semibold text-sm rounded-sm hover:brightness-95 transition-colors"
              >
                Go to homepage
              </Link>
              <Link
                href="/locations"
                className="w-full sm:w-auto inline-flex items-center justify-center h-11 px-6 border border-ink text-ink font-semibold text-sm rounded-sm hover:bg-wash transition-colors"
              >
                Browse cities
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
