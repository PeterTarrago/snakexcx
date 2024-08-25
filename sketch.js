let snake; // Snake
let token; // Token que el Sanke tiene que agarrar
let tokens = []; // Array de tokens
let estadoJuego = 'Inicio'; // Seteo de inicio de juego
let score = 0; // Seteo del puntaje
let totalTokens = 60; // La cantidad total de tokens para ganar
let initialSpeed = 0.3; // Velocidad incial del Snake

function setup() {
  createCanvas(600, 600);
  frameRate(10); // Ajuste de la velocidad
  snake = new Snake(); // Creación del Snake
  token = crearToken(); // Creación del token
}

function draw() {
  background(138, 206, 0); // Color de fondo
  
// Apenas comienza la aplicacion se llama a la función Menú que despliega el mismo. 
//Al hacer click en iniciar se inicia el juego y se depliega la funcion del snake en relación al token.
//Despues para la opción instrucciones llama a la función de las mismas y el mismo caso sucede con los créditos.
// Por último, cuando el juego haya finalizado ya sea porque el jugador recolectó la cantidad mázima de tokens, o colisionó contra los bordes o contra la viborita, se llama a la funcion que indica el game over.
  if (estadoJuego === 'Inicio') {
    Menu();
  } else if (estadoJuego === 'jugando') {
    snake.update();
    snake.Colision();

    if (snake.Comer(token)) {
      score++;
      token = crearToken();
    } 

    snake.Cuerpo();
    mostrarToken(token);

    if (score >= totalTokens) {
     estadoJuego = 'fin';
    }
  } else if (estadoJuego === 'INSTRUCCIONES') {
    Instrucciones();
  } else if (estadoJuego === 'CRÉDITOS') {
   Creditos();
  } else if (estadoJuego === 'fin') {
    GameOver();
  }
}

// La función muestra que teclas se deben tocar y por donde se mueve la víbora inidcando también el inicio del juego
function keyPressed() {
  if (estadoJuego === 'jugando') {
    if (keyCode === UP_ARROW && snake.yVelocidad !== 1) {
      snake.setDirection(0, -1);
    } else if (keyCode === DOWN_ARROW && snake.yVelocidad !== -1) {
      snake.setDirection(0, 1);
    } else if (keyCode === LEFT_ARROW && snake.xVelocidad !== 1) {
      snake.setDirection(-1, 0);
    } else if (keyCode === RIGHT_ARROW && snake.xVelocidad !== -1) {
      snake.setDirection(1, 0);
    }
  } else if (estadoJuego === 'fin' || estadoJuego === 'Inicio' || estadoJuego === 'INSTRUCCIONES' || estadoJuego === 'CRÉDITOS') {
    if (keyCode === ENTER) {
      estadoJuego = 'Inicio';
    }
  }
}

// La función muestra el Menú y sus opciones
function Menu() {
  textSize(60);
  textAlign(CENTER, CENTER);
  fill(0);
  text('Snake XCX', width / 2, height / 2 - 60);

  fill(255);
  rect(width / 2 - 100, height / 2, 200, 40);
  rect(width / 2 - 100, height / 2 + 50, 200, 40);
  rect(width / 2 - 100, height / 2 + 100, 200, 40);

  fill(0);
  textSize(20);
  text('INICIO', width / 2, height / 2 + 20);
  text('INSTRUCCIONES', width / 2, height / 2 + 70);
  text('CRÉDITOS', width / 2, height / 2 + 120);
}

// La función Instrucciones muestra las instrucciones del juego
function Instrucciones() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(0);
  text('INSTRUCCIONES', width / 2, height / 2 - 60);

  textSize(20);
  text('Usá las flechas del teclado para moverte.', width / 2, height / 2);
  text('Debes agarrar los tokens para sumar puntos', width / 2, height / 2 + 30);
  text('y que el snake crezca.', width / 2, height / 2 + 60);

  fill(50);
  rect(width / 2 - 100, height / 2 + 100, 200, 40);
  fill(255);
  textSize(20);
  text('B2b', width / 2, height / 2 + 120);
}

