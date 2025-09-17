export default class Upgrade {
  constructor(nome, precoBase, multiplicadorPreco, producaoBase) {
    this.nome = nome;
    this.precoBase = precoBase;              
    this.multiplicadorPreco = multiplicadorPreco; 
    this.producaoBase = producaoBase;        
    this.quantidade = 0;                     
    this.precoAtual = precoBase;
    this.producaoTotal = 0;             
  }

  comprar(pontos) {
    if (pontos >= this.precoAtual) {
      this.quantidade++;
      pontos -= this.precoAtual;
      this.precoAtual = this.precoBase * Math.pow(this.multiplicadorPreco, this.quantidade);
      this.producaoTotal = this.quantidade * this.producaoBase;
      return pontos;
    }
    return pontos;
  }

  getProducaoTotal() {
    return this.producaoTotal;
  }

  getPrecoAtual() {
    return this.precoAtual;
  }
}