"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Eye, ExternalLink } from "lucide-react";
import { useState } from "react";

interface UsersManagementProps {
  filter: "all" | "freelancers" | "clients";
}

export function UsersManagement({ filter }: UsersManagementProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
      certifications: [
        "AWS Certified Developer",
        "React Developer Certification",
      ],
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
  ];

  const filteredUsers =
    filter === "all"
      ? users
      : filter === "freelancers"
      ? users.filter((user) => user.isFreelancer)
      : users.filter((user) => !user.isFreelancer);

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
                  <span className="text-muted-foreground">
                    {user.projectsPublished} proyectos publicados
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
