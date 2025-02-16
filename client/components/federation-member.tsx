"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Building2, UserRoundPen, UsersRound } from "lucide-react"
import { motion } from "framer-motion"
import useCountMemberStore from "@/state/admin/count-member-store"
import { useEffect } from "react"

interface CardData {
  title: string
  total: number
  link: string
  icon: React.ReactNode
  color: string
}

export default function FederationsMemberCard() {
  const {isLoading,error,cards,fetchDataCount}=useCountMemberStore();

  useEffect(()=>{
    fetchDataCount();
  },[fetchDataCount])

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>

  const cardData: CardData[] = [
    {
      title: "Federation Members",
      total: Number(cards.federation),
      link: "/admin/members/federation/",
      icon: <Building className="h-6 w-6" />,
      color: "bg-primary",
    },
    {
      title: "Province Members",
      total: Number(cards.province),
      link: "/admin/members/province",
      icon: <Building2 className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "District Members",
      total: Number(cards.district),
      link: "/admin/members/district",
      icon: <UsersRound className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Advisory Members",
      total: Number(cards.advisory),
      link: "/admin/members/advisory",
      icon: <UserRoundPen className="h-6 w-6" />,
      color: "bg-purple-500",
    },
  ]
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="flex flex-col justify-between h-full overflow-hidden group">
            <CardHeader className="relative pb-8">
              <div
                className={`absolute top-0 right-0 w-16 h-16 ${card.color} rounded-bl-full flex items-start justify-end p-3 transition-all duration-300 ease-in-out group-hover:w-20 group-hover:h-20`}
              >
                {card.icon}
              </div>
              <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{card.total.toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full group" variant="outline">
                <a href={card.link} className="flex items-center justify-center">
                  Go to {card.title.toLowerCase()}
                  <motion.span className="ml-2" initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    →
                  </motion.span>
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

