import React, { useState, useEffect } from "react"
import MenuFuncionario from "../MenuFuncionario/MenuFuncionario"
import api from "../../services/api"
import { Link } from "react-router-dom"




const ListarProduto = () =>{

/*
  useState: é um hook do react que serve para armazenar e controlar o estado de uma variável dentro de um componente funcional. 
Ele permite que você declare báriaveis que lembram valores entre renderizações do componente, 
e quando o valor da variável muda, o componente é re-renderizado para refletir a mudança na interface do usuário.
 */

// Composição[nome da variável de estado] = useState[valor inicial da variável de estado]

/*
Exemplo de uso do useState:

  const [numero, setNumero] = useState(0)

numero: é a variável de estado que armazena o valor atual.

setNumero: é a função que permite atualizar o valor da variável de estado.

useState(0): é o hook que inicializa a variável de estado com o valor 0.


Para nossoaplicativo, preciso de uma array de produtos iniciando com um array vázio
Por que?? O objetivo é que esse array seja preenchido com os produtos que vem da API - BACKEND, e que serão exibidos na tela do usuário.

*/
const [produtos, setProdutos] = useState([])

/* 
useEffect: é um hook do React que permite executar efeitos colaterais em componentes funcionais.
Ele é usado para lidar com operações assíncronas, como chamadas de API, manipulação de eventos, timers, entre outros.

Em nossa página vamos utilizar para acessar a API do backend e buscar os produtos cadastrados no banco de dados, 
e assim preencher o array de produtos que será exibido na tela do usuário.
*/


//useEffect(função que será executada, [quando esse valor mudar, a função será executada novamente])
//Obs:[] manter vazio, para que a função seja executada apenas uma vez, quando o componente for montado na tela do usuário.
//Resumindo []: execute isso quando a página for carregada, e não execute novamente, mesmo que o usuário faça alguma ação na página.

useEffect(() => {
 
  api
    .get("/produtos") //fazendo uma requisição GET para a rota /produto da API
     
    .then((response)=>{

      // :) deu certo, a API respondeu com os dados dos produtos
      console.log(response.data.data) //exibindo no console os dados que vieram da API
      setProdutos(response.data.data) //setando o array de produtos com os dados que vieram da API
    })
    .catch((error)=>{
    
// :( deu errado, a API não respondeu com os dados dos produtos
      console.error("Erro ao buscar produtos:", error)
    })


}, [])

    /*
  const arrayProdutos = [
    {
        id: 1,
        nome: "Pizza de Calabresa",
        descricao: "Pizza de calabresa com borda recheada",
        preco: 59.90
    },
    {
        id: 2,
        nome: "Pizza de Frango",
        descricao: "Pizza de frango com catupiry",
        preco: 65.00
    },
    {
        id: 3,
        nome: "Pizza de Mussarela",
        descricao: "Pizza de mussarela com borda recheada",
        preco: 55.00
    }
]
*/

    return (
        <div className="container">
             <MenuFuncionario/>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-success">
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Ações</th> {/* Nova coluna de Ações */}
            </tr>
          </thead>
          <tbody>
            
            {produtos.map((produto) => (

              <tr key={produto.id}>
                <td style={{ fontSize: "13px" }} >{produto.nome}</td>
                <td style={{ fontSize: "13px" }}> 
                    {
                        new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                        }).format(produto.preco)
                    }

                </td>
                <td style={{ fontSize: "13px" }}> {produto.descricao} </td>
                <td className="text-center fs-6" style={{ width: "100px" }}>
                  {/* Botão de Editar */}

                  <button
                    className="btn btn-sm btn-primary me-2">
                    <i className="fas fa-pencil-alt"></i>{" "}
                    {/* Ícone de editar */}
                  </button>

                  {/* Botão de Excluir */}
                  <button
                    className="btn btn-sm btn-danger">
                    <i className="fas fa-trash-alt"></i>{" "}
                    {/* Ícone de excluir */}
                  </button>
                </td>
              </tr>

            ))}
            
          </tbody>
        </table>
      </div>           

      <div className="text-end mt-3">
        <Link
          to="/produtos/novo"
          className={`btn btn-success`}
          >
            <i className="fas fa-plus"></i> 
            Novo Produto
          </Link>
      </div>
    </div>
  )


}

export default ListarProduto
