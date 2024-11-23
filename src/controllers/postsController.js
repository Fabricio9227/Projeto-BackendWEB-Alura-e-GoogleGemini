// Importando funções do módulo do "postsModels.js"
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função que será exportada para o módulo de "postsRoutes.js"
export async function listarPosts (req, res) 
{
    const posts = await getTodosPosts();
    res.status(200).json(posts); //Indica que o status que retornará vai ser "200", ou seja, vai retornar um "OK" dizendo que está tudo certo. Já o "json" irá pegar tudo que estiver na coleção de "posts" lá no banco de dados do MongoDB e irá converter tudo para um formato que o JS possa trabalhar. 
}


// Função que será exportada para o módulo de "postsRoutes.js"
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

// Função que será exportada para o módulo de "postsRoutes.js"
export async function uploadImagem(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`
        fs.renameSync(req.file.path, imagemAtualizada)
        
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpg`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, post);       
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
}