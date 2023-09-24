import { Produto } from "../classes/Produto"
import { ProdutoCard } from "./ProdutoCard"

export const ProdutosCard = ({produtos, deleteProduto} : {produtos: Produto[], deleteProduto? : (produto : Produto) => void}) =>{


    function handleDelete(produto : Produto){
        if(deleteProduto)
            deleteProduto(produto)
    }
    
    return(
        <div style={({display: "flex", flexWrap: "wrap", justifyContent: "centrer"})}>
            {produtos.map((produtoAtual)=>(
                <ProdutoCard produto={produtoAtual} deleteProduto={() => handleDelete(produtoAtual)}/>
            ))}
        </div>
    )

}