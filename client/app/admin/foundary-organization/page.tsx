import FoundingOrganizationList from "@/components/admin/founding-organization-list"

export default function OrganizationsPage() {
  return (
    <div className="mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Founding Members</h1>
      <FoundingOrganizationList />
    </div>
  )
}