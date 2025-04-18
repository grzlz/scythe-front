<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  </script>

<div class="about-container">
    <h1>¿Qué es Scythe?</h1>
  
    <p>
      Scythe es sistema de producción de software diseñado para distribuir equitativamente los beneficios del trabajo entre inversionistas y trabajadores.
    </p>
  
    <p>
        Estamos construyendo una herramienta para alinear los incentivos de los desarrolladores 🧑‍💻 y los inversionistas 💸. El corazón de esta herramienta es nuestro token digital: <strong>scythe</strong>. Puedes pensar en scythe como una <em>unidad de medida</em> que representa tiempo, esfuerzo y valor. 
    </p>
      
  
    <h2>¿Cómo funciona? 🛠️</h2>
    <p>
      Si estás familiarizado con metodologías Agile, entonces piensa que un scythe es igual a un story point. Los tokens se emiten al completar sprints exitosos ✅ y se pueden utilizar para participar en votaciones 🗳️, proponer iniciativas 🚀 o se pueden intercambiar por otros tokens 📈. Toda la actividad es trazable y auditable.
    </p>
  
    <p>
      Con Scythe, la producción de software se convierte en un juego cooperativo donde cada participante tiene voz, responsabilidad y beneficios reales. 
    </p>
  </div>
  
  
  <style>
    .about-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: white;
      border-radius: 1rem;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  
    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      color: #333;
    }
  
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 1rem 0;
      color: #444;
    }
  
    ul {
      list-style-type: disc;
      padding-left: 2rem;
      margin: 1rem 0;
    }
  </style>
  
