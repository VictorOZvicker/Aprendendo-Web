import Generator from "./Generators.js";

const botao = document.getElementById('button1');

const generator1Button = document.getElementById('generator1');
const generator2Button = document.getElementById('generator2');
const generator3Button = document.getElementById('generator3');

const display = document.getElementById('pontos');

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleLoja');
    const lojagenerators = document.getElementById('lojagenerators');

    toggleBtn.addEventListener('click', () => {
        lojagenerators.classList.toggle('escondida');
        toggleBtn.textContent = lojagenerators.classList.contains('escondida') ? '+' : '−';
    });
});


let generatorTotal = []
let pontos = 0;

generatorTotal.push(new Generator("generator Automatico 1", 10, 1.15, 1));
generatorTotal.push(new Generator("generator Automatico 2", 50, 1.35, 2));
generatorTotal.push(new Generator("generator Automatico 3", 150, 1.5, 10));

let deltaTime = 0;
let lastTime = 0;



function gameLoop(currentTime) {
  // Calcula o tempo decorrido desde o último frame
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // --- Lógica do seu jogo aqui ---
  update(deltaTime); // Atualiza o estado do jogo
  render();          // Renderiza o estado do jogo na tela
  // --------------------------------

  // Solicita o próximo frame de animação
  requestAnimationFrame(gameLoop);
}

function update(dt) {
  // Aqui você calcula o ganho de dinheiro por segundo de cada item.
  // Por exemplo, se um item gera 10 de ouro por segundo:
  // goldPerSecond = item.production * (dt / 1000); // dt está em milissegundos
  // totalGold += goldPerSecond;

  // Lógica de crescimento de custo e produção dos itens também vai aqui.
  // Exemplo:
  // if (player.gold >= nextItemCost) {
  //   player.canAffordNextItem = true;
  // }
  producaoAutomatica();
}

function render() {
  // Aqui você atualiza a interface do usuário (UI) com os novos valores,
  // como a quantidade de ouro, custos dos itens, etc.
  // document.getElementById('gold-display').innerText = Math.floor(totalGold);
  display.innerText = `Pontos: ${Math.floor(pontos)}`;
  generator1Button.innerText = `generator Nv 1 Custo: ${Math.floor(generatorTotal[0].getTotalPrice())} pontos \n Atualmente: ${generatorTotal[0].getTotalProduction()} /s`
  generator2Button.innerText = `generator Nv 2 Custo: ${Math.floor(generatorTotal[1].getTotalPrice())} pontos \n Atualmente: ${generatorTotal[1].getTotalProduction()} /s`
  generator3Button.innerText = `generator Nv 3 Custo: ${Math.floor(generatorTotal[2].getTotalPrice())} pontos \n Atualmente: ${generatorTotal[2].getTotalProduction()} /s`
}

function clicker() {
    pontos++;
    display.innerText = `Pontos: ${pontos}`;
}

function producaoAutomatica() {

  for(let i = 0; i < generatorTotal.length; i++) {
    pontos += generatorTotal[i].getTotalProduction() * (deltaTime / 1000);
  }
}


botao.addEventListener("click", clicker);
generator1Button.addEventListener("click", () => pontos = generatorTotal[0].buy(pontos));
generator2Button.addEventListener("click", () => pontos = generatorTotal[1].buy(pontos));
generator3Button.addEventListener("click", () => pontos = generatorTotal[2].buy(pontos));


requestAnimationFrame(gameLoop);