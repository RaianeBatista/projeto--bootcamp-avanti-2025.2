import { prismaClient } from "../database/PrismaClient.js";


export class UserController {
    async findAllUsers(request, response) {
        const usuarios = await prismaClient.user.findMany();
        return response.json(usuarios).status(200);
    }

    async saveUser(request, response) {
        const { name, email, phone } = request.body;

        const usuario = await prismaClient.user.create({
            data: {
                name,
                email,
                phone,
            },
        });
        return response.status(201).json(usuario);
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

        await prisma.user.delete({ where: { id } });

        return response.status(404).send();
    }
}
