import jwt from "jsonwebtoken";

export default function (request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ error: "Não autorizado" });
    }

    try {
        const token = authorization.replace("Bearer ", "");
        const { isAdmin } = jwt.decode(token, process.env.SECRET_JWT);

        if (!isAdmin) {
            return response.status(403).json({ error: "Não autorizado" });
        }

        next();
    } catch (error) {
        return response.status(401).json({ error: "Não autorizado" });
    }
}
