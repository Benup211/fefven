import FederationsMemberCard from "@/components/federation-member"

export default function MemberOverview() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="md:text-3xl font-bold mb-6 text-xl">Members Overview</h1>
      <FederationsMemberCard />
    </main>
  )
}