import type { Member } from "./types"

export function filterMembers(members: Member[], searchTerm: string): Member[] {
  if (!searchTerm) return members
  const lowercasedTerm = searchTerm.toLowerCase()
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(lowercasedTerm) || member.designation.toLowerCase().includes(lowercasedTerm),
  )
}

