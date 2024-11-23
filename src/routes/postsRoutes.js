import multer from "multer";

import express from "express";

import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200   
}

// Importando funções de outros módulos
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {

    // Permite que o servidor interprete requisições com corpo no formato JSON
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um post
    app.post("/posts", postarNovoPost);

    // Rota para fazer upload da imagem
    app.post("/upload", upload.single("imagem"), uploadImagem)

    // Rota para atualizar posts

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;