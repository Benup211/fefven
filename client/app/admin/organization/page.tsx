import OrganizationList from "@/components/admin/organizaton-list"

export default function OrganizationsPage() {
  return (
    <div className="mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Institutional Members</h1>
      <OrganizationList />
    </div>
  )
}

