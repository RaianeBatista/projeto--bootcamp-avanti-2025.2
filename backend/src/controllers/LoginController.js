import bcrypt from "bcryptjs";
import { prismaClient } from "../database/PrismaClient.js";
import jwt from "jsonwebtoken";

export class LoginController {
    async login(request, response) {
        const { email, password } = request.body;

        const user = await prismaClient.user.findUnique({
            where: { email },
        });

        if (!user) {
            return response.status(401).json({ error: "Não autorizado" });
        }

        const userValid = bcrypt.compareSync(password, user.password);

        if (!userValid) {
            return response.status(401).json({ error: "Não autorizado" });
        }

        const payload = { userId: user.id, isAdmin: user.isAdmin };
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: "4h",
        });

        return response.status(200).json({ ...payload, token });
    }
}
