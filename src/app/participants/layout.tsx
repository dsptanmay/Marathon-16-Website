import Link from "next/link";

export default function ParticipantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <nav className="mb-6 flex space-x-4">
        <Link href="/participants/girls20" className="text-blue-500">
          Girls 20
        </Link>
        <Link href="/participants/boys20" className="text-blue-500">
          Boys 20
        </Link>
        <Link href="/participants/walkathon10" className="text-blue-500">
          Walkathon 10
        </Link>
        <Link href="/participants/allboys" className="text-blue-500">
          All boys Participant
        </Link>
        <Link href="/participants/allgirls" className="text-blue-500">
          All girls participant
        </Link>
        <Link href="/participants/allwalkathon" className="text-blue-500">
          All walkathon participant
        </Link>
      </nav>
      {children}
    </div>
  );
}
