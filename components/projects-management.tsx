"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Eye } from "lucide-react";

interface ProjectsManagementProps {
  filter: "all" | "active" | "in_progress" | "completed" | "paid" | "inactive";
}

type Project = {
  _id: string;
  userId: string;
  name: string;
  techs: string[];
  description: string;
  dateInit: Date;
  dateEnd: Date;
  salary: number;
  status: string;
};

export function ProjectsManagement({ filter }: ProjectsManagementProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, []);

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:3001/api/project", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setProjects(data);
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.status === filter);

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
      case "inactive":
        return <Badge className="bg-red-500">Inactivo</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDuration = (dateInit: Date, dateEnd: Date) => {
    const start = new Date(dateInit);
    const end = new Date(dateEnd);

    const duration = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(duration / (1000 * 3600 * 24));
    return `${days} días`;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Propuestas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project._id}>
              <TableCell className="font-medium">{project._id}</TableCell>
              <TableCell>
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-muted-foreground">
                  Entrega: {new Date(project.dateEnd).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.salary}</TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell>
                {project.techs.map((tech, index) => (
                  <span key={index} className="mr-1">
                    <Badge variant="outline">{tech}</Badge>
                  </span>
                ))}
              </TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={selectedProject?._id === project._id}
                  onOpenChange={(open) => {
                    if (!open) setSelectedProject(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Detalles del Proyecto</DialogTitle>
                      <DialogDescription>
                        {project._id} - {project.name}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">ID:</span>
                        <span>{project._id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Nombre:</span>
                        <span>{project.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Descripción:</span>
                        <span>{project.description}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Tecnologías:</span>
                        {project.techs.map((tech, index) => (
                          <Badge key={index} variant="outline" className="mr-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Duración:</span>
                        <span>
                          {getDuration(project.dateInit, project.dateEnd)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Presupuesto:</span>
                        <span>${project.salary}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold">Estado:</span>
                        {getStatusBadge(project.status)}
                      </div>
                    </div>
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
