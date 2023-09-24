import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Produto } from './classes/Produto'
import { Mes } from './classes/Mes'
import { Investimento } from './classes/Investimento'
import { MesCard } from './Components/MesCard'
import { ProdutoCard } from './Components/ProdutoCard'
import { ProdutosCard } from './Components/ProdutosCard'
import { MesesCard } from './Components/MesesCard'



function App() {

  const [dinheiroAtual, setDinheiroAtual] = useState(0)
  const [depositoMensal, setDepositoMensal] = useState(0)
  const [saqueMensal, setSaqueMensal] = useState(0)
  const [porcentagemInvestimento, setPorcentagem] = useState(0)
  const [tempoSimulação, setTempo] = useState(0)
  const [dinheiroTotal, setTotal] = useState(0)


  const [imgProduto, setImg] = useState("none")
  const [nomeProduto, setNome] = useState("")
  const [precoProduto, setPreco] = useState(0)
  const [parcelasProduto, setParcelas] = useState(0)
  const [inicioProduto, setInicio] = useState(1)

  const [meses, setMeses] = useState<Mes[]>([])

  const [carrinhoJSON, setCarrinho] = useState("")

  let produtos : Produto[] = []

  const [produtosArray, setProdutosArray] = useState<Produto[]>([])

  function salvarProdutos(){
    localStorage.setItem("produtos", JSON.stringify([...produtosArray]))
  }

  function getProdutos(){

    let json = carrinhoJSON

    if(json !== null){
      setProdutosArray(JSON.parse(json))
      produtos = JSON.parse(json)
    }
  }

  function handleChangeState(stateSetter : Function, valor : string){
    if(!isNaN(parseFloat(valor)))
      stateSetter(parseFloat(valor))
    else
      stateSetter(0)

  }

  function iniciarSimulação(){

    let total = dinheiroAtual
    const mensal = depositoMensal
    const sMensal = saqueMensal
    const porcetagem = porcentagemInvestimento/100
    let mesesTmp : Mes[] = []


    for(var i = 0; i<tempoSimulação; i++){

      total+=mensal
      total-=sMensal
      total+=total*porcetagem

      let investimento = new Investimento(total, mensal, sMensal)
      let produtoMes : Produto[] = []

      produtosArray.forEach((p)=>{
        console.log("nomes: "+p.nome)
        console.log(p)
        if(p.parcelasJaPagas<p.quantidadeParcelas && p.inicioPagamento-1<=i){
          p.parcelasJaPagas+=1
          console.log("nome2: "+p.nome)

          investimento.dinheiroInvestido-=(p.preco/p.quantidadeParcelas)
          total-=p.preco/p.quantidadeParcelas
          console.log("retirado: "+(p.preco/p.quantidadeParcelas))
          produtoMes.push(p)

        }
      })

      investimento.dinheiroTotal = total

      let mesTmp = new Mes(investimento, produtoMes, i+1)
      mesesTmp.push(mesTmp)


    }

    setTotal(total)
    setMeses(mesesTmp)
    produtosArray.forEach(element => {
      element.parcelasJaPagas = 0
    });

  }

  function saveCarrinho(){


    let coiso = JSON.stringify(produtosArray)
    setCarrinho(coiso)
    console.log(coiso)
    console.log(carrinhoJSON+"state")
  }

  return (
    <>
      <label htmlFor='dAtual'>dinheiro atual </label>
      <input name="dAtual" type='text' placeholder='dinheiroAtual' value={dinheiroAtual.toString()} onChange={(event) => {handleChangeState(setDinheiroAtual, event.target.value)}}></input>
      <br></br>
      <label htmlFor='dMensal'>deposito mensal </label>
      <input name="dMensal" type='text' placeholder='' value={depositoMensal.toString()} onChange={(event) => {handleChangeState(setDepositoMensal, event.target.value)}}></input>
      <br></br>
      <label htmlFor='sMensal'>saque mensal </label>
      <input name="sMensal" type='text' placeholder='' value={saqueMensal.toString()} onChange={(event) => {handleChangeState(setSaqueMensal, event.target.value)}}></input>
      <br></br>
      <label htmlFor='pRend'>Porcentagem de rendimento ex:1% = 0.01</label>
      <input name="pRend" type='text' placeholder='' value={porcentagemInvestimento.toString()} onChange={(event) => {handleChangeState(setPorcentagem, event.target.value)}}></input>
      <br></br>
      <label htmlFor='tempo'>Meses da simulação:</label>
      <input name="tempo" type='text' placeholder='' value={tempoSimulação.toString()} onChange={(event) => {handleChangeState(setTempo, event.target.value)}}></input>
      <br></br>


      <h2>Adicionar produtos a simulação</h2>

      <label htmlFor='img'>Imagem do produto, não é obrigatoria</label>
      <input name="img" type='text' placeholder='' value={imgProduto} onChange={(event) => {setImg(event.target.value)}}></input>
      <br></br>
      <label htmlFor='nome'>Nome do produto</label>
      <input name="nome" type='text' placeholder='' value={nomeProduto} onChange={(event) => {setNome(event.target.value)}}></input>
      <br></br>
      <label htmlFor='preco'>Preco do produto</label>
      <input name="preco" type='text' placeholder='' value={precoProduto} onChange={(event) => {handleChangeState(setPreco, event.target.value)}}></input>
      <br></br>
      <label htmlFor='parcelas'>Quantidade de parcelas</label>
      <input name="parcelas" type='text' placeholder='' value={parcelasProduto} onChange={(event) => {handleChangeState(setParcelas, event.target.value)}}></input>
      <br></br>
      <label htmlFor='inicio'>Em qual mês irá iniciar o pagamento? mês 1 = primeiro mes e assim por diante</label>
      <input name="inicio" type='text' placeholder='' value={inicioProduto} onChange={(event) => {handleChangeState(setInicio, (event.target.value))}}></input>
      <br></br>
      <button onClick={() =>{produtos.push(new Produto(imgProduto, nomeProduto, precoProduto, parcelasProduto, inicioProduto)); setProdutosArray([...produtosArray, produtos[produtos.length-1]]); }}>Adicionar produto</button>
      <button onClick={getProdutos}>Carregar produtos anteriores</button>
      <button onClick={saveCarrinho}>Salvar carrinho em JSON</button>
      <br></br>
      <textarea value={carrinhoJSON} onChange={(event) => setCarrinho(event.target.value)}></textarea>


      <ProdutosCard produtos={produtosArray} deleteProduto={(produto: Produto) => {let listaProdutos = [...produtosArray]; listaProdutos = listaProdutos.filter((p) => p !== produto); setProdutosArray(listaProdutos)}}></ProdutosCard>


      <button onClick={() => {iniciarSimulação(); console.log("lol:"+produtosArray.map((p)=>p.nome))}}>Iniciar simulação</button>
      <h1>Dinheiro ao fim da simulação: {"R$"+dinheiroTotal.toString()}</h1>
      
      <MesesCard meses={meses}/>
    </>
  )
}

export default App
