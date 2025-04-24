import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalsManagement } from "@/components/proposals-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProposalsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-12">
        <div className="flex itemss-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Propuestas</h2>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="accepted">Aceptadas</TabsTrigger>
            <TabsTrigger value="rejected">Rechazadas</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Propuestas</CardTitle>
                <CardDescription>Gestiona todas las propuestas recibidas en la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsManagement filter="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Propuestas Pendientes</CardTitle>
                <CardDescription>Propuestas que aún no han sido revisadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsManagement filter="pending" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="accepted" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Propuestas Aceptadas</CardTitle>
                <CardDescription>Propuestas que han sido aprobadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsManagement filter="accepted" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rejected" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Propuestas Rechazadas</CardTitle>
                <CardDescription>Propuestas que han sido rechazadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ProposalsManagement filter="rejected" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
