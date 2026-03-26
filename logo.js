// logo.js — Pixel Art: tenista fallando el saque
(function () {

  // Paleta de colores (índice 0 = transparente)
  const P = [
    null,       // 0  transparent
    '#3d2200',  // 1  hair (dark brown)
    '#f5c99a',  // 2  skin
    '#ff4db8',  // 3  x-eye (pink — matches site)
    '#4dc8ff',  // 4  shirt (blue — matches site)
    '#e8e8f0',  // 5  shorts
    '#2a2a3e',  // 6  shoe
    '#f5d030',  // 7  racket frame (yellow — matches site)
    '#8b5e3c',  // 8  grip (brown)
    '#c8f040',  // 9  tennis ball
    '#0d0d1a',  // 10 mouth/dark
  ];

  // Sprite: 16 columnas × 20 filas, cada pixel = 4px
  // El jugador está balanceado a un lado, raqueta en alto, bola pasando de largo
  const S = [
  //  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0], // 0  bola (chispa)
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0], // 1  bola
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0], // 2  bola
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0], // 3  bola (chispa)
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 7, 0, 0], // 4  pelo + punta raqueta
    [ 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 7, 7, 7, 0], // 5  pelo + cabeza raqueta
    [ 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 7, 7, 7, 0], // 6  cara + cabeza raqueta
    [ 0, 0, 0, 1, 2, 3, 2, 2, 3, 2, 1, 0, 7, 7, 0, 0], // 7  ojos-X (rosa) + raqueta
    [ 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 8, 0, 0, 0], // 8  cara + empuñadura
    [ 0, 0, 0, 1, 2,10,10,10, 2, 2, 1, 8, 0, 0, 0, 0], // 9  boca abierta + empuñadura
    [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 8, 0, 0, 0, 0], // 10 mentón + empuñadura
    [ 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 8, 0, 0, 0, 0], // 11 brazo izq (piel) + cuerpo + mango
    [ 2, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0], // 12 brazo izq + cuerpo
    [ 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0], // 13 cuerpo inferior
    [ 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0], // 14 shorts
    [ 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0], // 15 shorts (más ancho)
    [ 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0], // 16 piernas separadas
    [ 0, 0, 6, 6, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0], // 17 zapato izq + pierna der
    [ 0, 0, 6, 6, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0], // 18 ambos zapatos
    [ 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0], // 19 pies abiertos (desequilibrado)
  ];

  const PX = 4; // tamaño de cada pixel en el canvas

  const canvas = document.getElementById('character-canvas');
  if (!canvas) return;

  canvas.width  = 16 * PX; // 64px
  canvas.height = 20 * PX; // 80px

  // Escalar vía CSS (2.5x) con pixelado nítido
  canvas.style.display        = 'block';
  canvas.style.width          = '160px';
  canvas.style.height         = '200px';
  canvas.style.imageRendering = 'pixelated';
  canvas.style.animation      = 'bounce 1.2s steps(2) infinite';

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < S.length; row++) {
      for (let col = 0; col < S[row].length; col++) {
        const ci = S[row][col];
        if (!ci) continue;
        ctx.fillStyle = P[ci];
        ctx.fillRect(col * PX, row * PX, PX, PX);
      }
    }
  }

  draw();

  // Animación: leve balanceo (frame alterno cada 600ms)
  const S2 = S.map(r => [...r]); // copia (idle, sin cambios)

  // Parpadeo de ojos: alterna entre ojos-X y ojos-cerrados (guiñar)
  let blinkFrame = false;
  setInterval(() => {
    blinkFrame = !blinkFrame;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < S.length; row++) {
      for (let col = 0; col < S[row].length; col++) {
        let ci = S[row][col];

        // En frame de parpadeo: ojos cerrados (skin en lugar de X)
        if (blinkFrame && row === 7 && (col === 5 || col === 8)) {
          ci = 2; // skin
        }

        if (!ci) continue;
        ctx.fillStyle = P[ci];
        ctx.fillRect(col * PX, row * PX, PX, PX);
      }
    }
  }, 800);

})();
