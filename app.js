function goHome() {
  window.location.href = 'index.html';
}



const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;

// Charger la préférence enregistrée (localStorage)
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️'; // changer icône lune → soleil
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  toggleBtn.textContent = isDark ? '☀️' : '🌙';

  // Sauvegarder la préférence
  if (isDark) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});


if('serviceWorker' in navigator){
  window.addEventListener('load', ()=> {
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{/* ignore */});
  });
}