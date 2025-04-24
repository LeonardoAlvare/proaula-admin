"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"

export function PaymentHistory() {
  // Mock data - would be fetched from API in a real application
  const payments = [
    {
      id: "PAY001",
      projectName: "Desarrollo de E-commerce",
      clientName: "Tienda Online S.A.",
      freelancerName: "Carlos Rodríguez",
      totalAmount: "$3,500",
      platformFee: "$175",
      freelancerReceives: "$3,325",
      paymentDate: "2023-11-15",
      paymentMethod: "Transferencia",
      status: "completed",
    },
    {
      id: "PAY002",
      projectName: "App Móvil de Delivery",
      clientName: "Delivery Express",
      freelancerName: "Ana Martínez",
      totalAmount: "$5,000",
      platformFee: "$250",
      freelancerReceives: "$4,750",
      paymentDate: "2023-11-10",
      paymentMethod: "PayPal",
      status: "completed",
    },
    {
      id: "PAY003",
      projectName: "Rediseño de Sitio Web",
      clientName: "Corporación XYZ",
      freelancerName: "Miguel Sánchez",
      totalAmount: "$2,200",
      platformFee: "$110",
      freelancerReceives: "$2,090",
      paymentDate: "2023-11-05",
      paymentMethod: "Tarjeta de Crédito",
      status: "completed",
    },
    {
      id: "PAY004",
      projectName: "Sistema de Gestión Interna",
      clientName: "Industrias ABC",
      freelancerName: "Laura Gómez",
      totalAmount: "$7,800",
      platformFee: "$390",
      freelancerReceives: "$7,410",
      paymentDate: "2023-11-01",
      paymentMethod: "Transferencia",
      status: "pending",
    },
    {
      id: "PAY005",
      projectName: "Integración de API de Pagos",
      clientName: "Fintech Solutions",
      freelancerName: "Javier López",
      totalAmount: "$1,800",
      platformFee: "$90",
      freelancerReceives: "$1,710",
      paymentDate: "2023-10-28",
      paymentMethod: "PayPal",
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">Pendiente</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completado</Badge>
      case "failed":
        return <Badge className="bg-red-500">Fallido</Badge>
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
          <TableHead>Cliente</TableHead>
          <TableHead>Freelancer</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Comisión</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.projectName}</TableCell>
            <TableCell>{payment.clientName}</TableCell>
            <TableCell>{payment.freelancerName}</TableCell>
            <TableCell>{payment.totalAmount}</TableCell>
            <TableCell>{payment.platformFee}</TableCell>
            <TableCell>{getStatusBadge(payment.status)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalles</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Descargar comprobante</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
