export class Produto{

    public img? : string = "https://static.vecteezy.com/ti/vetor-gratis/t2/7509026-um-simbolo-de-dolar-tridimensional-moeda-linear-icone-sinal-desenhado-a-mao-preto-e-branco-ilustracao-isolado-em-um-fundo-branco-vetor.jpg";
    public nome : string;
    public preco : number;
    public quantidadeParcelas : number;
    public inicioPagamento : number;
    public parcelasJaPagas : number = 0;

    constructor(img : string, nome : string, preco : number, quantidadeParcelas : number, inicioPagamento : number){
        if(img != "none" && img != "")
            this.img = img;
        this.nome = nome;
        this.preco = preco;
        this.quantidadeParcelas = quantidadeParcelas;
        this.inicioPagamento = inicioPagamento;
    }


}