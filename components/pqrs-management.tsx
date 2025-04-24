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
import { Textarea } from "@/components/ui/textarea"
import { Eye, MessageSquare } from "lucide-react"

interface PQRSManagementProps {
  filter: "all" | "pending" | "in_review" | "resolved"
}

export function PQRSManagement({ filter }: PQRSManagementProps) {
  const [selectedPQRS, setSelectedPQRS] = useState<any>(null)
  const [responseText, setResponseText] = useState("")

  // Mock data - would be fetched from API in a real application
  const pqrsData = [
    {
      id: "PQRS001",
      userId: "USR123",
      userName: "Juan Pérez",
      type: "complaint",
      subject: "Problema con pago de proyecto",
      message:
        "El pago por mi proyecto completado aún no ha sido liberado a pesar de que el cliente confirmó la entrega hace más de 5 días.",
      status: "pending",
      dateSubmitted: "2023-11-15",
      adminResponse: "",
      dateResolved: "",
    },
    {
      id: "PQRS002",
      userId: "USR456",
      userName: "María López",
      type: "suggestion",
      subject: "Mejora en el sistema de propuestas",
      message: "Sería útil poder editar las propuestas enviadas durante las primeras 24 horas después de enviarlas.",
      status: "in_review",
      dateSubmitted: "2023-11-10",
      adminResponse: "Estamos evaluando esta sugerencia con nuestro equipo de desarrollo.",
      dateResolved: "",
    },
    {
      id: "PQRS003",
      userId: "USR789",
      userName: "Carlos Rodríguez",
      type: "claim",
      subject: "Cliente no responde",
      message:
        "He intentado contactar al cliente para aclarar los requisitos del proyecto pero no he recibido respuesta en una semana.",
      status: "resolved",
      dateSubmitted: "2023-11-05",
      adminResponse:
        "Hemos contactado al cliente y nos ha confirmado que responderá a sus mensajes en las próximas 24 horas.",
      dateResolved: "2023-11-08",
    },
    {
      id: "PQRS004",
      userId: "USR321",
      userName: "Ana Martínez",
      type: "request",
      subject: "Solicitud de extensión de plazo",
      message:
        "Necesito solicitar una extensión de 5 días para mi proyecto actual debido a problemas técnicos inesperados.",
      status: "pending",
      dateSubmitted: "2023-11-12",
      adminResponse: "",
      dateResolved: "",
    },
    {
      id: "PQRS005",
      userId: "USR654",
      userName: "Pedro Gómez",
      type: "complaint",
      subject: "Freelancer abandonó el proyecto",
      message: "El freelancer asignado a mi proyecto no ha mostrado avances en 2 semanas y no responde a mis mensajes.",
      status: "in_review",
      dateSubmitted: "2023-11-08",
      adminResponse: "Estamos investigando la situación y contactando al freelancer.",
      dateResolved: "",
    },
  ]

  const filteredData = filter === "all" ? pqrsData : pqrsData.filter((item) => item.status === filter)

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "complaint":
        return <Badge className="bg-red-500">Queja</Badge>
      case "suggestion":
        return <Badge className="bg-blue-500">Sugerencia</Badge>
      case "claim":
        return <Badge className="bg-amber-500">Reclamo</Badge>
      case "request":
        return <Badge className="bg-emerald-500">Petición</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>
      case "in_review":
        return <Badge className="bg-blue-500">En Revisión</Badge>
      case "resolved":
        return <Badge className="bg-green-500">Resuelto</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleSubmitResponse = () => {
    // In a real application, this would send the response to the API
    console.log(`Sending response to PQRS ${selectedPQRS.id}: ${responseText}`)
    // Close dialog and reset form
    setSelectedPQRS(null)
    setResponseText("")
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Asunto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((pqrs) => (
            <TableRow key={pqrs.id}>
              <TableCell className="font-medium">{pqrs.id}</TableCell>
              <TableCell>{pqrs.userName}</TableCell>
              <TableCell>{getTypeBadge(pqrs.type)}</TableCell>
              <TableCell>{pqrs.subject}</TableCell>
              <TableCell>{pqrs.dateSubmitted}</TableCell>
              <TableCell>{getStatusBadge(pqrs.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedPQRS(pqrs)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver detalles</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Detalles de la Solicitud</DialogTitle>
                        <DialogDescription>
                          {pqrs.id} - {pqrs.subject}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-medium">Usuario</h3>
                          <p>
                            {pqrs.userName} ({pqrs.userId})
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium">Tipo</h3>
                          <p>{getTypeBadge(pqrs.type)}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Mensaje</h3>
                          <p className="text-sm">{pqrs.message}</p>
                        </div>
                        {pqrs.adminResponse && (
                          <div>
                            <h3 className="font-medium">Respuesta</h3>
                            <p className="text-sm">{pqrs.adminResponse}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {pqrs.status !== "resolved" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPQRS(pqrs)}>
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Responder</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Responder Solicitud</DialogTitle>
                          <DialogDescription>
                            {pqrs.id} - {pqrs.subject}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <h3 className="font-medium">Mensaje Original</h3>
                            <p className="text-sm">{pqrs.message}</p>
                          </div>
                          <div className="grid gap-2">
                            <h3 className="font-medium">Tu Respuesta</h3>
                            <Textarea
                              placeholder="Escribe tu respuesta aquí..."
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              rows={5}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleSubmitResponse}>
                            Enviar Respuesta
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
