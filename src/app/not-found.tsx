import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4 font-mono font-bold text-highlight/20">404</div>
        <h1 className="font-display text-2xl font-bold text-paper mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-highlight/50 mb-8 leading-relaxed">
          This privilege doesn&apos;t exist or has expired. Check the URL or
          head back to the dashboard.
        </p>
        <Link href="/dashboard" className="btn-primary text-sm !py-2.5 !px-8">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
