"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Eye, User, X } from "lucide-react"

interface ProposalsManagementProps {
  filter: "all" | "pending" | "accepted" | "rejected"
}

export function ProposalsManagement({ filter }: ProposalsManagementProps) {
  const [selectedProposal, setSelectedProposal] = useState<any>(null)

  // Mock data - would be fetched from API in a real application
  const proposals = [
    {
      id: "PROP001",
      projectId: "PRJ001",
      projectName: "Desarrollo de E-commerce",
      userId: "USR123",
      userName: "Carlos Rodríguez",
      userEmail: "carlos@example.com",
      status: "pending",
      paymentProposal: "$3,200",
      estimatedTime: "45 días",
      yearsExperience: 5,
      educationLevel: "Licenciatura en Informática",
      languages: ["Español", "Inglés"],
      certifications: ["AWS Certified Developer", "React Developer Certification"],
      portfolioUrl: "https://portfolio.carlos.com",
      githubUrl: "https://github.com/carlosdev",
      linkedinUrl: "https://linkedin.com/in/carlosdev",
    },
    {
      id: "PROP002",
      projectId: "PRJ002",
      projectName: "App Móvil de Delivery",
      userId: "USR456",
      userName: "Ana Martínez",
      userEmail: "ana@example.com",
      status: "accepted",
      paymentProposal: "$4,800",
      estimatedTime: "60 días",
      yearsExperience: 7,
      educationLevel: "Maestría en Desarrollo de Software",
      languages: ["Español", "Inglés", "Francés"],
      certifications: ["Google Mobile Developer", "iOS Developer"],
      portfolioUrl: "https://portfolio.ana.com",
      githubUrl: "https://github.com/anadev",
      linkedinUrl: "https://linkedin.com/in/anadev",
    },
    {
      id: "PROP003",
      projectId: "PRJ003",
      projectName: "Rediseño de Sitio Web",
      userId: "USR789",
      userName: "Miguel Sánchez",
      userEmail: "miguel@example.com",
      status: "rejected",
      paymentProposal: "$2,000",
      estimatedTime: "30 días",
      yearsExperience: 3,
      educationLevel: "Técnico en Diseño Web",
      languages: ["Español"],
      certifications: ["Adobe Certified Expert", "UI/UX Design Certificate"],
      portfolioUrl: "https://portfolio.miguel.com",
      githubUrl: "https://github.com/migueldesign",
      linkedinUrl: "https://linkedin.com/in/migueldesign",
    },
    {
      id: "PROP004",
      projectId: "PRJ004",
      projectName: "Sistema de Gestión Interna",
      userId: "USR321",
      userName: "Laura Gómez",
      userEmail: "laura@example.com",
      status: "pending",
      paymentProposal: "$7,500",
      estimatedTime: "90 días",
      yearsExperience: 8,
      educationLevel: "Doctorado en Ciencias de la Computación",
      languages: ["Español", "Inglés", "Alemán"],
      certifications: ["Microsoft Certified Solutions Developer", "Scrum Master"],
      portfolioUrl: "https://portfolio.laura.com",
      githubUrl: "https://github.com/lauradev",
      linkedinUrl: "https://linkedin.com/in/lauradev",
    },
    {
      id: "PROP005",
      projectId: "PRJ005",
      projectName: "Integración de API de Pagos",
      userId: "USR654",
      userName: "Javier López",
      userEmail: "javier@example.com",
      status: "pending",
      paymentProposal: "$1,700",
      estimatedTime: "20 días",
      yearsExperience: 4,
      educationLevel: "Licenciatura en Sistemas",
      languages: ["Español", "Inglés", "Portugués"],
      certifications: ["Payment Card Industry Professional", "API Security Specialist"],
      portfolioUrl: "https://portfolio.javier.com",
      githubUrl: "https://github.com/javierdev",
      linkedinUrl: "https://linkedin.com/in/javierdev",
    },
  ]

  const filteredProposals = filter === "all" ? proposals : proposals.filter((proposal) => proposal.status === filter)

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

  const handleAcceptProposal = (proposalId: string) => {
    // In a real application, this would send the acceptance to the API
    console.log(`Accepting proposal ${proposalId}`)
    // Close dialog
    setSelectedProposal(null)
  }

  const handleRejectProposal = (proposalId: string) => {
    // In a real application, this would send the rejection to the API
    console.log(`Rejecting proposal ${proposalId}`)
    // Close dialog
    setSelectedProposal(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Freelancer</TableHead>
            <TableHead>Propuesta</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{proposal.id}</TableCell>
              <TableCell>
                <div className="font-medium">{proposal.projectName}</div>
                <div className="text-sm text-muted-foreground">ID: {proposal.projectId}</div>
              </TableCell>
              <TableCell>{proposal.userName}</TableCell>
              <TableCell>
                <div>{proposal.paymentProposal}</div>
                <div className="text-sm text-muted-foreground">{proposal.estimatedTime}</div>
              </TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedProposal(proposal)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Detalles de la Propuesta</DialogTitle>
                        <DialogDescription>
                          {proposal.id} - {proposal.projectName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <User className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">{proposal.userName}</h3>
                            <p className="text-sm text-muted-foreground">{proposal.userEmail}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium">Propuesta Económica</h3>
                            <p>{proposal.paymentProposal}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Tiempo Estimado</h3>
                            <p>{proposal.estimatedTime}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium">Años de Experiencia</h3>
                            <p>{proposal.yearsExperience} años</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Nivel Educativo</h3>
                            <p>{proposal.educationLevel}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium">Idiomas</h3>
                          <div className="flex gap-2 mt-1">
                            {proposal.languages.map((language) => (
                              <Badge key={language} variant="outline">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium">Certificaciones</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {proposal.certifications.map((cert) => (
                              <Badge key={cert} variant="outline">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={proposal.portfolioUrl} target="_blank" rel="noopener noreferrer">
                              Portafolio
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={proposal.githubUrl} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={proposal.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              LinkedIn
                            </a>
                          </Button>
                        </div>
                      </div>

                      {proposal.status === "pending" && (
                        <DialogFooter>
                          <Button variant="outline" onClick={() => handleRejectProposal(proposal.id)}>
                            Rechazar
                          </Button>
                          <Button onClick={() => handleAcceptProposal(proposal.id)}>Aceptar</Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>

                  {proposal.status === "pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-500"
                        onClick={() => handleAcceptProposal(proposal.id)}
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Aceptar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleRejectProposal(proposal.id)}
                      >
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
    </>
  )
}
