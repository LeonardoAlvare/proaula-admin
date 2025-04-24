"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"

interface ProjectsManagementProps {
  filter: "all" | "active" | "in_progress" | "completed" | "paid"
}

export function ProjectsManagement({ filter }: ProjectsManagementProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Mock data - would be fetched from API in a real application
  const projects = [
    {
      id: "PRJ001",
      name: "Desarrollo de E-commerce",
      userId: "USR123",
      clientName: "Tienda Online S.A.",
      description:
        "Desarrollo de una tienda en línea completa con carrito de compras, pasarela de pagos y panel de administración.",
      category: "Web Development",
      deliveryDate: "2023-12-15",
      duration: "45 días",
      salary: "$3,500",
      status: "active",
      proposals: 8,
    },
    {
      id: "PRJ002",
      name: "App Móvil de Delivery",
      userId: "USR456",
      clientName: "Delivery Express",
      description:
        "Aplicación móvil para servicio de entrega a domicilio con seguimiento en tiempo real y sistema de calificaciones.",
      category: "Mobile Development",
      deliveryDate: "2023-11-30",
      duration: "60 días",
      salary: "$5,000",
      status: "in_progress",
      proposals: 12,
      assignedTo: "Ana Martínez",
    },
    {
      id: "PRJ003",
      name: "Rediseño de Sitio Web",
      userId: "USR789",
      clientName: "Corporación XYZ",
      description:
        "Rediseño completo de sitio web corporativo con enfoque en experiencia de usuario y optimización para móviles.",
      category: "UI/UX Design",
      deliveryDate: "2023-12-05",
      duration: "30 días",
      salary: "$2,200",
      status: "completed",
      proposals: 6,
      assignedTo: "Miguel Sánchez",
    },
    {
      id: "PRJ004",
      name: "Sistema de Gestión Interna",
      userId: "USR321",
      clientName: "Industrias ABC",
      description: "Sistema para gestión de recursos humanos, inventario y finanzas con reportes personalizados.",
      category: "Software Development",
      deliveryDate: "2024-01-20",
      duration: "90 días",
      salary: "$7,800",
      status: "active",
      proposals: 4,
    },
    {
      id: "PRJ005",
      name: "Integración de API de Pagos",
      userId: "USR654",
      clientName: "Fintech Solutions",
      description:
        "Integración de múltiples pasarelas de pago en plataforma existente con sistema de conciliación automática.",
      category: "Web Development",
      deliveryDate: "2023-12-10",
      duration: "20 días",
      salary: "$1,800",
      status: "paid",
      proposals: 9,
      assignedTo: "Javier López",
    },
  ]

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Activo</Badge>
      case "in_progress":
        return <Badge className="bg-amber-500">En Realización</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>
      case "paid":
        return <Badge className="bg-emerald-600">Pagado</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

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
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>
                <div className="font-medium">{project.name}</div>
                <div className="text-sm text-muted-foreground">Entrega: {project.deliveryDate}</div>
              </TableCell>
              <TableCell>{project.clientName}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>{project.salary}</TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell>{project.proposals}</TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedProject(project)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Detalles del Proyecto</DialogTitle>
                      <DialogDescription>
                        {project.id} - {project.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Cliente</h3>
                          <p>{project.clientName}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Categoría</h3>
                          <p>{project.category}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Descripción</h3>
                        <p className="text-sm">{project.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h3 className="font-medium">Presupuesto</h3>
                          <p>{project.salary}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Duración</h3>
                          <p>{project.duration}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Fecha de Entrega</h3>
                          <p>{project.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Estado</h3>
                          <p>{getStatusBadge(project.status)}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Propuestas</h3>
                          <p>{project.proposals}</p>
                        </div>
                      </div>
                      {project.assignedTo && (
                        <div>
                          <h3 className="font-medium">Asignado a</h3>
                          <p>{project.assignedTo}</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
