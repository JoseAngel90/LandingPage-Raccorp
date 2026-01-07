// Función global para desplazarse a secciones
function scrollToSection(sectionId) {
  console.log('Buscando sección:', sectionId);
  const section = document.getElementById(sectionId);
  
  if (section) {
    section.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    console.log('Sección encontrada y desplazando...');
  } else {
    console.error('Sección no encontrada:', sectionId);
  }
}

// Inicialización del documento
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado completamente');
  
  // Animación de palabras en hero
  const words = document.querySelectorAll('.word');
  words.forEach((word, index) => {
    word.style.animation = `wordSlide 0.6s ease-out ${index * 0.15}s backwards`;
  });

  // Formulario
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.hidden = false;
      status.textContent = '📤 Enviando...';
      status.style.color = '#58a6ff';
      
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        
        if (res.ok) {
          status.textContent = '✅ ¡Gracias! Te contactaremos pronto.';
          status.style.color = '#22c55e';
          form.reset();
        } else {
          status.textContent = '❌ Error al enviar. Intenta de nuevo.';
          status.style.color = '#ef4444';
        }
      } catch (err) {
        status.textContent = '❌ Error de conexión.';
        status.style.color = '#ef4444';
        console.error('Error:', err);
      }
      
      setTimeout(() => { 
        status.hidden = true;
        status.textContent = '';
      }, 5000);
    });
  }
});