import Link from 'next/link';

export default function Breadcrumbs({ current }: { current: string }) {
  return (
    <div className="breadcrumbs">
      <Link href="/">Home</Link> / {current}
    </div>
  );
}
