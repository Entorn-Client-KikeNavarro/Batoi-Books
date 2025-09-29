import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    
    <img src="public/logoBatoi.png" class="logo" alt="Batoi logo" />
    <header>BatoiBooks</header>
    <p>Abre la consola para ver el resultado</p>
  </div>
`

setupCounter(document.querySelector('#counter'))
