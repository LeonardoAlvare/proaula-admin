"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UsersManagementProps {
  filter: "all" | "freelancers" | "clients";
}

export type User = {
  _id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  socialMedia: string[];
  isFreelancer: boolean;
};

export function UsersManagement({ filter }: UsersManagementProps) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsers(data);
  };

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
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user._id}</TableCell>
              <TableCell>
                {user.name} {user.lastname}
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
                <Dialog
                  open={selectedUser?._id === user._id}
                  onOpenChange={(open) => {
                    if (!open) setSelectedUser(null);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Detalles del Usuario</DialogTitle>
                      <DialogDescription>
                        Aquí puedes ver los detalles del usuario seleccionado.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">ID:</span>
                        <span>{user._id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Nombre:</span>
                        <span>{user.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Apellido:</span>
                        <span>{user.lastname}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Tipo:</span>
                        {user.isFreelancer ? (
                          <Badge className="bg-blue-500">Freelancer</Badge>
                        ) : (
                          <Badge className="bg-green-500">Cliente</Badge>
                        )}
                      </div>
                      {user.isFreelancer && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Especialidad:</span>
                          {user.socialMedia.map((social) => (
                            <a
                              key={social}
                              href={social}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink />
                            </a>
                          ))}
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
  );
}
