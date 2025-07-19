import { prismaClient } from "../database/PrismaClient.js";
import bcrypt from "bcryptjs";

export class UserController {
    async findAllUsers(request, response) {
        const usuarios = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                phone: true,
                birthDate: true,
                address: true,
                avatarUrl: true,
            },
        });
        return response.json(usuarios).status(200);
    }

    async findUser(request, response) {
        try {
            const { id } = request.params;

            const usuario = await prismaClient.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    phone: true,
                    birthDate: true,
                    address: true,
                    avatarUrl: true,
                    createdAt: true,
                },
            });

            if (!usuario) {
                return response
                    .status(404)
                    .json({ error: "Usuário não encontrado" });
            }

            return response.status(200).json(usuario);
        } catch (error) {
            return response.status(500).json({
                error: "Erro interno do servidor",
                details: error.message,
            });
        }
    }

    async saveUser(request, response) {
        try {
            const {
                name,
                email,
                password,
                isAdmin,
                phone,
                birthDate,
                address,
                avatarUrl,
            } = request.body;

            // Validação básica
            if (
                !name ||
                !email ||
                !password ||
                !phone ||
                !birthDate ||
                !address
            ) {
                return response.status(400).json({
                    error: "Campos obrigatórios: name, email, password, phone, birthDate, address",
                });
            }

            const passHash = bcrypt.hashSync(password, 10);

            const usuario = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password: passHash,
                    isAdmin: isAdmin || false,
                    phone,
                    birthDate: new Date(birthDate),
                    address,
                    avatarUrl,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    phone: true,
                    birthDate: true,
                    address: true,
                    avatarUrl: true,
                },
            });
            return response.status(201).json(usuario);
        } catch (error) {
            if (error.code === "P2002") {
                return response
                    .status(400)
                    .json({ error: "Email já está em uso" });
            }
            return response.status(500).json({
                error: "Erro interno do servidor",
                details: error.message,
            });
        }
    }

    async updateUser(request, response) {
        const { name, email, phone } = request.body;
        const { id } = request.params;

        const user = await prismaClient.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return response.status(404).json("Usuário não encontrado");
        }

        const usuario = await prismaClient.user.update({
            where: { id },
            data: {
                name,
                email,
                phone,
            },
        });
        return response.status(200).json(usuario);
    }

    async deleteUser(request, response) {
        const { id } = request.params;

        const user = await prismaClient.user.findUnique({
            where: { id },
        });

        if (!user) {
            return response.status(404).json("Usuário não encontrado");
        }

        await prismaClient.user.delete({ where: { id } });

        return response.status(204).send();
    }
}
