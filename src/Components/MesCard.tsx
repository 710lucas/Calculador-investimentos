import { Mes } from "../classes/Mes";
import { ProdutosCard } from "./ProdutosCard";

export const MesCard = ({mes} : {mes : Mes}) =>{

    return(
        <div>
            <h1>Mes {mes.numero}</h1>
            <p><b>Saldo do mês: {mes.investimento.getSaldo()}</b></p>
            <p><b>Valor investido no mês: {mes.investimento.dinheiroInvestido}</b></p>
            <div>
                <h2>Produtos pagos no mês: </h2>
                <div>
                    <ProdutosCard produtos={mes.produto}></ProdutosCard>
                </div>
            </div>
        </div>
    )

}