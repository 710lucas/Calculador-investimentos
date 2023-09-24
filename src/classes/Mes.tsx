import { Investimento} from "./Investimento"
import { Produto } from "./Produto";

export class Mes{

    public investimento : Investimento;
    public produto : Produto[];
    public numero : number;

    constructor(investimento : Investimento, produto : Produto[], numero : number){
        this.investimento = investimento;
        this.produto = produto;
        this.numero = numero;
    }

}