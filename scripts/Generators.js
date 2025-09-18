export default class Generator {
  constructor(name, basePrice, priceMult, baseProduction) {
    this.name = name;
    this.basePrice = basePrice;              
    this.priceMult = priceMult; 
    this.baseProduction = baseProduction;        
    this.quantity = 0;                     
    this.totalPrice = basePrice;
    this.totalProduction = 0;             
  }

  buy(points) {
    if (points >= this.totalPrice) {
      this.quantity++;
      points -= this.totalPrice;
      this.totalPrice = this.basePrice * Math.pow(this.priceMult, this.quantity);
      this.totalProduction = this.quantity * this.baseProduction;
      return points;
    }
    return points;
  }

  getTotalProduction() {
    return this.totalProduction;
  }

  getTotalPrice() {
    return this.totalPrice;
  }
}