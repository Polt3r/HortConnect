package enzo.tavares.hortaconectavel.adapter

import android.content.Context
import android.view.*
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.Adapter
import enzo.tavares.hortaconectavel.R
import enzo.tavares.hortaconectavel.models.Receita

class AdapterReceitas(
    var contexto: Context,
    var listaReceitas: List<Receita>
) : Adapter<AdapterReceitas.MeuViewHolder>() {

    var posicaoClicada:Int = -1

    class MeuViewHolder(
        itemView: View,
        val contexto: Context) : RecyclerView.ViewHolder(itemView),

        View.OnCreateContextMenuListener {

            init {
                itemView.setOnCreateContextMenuListener(this)
            }

        override fun onCreateContextMenu(
            menu: ContextMenu,
            v: View?,
            menuInfo: ContextMenu.ContextMenuInfo?
        ) {
            var menuInflater:MenuInflater = MenuInflater(contexto)
            menuInflater.inflate(R.menu.menu_receitas,menu)
        }

        }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MeuViewHolder {
        var inflater:LayoutInflater = LayoutInflater.from(contexto)
        var view =inflater.inflate(R.layout.item_receita,parent,false)
        return MeuViewHolder(view, contexto)
    }

    override fun onBindViewHolder(holder: MeuViewHolder, position: Int) {
        val receita:Receita = listaReceitas.elementAt(position)
        val nomeReceita: TextView = holder.itemView.findViewById(R.id.nomeReceita)
        val tempoDePreparo: TextView = holder.itemView.findViewById(R.id.tempoDePreparo)
        nomeReceita.text = receita.nome
        tempoDePreparo.text = receita.tempoDePreparo

        holder.itemView.setOnClickListener { v->
            posicaoClicada = holder.adapterPosition
            false
        }
    }

    override fun getItemCount(): Int {
        return  this.listaReceitas.size
    }
}

