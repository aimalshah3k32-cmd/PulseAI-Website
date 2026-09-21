import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-black text-white mb-2">404 - Page Not Found</h2>
      <p className="text-sm text-slate-400 mb-6">The requested portal route could not be found.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
      >
        Return to Home
      </Link>
    </div>
  );
}


