<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    function redirectToRegister() {
    goto('/auth/register');
  }
  </script>

<div class="about-container">
    <h1>¿Qué es Scythe?</h1>
  
    <p>
      Scythe es un sistema de producción de software diseñado para distribuir equitativamente los beneficios del trabajo entre inversionistas y trabajadores.
    </p>
  
    <p>
        Estamos construyendo una herramienta para alinear los incentivos de los desarrolladores 🧑‍💻 y los inversionistas 💸. El corazón de esta herramienta es nuestro token digital: <strong>scythe</strong>. Puedes pensar en scythe como una <em>unidad de medida</em> que representa tiempo, esfuerzo y valor. 
    </p>
      
  
    <h2>¿Cómo funciona? 🛠️</h2>
    <p>
      Si estás familiarizado con metodologías Agile, entonces piensa que un scythe es igual a un story point. Los desarrolladores obtienen tokens al completar tareas exitosamente ✅ y los pueden utilizar para participar en votaciones 🗳️, hacer solicitudes, proponer iniciativas 🚀 o se pueden intercambiar por otros tokens 📈.
    </p>
  
    <p>
      Con Scythe, la producción de software se convierte en un juego cooperativo donde cada participante tiene voz, responsabilidad y beneficios reales. 
    </p>
    <section class="how-it-works my-10">
      <h2>¿Cómo participar en el Airdrop? 🎁</h2>
    
      <div class="steps">
        <div class="step">
          <h3>1. Regístrate 📝</h3>
          <p>
            Crea tu cuenta en el módulo de <span class="link-like" on:click={redirectToRegister}>registro</span>.
          </p>
        </div>
    
        <div class="step">
          <h3>2. Accede a tu wallet 🔐</h3>
          <p>
            Una vez que inicies sesión, serás dirigido automáticamente a tu wallet dentro de <strong>Scythe</strong>.
          </p>
        </div>
    
        <div class="step">
          <h3>3. Reclama tu airdrop 💸</h3>
          <p>
            En tu wallet encontrarás un botón que dice <em>"Scythe airdrop"</em>. Haz click para recibir tus tokens.
          </p>
        </div>
    
        <div class="step">
          <h3>4. ¡Listo! 🚀</h3>
          <p>
            Ya tienes tus scythes. A medida que vaya avanzando el proyecto, podrás utilizarlos para participar en votaciones, hacer solicitudes y proponer iniciativas.
          </p>
        </div>
      </div>
    </section>

      <section class="what-airdrop">
        <h2>¿Qué es un Airdrop?</h2>
        <p>
          Un airdrop es una forma de distribuir tokens de manera gratuita a los primeros interesados en un proyecto. En el caso de Scythe, el airdrop está diseñado para recompensar a los primeros usuarios y fomentar la participación activa en nuestra plataforma.
        </p>
      </section>

      <section class="next-steps">
        <h2>Próximamente:</h2>
        <ul>
          <li>¿Qué puedo hacer con mis scythes?</li>
          <li>¿Cómo puedo usar mis scythes?</li>
        </ul>
      </section>
  </div>


  
  
  <style>

    .next-steps {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #348adf;
      border-radius: 12px;
    }


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
      text-align: left;
    }
  
    h2 {
      font-size: 1.5rem;
      margin-top: 2rem;
      color: #333;
      text-align: left;
    }
  
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 1rem 0;
      color: #444;
    }
  
  .how-it-works {
    background-color: #f8f9fa;
    padding: 2rem;
    border-radius: 12px;
  }

  .how-it-works h2 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .step {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }

  .step:hover {
    transform: translateY(-5px);
  }

  .step h3 {
    color: #eb2525;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .step p {
    color: #666;
    line-height: 1.5;
  }

  .step .link-like {
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .steps {
      grid-template-columns: 1fr;
    }

    .step {
      margin-bottom: 1rem;
    }
  }
    
  </style>
  
