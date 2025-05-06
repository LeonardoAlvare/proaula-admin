"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Eye, User, X } from "lucide-react";

interface ProposalsManagementProps {
  filter: "all" | "pending" | "accepted" | "rejected";
}

export function ProposalsManagement({ filter }: ProposalsManagementProps) {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);

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
      certifications: [
        "AWS Certified Developer",
        "React Developer Certification",
      ],
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
      certifications: [
        "Microsoft Certified Solutions Developer",
        "Scrum Master",
      ],
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
      certifications: [
        "Payment Card Industry Professional",
        "API Security Specialist",
      ],
      portfolioUrl: "https://portfolio.javier.com",
      githubUrl: "https://github.com/javierdev",
      linkedinUrl: "https://linkedin.com/in/javierdev",
    },
  ];

  const filteredProposals =
    filter === "all"
      ? proposals
      : proposals.filter((proposal) => proposal.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>;
      case "accepted":
        return <Badge className="bg-green-500">Aceptada</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rechazada</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAcceptProposal = (proposalId: string) => {
    console.log(`Accepting proposal ${proposalId}`);

    setSelectedProposal(null);
  };

  const handleRejectProposal = (proposalId: string) => {
    console.log(`Rejecting proposal ${proposalId}`);

    setSelectedProposal(null);
  };

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
            {/* <TableHead className="text-right">Acciones</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{proposal.id}</TableCell>
              <TableCell>
                <div className="font-medium">{proposal.projectName}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {proposal.projectId}
                </div>
              </TableCell>
              <TableCell>{proposal.userName}</TableCell>
              <TableCell>
                <div>{proposal.paymentProposal}</div>
                <div className="text-sm text-muted-foreground">
                  {proposal.estimatedTime}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
