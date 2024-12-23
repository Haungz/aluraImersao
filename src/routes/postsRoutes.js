import express from "express"
import cors from "cors"
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js"
import multer from "multer"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {                           // Define as rotas usando o objeto express "app"
	app.use(express.json())                         // Permite que o servidor interprete requisições com corpo no formato JSON
	app.use(cors(corsOptions))
    app.get("/posts", listarPosts)                  // Rota para buscar todos os posts
	app.post("/posts", postarNovoPost)              // Rota para criar um post
	app.post("/upload", upload.single("imagem"), uploadImagem)      // rota para upload de imagens
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes