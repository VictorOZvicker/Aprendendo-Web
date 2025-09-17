import Upgrade from "./Upgrades.js";

const botao = document.getElementById('button1');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const display = document.getElementById('pontos');

let upgradeTotal = []
let pontos = 0;

upgradeTotal.push(new Upgrade("Upgrade Automatico", 10, 1.15, 1));
upgradeTotal.push(new Upgrade("Upgrade Automatico 2", 50, 1.35, 2));

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
  upgrade1Button.innerText = `Upgrade automatico Custo: ${Math.floor(upgradeTotal[0].getPrecoAtual())} pontos`
  upgrade2Button.innerText = `Upgrade automatico Custo: ${Math.floor(upgradeTotal[1].getPrecoAtual())} pontos`
}

function clicker() {
    pontos++;
    display.innerText = `Pontos: ${pontos}`;
}

function producaoAutomatica() {

  for(let i = 0; i < upgradeTotal.length; i++) {
    pontos += upgradeTotal[i].getProducaoTotal() * (deltaTime / 1000);
  }
}


botao.addEventListener("click", clicker);
upgrade1Button.addEventListener("click", () => pontos = upgradeTotal[0].comprar(pontos));
upgrade2Button.addEventListener("click", () => pontos = upgradeTotal[1].comprar(pontos));



requestAnimationFrame(gameLoop);