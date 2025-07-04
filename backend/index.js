import express, { request, response } from "express";

const app = express();
app.use(express.json());

const usuarios = [
    {id:1 ,nome: "Raiane", idade: 25},
    {id:2 ,nome: "Mariana", idade: 6},
    {id:3 ,nome: "Sara", idade: 4},
    {id:4 ,nome: "Isis", idade: 6},
]


app.get("/usuarios", (request, response) => {
return response.json(usuarios).status(200)
})

app.post("/usuarios", (request, response)=> {
    const { nome, idade } = request.body;
    usuarios.push({nome, idade})
    return response.json(usuarios).status(201)
})

app.put("/usuarios/:id", (request, response) => {
    const { nome, idade } = request.body;
    const { id } = request.params;

    const index = usuarios.findIndex(u => u.id == id)
    usuarios[index] = { id, nome, idade };
    
    return response.json(usuarios).status(200);
})










app.listen(8080, () => {
    console.log("Running on port 8080")
})