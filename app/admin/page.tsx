import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCharts } from "@/components/dashboard-charts";
import { RecentProjects } from "@/components/recent-projects";
import { RecentProposals } from "@/components/recent-proposals";

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="proposals">Propuestas</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            {/* <DashboardCharts /> */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Proyectos Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentProjects />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Propuestas Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentProposals />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Proyectos</CardTitle>
                <CardDescription>
                  Lista completa de proyectos en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentProjects showAll />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="proposals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todas las Propuestas</CardTitle>
                <CardDescription>
                  Lista completa de propuestas en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentProposals showAll />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
