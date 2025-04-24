import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PQRSManagement } from "@/components/pqrs-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PQRSPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión de PQRS</h2>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="in_review">En Revisión</TabsTrigger>
            <TabsTrigger value="resolved">Resueltos</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Solicitudes</CardTitle>
                <CardDescription>Gestiona todas las peticiones, quejas, reclamos y sugerencias</CardDescription>
              </CardHeader>
              <CardContent>
                <PQRSManagement filter="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes</CardTitle>
                <CardDescription>Solicitudes que aún no han sido revisadas</CardDescription>
              </CardHeader>
              <CardContent>
                <PQRSManagement filter="pending" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="in_review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes En Revisión</CardTitle>
                <CardDescription>Solicitudes que están siendo procesadas</CardDescription>
              </CardHeader>
              <CardContent>
                <PQRSManagement filter="in_review" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resolved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Resueltas</CardTitle>
                <CardDescription>Solicitudes que han sido completadas</CardDescription>
              </CardHeader>
              <CardContent>
                <PQRSManagement filter="resolved" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