//La función créditos muestra a los creadores e inspiración detras del juego
function Creditos() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(0);
  text('CRÉDITOS', width / 2, height / 2 - 50);

  textSize(25);
  text('Creado por Camila Merli y Peter Tarragó', width / 2, height / 2);
   textSize(20);
  text('Inspirado en el género de juegos aracde Snake y la estética ', width / 2, height / 2 + 30);
  text('del álbum de estudio de Charli XCX "Brat"(2024)', width / 2, height / 2 + 60);


  fill(50);
  rect(width / 2 - 100, height / 2 + 100, 200, 40);
  fill(255);
  textSize(16);
  text('B2b', width / 2, height / 2 + 120);
}
// EN AMBAS FUNCIONES SE VUELVE AL MENÚ PRINCIPAL HACIENDO CLICK EN EL BOTON B2b


// La función muestra que finalizó el juego y los diferentes mensaje en base a si el jugador recolectó todos los tokens o "perdió"
function GameOver() {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(0);
  if (score >= totalTokens) {
    text('GANASTE BABY!', width / 2, height / 2 - 60);
  } else {
    text('GIRL, SO CONFUSING...', width / 2, height / 2 - 60);
  }
  textSize(30);
  text(`Score: ${score}`, width / 2, height / 2);

  textSize(20);
  text('REWIND (enter) para empezar de nuevo.', width / 2, height / 2 + 40);
}


//La función resetea los valores del snake, token y estaod de juego desde 0.
function resetJuego() {
  snake = new Snake();
  token = crearToken();
  score = 0;
  estadoJuego = 'jugando';
}

// crearToken ubica en una posición random al token en un vector de x e y.
function crearToken() {
  let cols = floor(width / snake.scale);
  let filas = floor(height / snake.scale);
  let tokenPos = createVector(floor(random(cols)), floor(random(filas)));
  tokenPos.mult(snake.scale);
  return tokenPos;
}

//mostrarToken permite ubicar al token en una posicion en relacion al snake
function mostrarToken(pos) {
  fill(255, 0, 0);
  rect(pos.x, pos.y, snake.scale, snake.scale);
}

// Creacion de la clase Snake. Despliega el array del cuerpo que se incrementando en base a los tokens. También indica que sucede cuando el snake se encuentra con un token o colisiona con los bprdes o con si mismo.
class Snake {
  constructor() {
    this.cuerpo = [];
    this.cuerpo[0] = createVector(floor(width / 2), floor(height / 2));
    this.xVelocidad = 0;
    this.yVelocidad = 0;
    this.scale = 20;
  }

  setDirection(x, y) {
    this.xVelocidad = x;
    this.yVelocidad = y;
  }

  update() {
    let Cabeza = this.cuerpo[this.cuerpo.length - 1].copy();
    this.cuerpo.shift();
    Cabeza.x += this.xVelocidad * this.scale;
    Cabeza.y += this.yVelocidad * this.scale;
    this.cuerpo.push(Cabeza);
  }

  Comer(pos) {
    let Cabeza = this.cuerpo[this.cuerpo.length - 1];
    if (Cabeza.x === pos.x && Cabeza.y === pos.y) {
      this.cuerpo.push(createVector(pos.x, pos.y));
      return true;
    }
    return false;
  }

  Colision() {
    let Cabeza = this.cuerpo[this.cuerpo.length - 1];
    for (let i = 0; i < this.cuerpo.length - 1; i++) {
      let part = this.cuerpo[i];
      if (Cabeza.x === part.x && Cabeza.y === part.y) {
        estadoJuego = 'fin';
      }
    }
    if (Cabeza.x >= width || Cabeza.x < 0 || Cabeza.y >= height || Cabeza.y < 0) {
      estadoJuego = 'fin';
    }
  }

 Cuerpo() {
    for (let i = 0; i < this.cuerpo.length; i++) {
      fill(0);
      noStroke();
      rect(this.cuerpo[i].x, this.cuerpo[i].y, this.scale, this.scale);
    }
  }
}

//La función muestra que sucede cuabdo se clickea en las diferentes opciones del menú
function mouseClicked() {
  if (estadoJuego === 'Inicio') {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100) {
      if (mouseY > height / 2 && mouseY < height / 2 + 40) {
        resetJuego();
       estadoJuego = 'jugando';
      } else if (mouseY > height / 2 + 50 && mouseY < height / 2 + 90) {
        estadoJuego = 'INSTRUCCIONES';
      } else if (mouseY > height / 2 + 100 && mouseY < height / 2 + 140) {
        estadoJuego = 'CRÉDITOS';
      }
    }
  } else if (estadoJuego === 'INSTRUCCIONES' || estadoJuego === 'CRÉDITOS') {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 100 && mouseY < height / 2 + 140) {
      estadoJuego = 'Inicio';
    }
  }
}
