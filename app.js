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




if(saveOfflineBtn) saveOfflineBtn.addEventListener('click', async ()=>{
  if(!localSongs.length) return alert('Aucune carte à sauvegarder');
  if(!confirm('Sauvegarder toutes les cartes visibles pour visionnage hors-ligne ?')) return;
  for(const s of localSongs){
    try{
      if(s.fileObj) await saveBlob(s.name, s.fileObj);
      else { const r = await fetch(s.url); const b = await r.blob(); await saveBlob(s.name, b); }
      s.blobKey = s.name;
    }catch(e){ console.warn('save fail', e); }
  }
  alert('Sauvegarde terminée (IndexedDB)');
});
