"use client"

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
import { Eye, ExternalLink } from "lucide-react"
import { useState } from "react"

interface UsersManagementProps {
  filter: "all" | "freelancers" | "clients"
}

export function UsersManagement({ filter }: UsersManagementProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Mock data - would be fetched from API in a real application
  const users = [
    {
      id: "USR001",
      name: "Carlos Rodríguez",
      lastName: "Rodríguez",
      email: "carlos@example.com",
      isFreelancer: true,
      languages: ["Español", "Inglés"],
      yearsExperience: 5,
      educationLevel: "Licenciatura en Informática",
      certifications: ["AWS Certified Developer", "React Developer Certification"],
      workAvailability: "Full-time",
      category: "Web Development",
      socialMedia: {
        portfolio: "https://portfolio.carlos.com",
        github: "https://github.com/carlosdev",
        linkedin: "https://linkedin.com/in/carlosdev",
      },
      projectsCompleted: 12,
    },
    {
      id: "USR002",
      name: "Ana",
      lastName: "Martínez",
      email: "ana@example.com",
      isFreelancer: true,
      languages: ["Español", "Inglés", "Francés"],
      yearsExperience: 7,
      educationLevel: "Maestría en Desarrollo de Software",
      certifications: ["Google Mobile Developer", "iOS Developer"],
      workAvailability: "Part-time",
      category: "Mobile Development",
      socialMedia: {
        portfolio: "https://portfolio.ana.com",
        github: "https://github.com/anadev",
        linkedin: "https://linkedin.com/in/anadev",
      },
      projectsCompleted: 24,
    },
    {
      id: "USR003",
      name: "Miguel",
      lastName: "Sánchez",
      email: "miguel@example.com",
      isFreelancer: true,
      languages: ["Español"],
      yearsExperience: 3,
      educationLevel: "Técnico en Diseño Web",
      certifications: ["Adobe Certified Expert", "UI/UX Design Certificate"],
      workAvailability: "Full-time",
      category: "UI/UX Design",
      socialMedia: {
        portfolio: "https://portfolio.miguel.com",
        github: "https://github.com/migueldesign",
        linkedin: "https://linkedin.com/in/migueldesign",
      },
      projectsCompleted: 8,
    },
    {
      id: "USR004",
      name: "Tienda Online",
      lastName: "S.A.",
      email: "contacto@tiendaonline.com",
      isFreelancer: false,
      socialMedia: {
        website: "https://tiendaonline.com",
        linkedin: "https://linkedin.com/company/tiendaonline",
      },
      projectsPublished: 3,
    },
    {
      id: "USR005",
      name: "Delivery",
      lastName: "Express",
      email: "info@deliveryexpress.com",
      isFreelancer: false,
      socialMedia: {
        website: "https://deliveryexpress.com",
        linkedin: "https://linkedin.com/company/deliveryexpress",
      },
      projectsPublished: 2,
    },
  ]

  const filteredUsers =
    filter === "all"
      ? users
      : filter === "freelancers"
        ? users.filter((user) => user.isFreelancer)
        : users.filter((user) => !user.isFreelancer)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>
                {user.name} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isFreelancer ? (
                  <Badge className="bg-blue-500">Freelancer</Badge>
                ) : (
                  <Badge className="bg-green-500">Cliente</Badge>
                )}
              </TableCell>
              <TableCell>
                {user.isFreelancer ? (
                  user.category
                ) : (
                  <span className="text-muted-foreground">{user.projectsPublished} proyectos publicados</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver detalles</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Detalles del Usuario</DialogTitle>
                      <DialogDescription>
                        {user.id} - {user.name} {user.lastName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <h3 className="font-medium">Tipo</h3>
                          <p>{user.isFreelancer ? "Freelancer" : "Cliente"}</p>
                        </div>
                      </div>

                      {user.isFreelancer && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium">Años de Experiencia</h3>
                              <p>{user.yearsExperience} años</p>
                            </div>
                            <div>
                              <h3 className="font-medium">Nivel Educativo</h3>
                              <p>{user.educationLevel}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Idiomas</h3>
                            <div className="flex gap-2 mt-1">
                              {user.languages.map((language) => (
                                <Badge key={language} variant="outline">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Certificaciones</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {user.certifications.map((cert) => (
                                <Badge key={cert} variant="outline">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-medium">Disponibilidad</h3>
                              <p>{user.workAvailability}</p>
                            </div>
                            <div>
                              <h3 className="font-medium">Categoría</h3>
                              <p>{user.category}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-medium">Proyectos Completados</h3>
                            <p>{user.projectsCompleted}</p>
                          </div>
                        </>
                      )}

                      {!user.isFreelancer && (
                        <div>
                          <h3 className="font-medium">Proyectos Publicados</h3>
                          <p>{user.projectsPublished}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="font-medium">Enlaces</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Object.entries(user.socialMedia).map(([key, value]) => (
                            <Button key={key} variant="outline" size="sm" asChild>
                              <a href={value as string} target="_blank" rel="noopener noreferrer">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </a>
                            </Button>
                          ))}
                        </div>
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
  )
}
