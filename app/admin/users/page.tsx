import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UsersManagement } from "@/components/users-management";

export default function UsersPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:pt-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Gestión de Usuarios
          </h2>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="freelancers">Freelancers</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Todos los Usuarios</CardTitle>
                <CardDescription>
                  Gestiona todos los usuarios de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersManagement filter="all" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freelancers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Freelancers</CardTitle>
                <CardDescription>
                  Gestiona los freelancers registrados en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersManagement filter="freelancers" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>
                  Gestiona los clientes registrados en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UsersManagement filter="clients" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
