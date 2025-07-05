import express, { request, response } from "express";
import pg from "pg";

const app = express();
app.use(express.json());

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "pgadmin",
    host: "localhost",
    port: 5432,
    databe: "avanti",
});

app.get("/usuarios", async (request, response) => {
    const usuarios = await pool.query("SELECT * FROM usuarios");
    return response.json(usuarios.rows).status(200);
});

app.post("/usuarios", async (request, response) => {
    const { nome, email, telefone } = request.body;
    const usuario = await pool.query("INSERT INTO usuarios", [
        nome,
        email,
        telefone,
    ]);
    return response.json(usuario).status(201);
});

app.put("/usuario/:id", (request, response) => {
    const { nome, email, telefone } = request.body;
    const { id } = request.params;

    return response.json().status(200);
});

app.delete("/usuario/:id", (request, response) => {
    const { id } = request.params;

    const index = usuarios.findIndex((u) => u.id == id);
    if (index == -1) {
        return response.json({ mesage: "Usuário não encontrado" }).status(404);
    }

    usuarios.splice(index, 1);

    return response
        .status(200)
        .json({ message: "Usuário deletado com sucesso" });
});

app.listen(8080, () => {
    console.log("Running on port 8080");
});
