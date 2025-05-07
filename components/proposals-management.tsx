"use client";

import { Check, Eye, User, X } from "lucide-react";
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
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProposalsManagementProps {
  filter: "all" | "pendiente" | "aceptado" | "rechazado";
}

type Proposal = {
  _id: string;
  status: string;
  userId: string;
  projectId: string;
  nameProject: string;
  userName: string;
  userEmail: string;
};

export function ProposalsManagement({ filter }: ProposalsManagementProps) {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    fetchProposals();

    return () => {
      setProposals([]);
    };
  }, []);

  const fetchProposals = async () => {
    const response = await fetch("http://localhost:3001/api/proposal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProposals(data);
  };

  const filteredProposals =
    filter === "all"
      ? proposals
      : proposals.filter((proposal) => proposal.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Badge className="bg-amber-500">Pendiente</Badge>;
      case "aceptado":
        return <Badge className="bg-green-500">Aceptada</Badge>;
      case "rechazado":
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal._id}>
              <TableCell className="font-medium">{proposal._id}</TableCell>
              <TableCell>
                <div className="font-medium">{proposal.nameProject}</div>
                <div className="text-sm text-muted-foreground">
                  ID: {proposal.projectId}
                </div>
              </TableCell>
              <TableCell>{proposal.userName}</TableCell>
              <TableCell>
                <div>{proposal.userName}</div>
                <div className="text-sm text-muted-foreground">
                  {proposal.userEmail}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(proposal.status)}</TableCell>
              <TableCell>
                <Dialog
                  open={selectedProposal?._id === proposal._id}
                  onOpenChange={(open) => {
                    if (!open) setSelectedProposal(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Detalles de la propuesta</DialogTitle>
                      <DialogDescription>
                        {proposal.nameProject} - {proposal.userName}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
