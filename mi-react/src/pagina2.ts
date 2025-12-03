import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Haz click en una caja para cambiar de página</h1>
  <div class="contenedor">
  <button class="cuadrado" data-page="/pagina2.html">Página 1</button>
  <button class="cuadrado" data-page="/pagina3.html">Página 2</button>
  <button class="cuadrado" data-page="/pagina2.html">Página 3</button>
  </div>
  `

// ASIGNAR EVENTOS A LAS CAJAS
document.querySelectorAll('.cuadrado').forEach(caja => {
  caja.addEventListener('click', () => {
    const destino = caja.getAttribute('data-page')
    if (destino) {
      window.location.href = destino   // ← navegar
    }
  })
})
