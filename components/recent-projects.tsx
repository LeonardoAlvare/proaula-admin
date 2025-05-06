"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

interface RecentProjectsProps {
  showAll?: boolean;
}

export function RecentProjects({ showAll = false }: RecentProjectsProps) {
  const projects = [
    {
      id: "PRJ001",
      name: "Desarrollo de E-commerce",
      category: "Web Development",
      client: "Tienda Online S.A.",
      deliveryDate: "2023-12-15",
      status: "active",
      salary: "$3,500",
    },
    {
      id: "PRJ002",
      name: "App Móvil de Delivery",
      category: "Mobile Development",
      client: "Delivery Express",
      deliveryDate: "2023-11-30",
      status: "in_progress",
      salary: "$5,000",
    },
    {
      id: "PRJ003",
      name: "Rediseño de Sitio Web",
      category: "UI/UX Design",
      client: "Corporación XYZ",
      deliveryDate: "2023-12-05",
      status: "completed",
      salary: "$2,200",
    },
    {
      id: "PRJ004",
      name: "Sistema de Gestión Interna",
      category: "Software Development",
      client: "Industrias ABC",
      deliveryDate: "2024-01-20",
      status: "active",
      salary: "$7,800",
    },
    {
      id: "PRJ005",
      name: "Integración de API de Pagos",
      category: "Web Development",
      client: "Fintech Solutions",
      deliveryDate: "2023-12-10",
      status: "in_progress",
      salary: "$1,800",
    },
  ];

  const displayProjects = showAll ? projects : projects.slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Activo</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-500">En Realización</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>;
      case "paid":
        return <Badge className="bg-emerald-600">Pagado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Proyecto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Presupuesto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.id}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-muted-foreground">
                  {project.category}
                </div>
              </div>
            </TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>{getStatusBadge(project.status)}</TableCell>
            <TableCell>{project.salary}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
