"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Eye, X } from "lucide-react"

interface RecentProposalsProps {
  showAll?: boolean
}

export function RecentProposals({ showAll = false }: RecentProposalsProps) {
  // Mock data - would be fetched from API in a real application
  const proposals = [
    {
      id: "PROP001",
      projectName: "Desarrollo de E-commerce",
      freelancerName: "Carlos Rodríguez",
      status: "pending",
      paymentProposal: "$3,200",
      estimatedTime: "45 días",
    },
    {
      id: "PROP002",
      projectName: "App Móvil de Delivery",
      freelancerName: "Ana Martínez",
      status: "accepted",
      paymentProposal: "$4,800",
      estimatedTime: "60 días",
    },
    {
      id: "PROP003",
      projectName: "Rediseño de Sitio Web",
      freelancerName: "Miguel Sánchez",
      status: "rejected",
      paymentProposal: "$2,000",
      estimatedTime: "30 días",
    },
    {
      id: "PROP004",
      projectName: "Sistema de Gestión Interna",
      freelancerName: "Laura Gómez",
      status: "pending",
      paymentProposal: "$7,500",
      estimatedTime: "90 días",
    },
    {
      id: "PROP005",
      projectName: "Integración de API de Pagos",
      freelancerName: "Javier López",
      status: "pending",
      paymentProposal: "$1,700",
      estimatedTime: "20 días",
    },
  ]

  const displayProposals = showAll ? proposals : proposals.slice(0, 4)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>
      case "accepted":
        return <Badge className="bg-green-500">Aceptada</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rechazada</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Proyecto</TableHead>
          <TableHead>Freelancer</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayProposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell className="font-medium">{proposal.id}</TableCell>
            <TableCell>
              <div className="font-medium">{proposal.projectName}</div>
              <div className="text-sm text-muted-foreground">
                {proposal.paymentProposal} - {proposal.estimatedTime}
              </div>
            </TableCell>
            <TableCell>{proposal.freelancerName}</TableCell>
            <TableCell>{getStatusBadge(proposal.status)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalles</span>
                </Button>
                {proposal.status === "pending" && (
                  <>
                    <Button variant="ghost" size="icon" className="text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Aceptar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Rechazar</span>
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
