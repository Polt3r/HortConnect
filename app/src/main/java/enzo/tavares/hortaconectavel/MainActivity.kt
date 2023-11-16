package enzo.tavares.hortaconectavel

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import enzo.tavares.hortaconectavel.adapter.AdapterReceitas
import enzo.tavares.hortaconectavel.api.RetrofitClient
import enzo.tavares.hortaconectavel.models.Receita

class MainActivity : AppCompatActivity() {

    lateinit var recyclerReceitas:RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        recyclerReceitas = findViewById(R.id.recyclerReceitas)

        recyclerReceitas.layoutManager = LinearLayoutManager(
            this,
            LinearLayoutManager.VERTICAL,
            false
        )

        var retrofitCli:RetrofitClient = RetrofitClient()
        retrofitCli.receitaService.getAllReceitas().enqueue(
            object: Callback<List<Receita>>{
                override fun onResponse(
                    call: Call<List<Receita>>,
                    response: Response<List<Receita>>
                ) {
                    if (response.body()!=null) {
                        var adapter: AdapterReceitas =
                            AdapterReceitas(this@MainActivity, response.body()!!)
                        recyclerReceitas.adapter = adapter
                    }

                }

                override fun onFailure(call: Call<List<Receita>>, t: Throwable) {
                    Log.e("API", "Falha ao Carregar Receitas")
                }
            }
        )

    }

    override fun onResume() {
        super.onResume()
        var retrofitCli:RetrofitClient = RetrofitClient()
        retrofitCli.receitaService.getAllReceitas().enqueue(
            object: Callback<List<Receita>>{
                override fun onResponse(
                    call: Call<List<Receita>>,
                    response: Response<List<Receita>>
                ) {
                    if (response.body()!=null) {
                        var adapter: AdapterReceitas =
                            AdapterReceitas(this@MainActivity, response.body()!!)
                        recyclerReceitas.adapter = adapter
                    }

                }

                override fun onFailure(call: Call<List<Receita>>, t: Throwable) {
                    Log.e("API", "Falha ao Carregar Receitas")
                }
            }
        )

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if(requestCode==1 && resultCode==1)
        {

        }

    }

}