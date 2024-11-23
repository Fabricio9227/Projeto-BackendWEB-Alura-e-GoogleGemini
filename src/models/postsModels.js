import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("Imersao-Alura"); //a const "db" representa a minha conexão com o meu banco de dados 
    const colecao = db.collection("posts"); //aqui pegamos a coleção criada no Atlas MongoDB chamada de "posts"
    return colecao.find().toArray(); //
}

export async function criarPost(novoPost) {
    const db = conexao.db("Imersao-Alura"); //a const "db" representa a minha conexão com o meu banco de dados 
    const colecao = db.collection("posts"); //aqui pegamos a coleção criada no Atlas MongoDB chamada de "posts"
    
    // Insere um novo post a colecao no MongoDB
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersao-Alura"); //a const "db" representa a minha conexão com o meu banco de dados 
    const colecao = db.collection("posts"); //aqui pegamos a coleção criada no Atlas MongoDB chamada de "posts"
    const objID = ObjectId.createFromHexString(id);

    // Atualiza um post existente na colecao no MongoDB
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}