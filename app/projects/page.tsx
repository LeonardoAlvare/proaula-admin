import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectsManagement } from "@/components/projects-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Proyectos</h2>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="in_progress">En Realización</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="paid">Pagados</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Proyectos</CardTitle>
                <CardDescription>Gestiona todos los proyectos de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsManagement filter="all" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos Activos</CardTitle>
                <CardDescription>Proyectos disponibles para recibir propuestas</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsManagement filter="active" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="in_progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos En Realización</CardTitle>
                <CardDescription>Proyectos que están siendo desarrollados</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsManagement filter="in_progress" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos Completados</CardTitle>
                <CardDescription>Proyectos que han sido entregados</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsManagement filter="completed" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="paid" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos Pagados</CardTitle>
                <CardDescription>Proyectos que han sido pagados</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectsManagement filter="paid" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
