package enzo.tavares.hortaconectavel.api

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class RetrofitClient {
    private val BASE_URL = "https://web-s4p27wq3uls4.up-de-fra1-1.apps.run-on-seenode.com/"  // Substitua pela URL base

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val receitaService: ServicoReceitas = retrofit.create(ServicoReceitas::class.java)

}