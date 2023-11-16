package enzo.tavares.hortaconectavel.models

import kotlinx.serialization.Serializable

@Serializable
data class Receita(
        val _id: String,
        val nome: String,
        //val foto: Foto,
        val tempoDePreparo: String,
        //val ingredientes: List<Ingrediente>,
        //val modoDePreparo: List<PassoDePreparo>,
        val __v: Int
):java.io.Serializable

/*
@Serializable
data class Foto(
    val imagem_grande: Imagem,
    val imagem_media: Imagem,
    val imagem_pequena: Imagem,
    val excluir: String,
    val _id: String
):java.io.Serializable

@Serializable
data class Imagem(
    val filename: String,
    val name: String,
    val mime: String,
    val extension: String,
    val url: String
):java.io.Serializable

@Serializable
data class Ingrediente(
    val nome: String,
    val _id: String
):java.io.Serializable

@Serializable
data class PassoDePreparo(
    val passos: String,
    val _id: String
):java.io.Serializable*/