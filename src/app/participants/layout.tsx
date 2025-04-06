import Link from "next/link";

export default function ParticipantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-white min-h-screen">
      <nav className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/participants/girls20"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          Girls 20
        </Link>
        <Link
          href="/participants/boys20"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          Boys 20
        </Link>
        <Link
          href="/participants/walkathon10"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          Walkathon 10
        </Link>
        <Link
          href="/participants/allboys"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          All Boys
        </Link>
        <Link
          href="/participants/allgirls"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          All Girls
        </Link>
        <Link
          href="/participants/allwalkathon"
          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        >
          All Walkathon
        </Link>
      </nav>
      {children}
    </div>
  );
}
