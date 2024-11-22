import {getTodosPosts, criarPost} from "../models/postModel.js"
import fs from "fs"

export async function listarPosts(req,res) {              // Rota para buscar todos os posts                 //await precisa do async
	const posts = await getTodosPosts()                  // chama a função para buscar todos os posts
	res.status(200).json(posts)                         // Envia uma resposta http com status 200 (ok) e os posts no formato JSON na porta 2000
export async function listarPosts(req,res) {              // Rota para buscar todos os posts                 //await precisa do async
	const posts = await getTodosPosts()                  // chama a função para buscar todos os posts
	res.status(200).json(posts)                         // Envia uma resposta http com status 200 (ok) e os posts no formato JSON na porta 2000
} 
	
export async function postarNovoPost(req,res) {
	const novoPost = req.body
	try {                                                             //o comando se resume a: tenta criar um novo post, 
		const postCriado = await criarPost(novoPost)             
		res.status(200).json(postCriado)
	} catch(erro) {                                                   // se falhar, aparece erro em vez de crashar o servidor
		console.error(erro.message)
			res.status(500).json({"Erro": "Falha na requisição"})
		
	}
}

export async function uploadImagem(req,res) {
	const novoPost = {
		descricao: "", 
		imgUrl: req.file.originalname,
		alt: ""
	}
	try {                                                             //o comando se resume a: tenta criar um novo post, 
		const postCriado = await criarPost(novoPost)    
		const imgAtualizada = `uploads/${postCriado.insertedId}.png`
		fs.renameSync(req.file.path, imgAtualizada)         
		res.status(200).json(postCriado)
	} catch(erro) {                                                   // se falhar, aparece erro em vez de crashar o servidor
		console.error(erro.message)
			res.status(500).json({"Erro": "Falha na requisição"})
		
	}
}