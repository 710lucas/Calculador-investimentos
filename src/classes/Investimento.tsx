export class Investimento{

    public dinheiroTotal : number;
    public dinheiroInvestido: number;
    public dinheiroRetirado: number;


    constructor(dinheiroTotal : number, dinheiroInvestido : number, dinheiroRetirado : number){
        this.dinheiroTotal = dinheiroTotal;
        this.dinheiroInvestido = dinheiroInvestido;
        this.dinheiroRetirado = dinheiroRetirado;
    }

    public getSaldo(){
        return this.dinheiroTotal;
    }

}