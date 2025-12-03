import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Bienvenido a UCMvirtual</h1>
  <div class="contenedor-logo">
  <input type="text" placeholder="Usuario" class="input-usuario"/>
  </div>
  <div class="contenedor-logo">
  <input type="password" placeholder="Contraseña" class="input-contraseña"/>
  </div>
  <button class="cuadrado" data-page="/pagina2.html" type="submit">ingresar</button>
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
