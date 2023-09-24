import { Produto } from "../classes/Produto";
import "../css/produto.css"



export const ProdutoCard = ({produto, deleteProduto} : {produto : Produto, deleteProduto? : (produto : Produto) => void}) =>{

    return(
        <div className="produtoCard">
            <img src={produto.img} className="imagem"></img>
            <h3>{produto.nome}</h3>
            <p>Preço da parcela: {produto.preco/produto.quantidadeParcelas}</p>
            {deleteProduto &&(
                <button onClick={() => deleteProduto(produto)}>❌</button>
            )
            }
        </div>
    )

}