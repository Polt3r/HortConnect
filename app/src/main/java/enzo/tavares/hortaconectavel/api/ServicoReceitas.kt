package enzo.tavares.hortaconectavel.api

import enzo.tavares.hortaconectavel.models.Receita
import retrofit2.Call
import retrofit2.http.*

interface ServicoReceitas {

    @GET("contatos/{id}")
    fun getReceita(@Path("id") id: String): Call<Receita>

    @GET("contatos")
    fun getAllReceitas(): Call<List<Receita>>

    @POST("contatos")
    fun createReceita(@Body contato: Receita): Call<Receita>

    @PUT("contatos/{id}")
    fun updateReceita(@Path("id") id: String, @Body receita: Receita): Call<Receita>

    @DELETE("contatos/{id}")
    fun deleteReceita(@Path("id") id: String): Call<Void>

}