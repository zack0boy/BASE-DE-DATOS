import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Página 3</h1>
   <button class="btn-volver" onclick="window.location.href='/index.html'">Volver al inicio</button>

`
