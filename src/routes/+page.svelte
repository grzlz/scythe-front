<script>
    import confetti from 'canvas-confetti';

    let balance = 0;
    let showModal = false;
    let airdropClaimed = false;
    let showBonus = false;
  
    function openModal() {
      showModal = true;
    }
  
    function closeModal() {
      showModal = false;
    }

    function checkBalance() {
      if (balance > 100) {
        airdropClaimed = true;
      }
    }
  
    function claimAirdrop() {
      if (airdropClaimed) return;

      showBonus = true;
      checkBalance();

        balance += 10;

  
      setTimeout(() => {
        showBonus = false;
      }, 1200); // hide after animation
      
      confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });
    }
    
  </script>
  
  <div class="container">
    <div class="wallet-container">
  
      <!-- Balance Section -->
      <div class="balance-section text-center mb-4 position-relative">
        <p class="balance-label">Scythes</p>
        <h1 class="balance-amount">{balance}</h1>
  
        {#if showBonus}
          <div class="bonus-float">+10</div>
        {/if}
      </div>
  
      <!-- Airdrop Button -->
      <div class="text-center my-5">
        <button 
          class="btn btn-danger btn-lg d-flex align-items-center justify-content-center gap-2 w-100"
          disabled={airdropClaimed}
          on:click={claimAirdrop}
        >
          <span class="fs-4">★</span>
          {airdropClaimed ? '¡Airdrop recibido!' : 'Scythe Airdrop'}
        </button>
      </div>
  
      <!-- Buttons Section -->
      <div class="buttons-container d-flex flex-wrap justify-content-center gap-3">
        <button class="btn btn-primary wallet-button" on:click={openModal}>
          Enviar
        </button>
  
        <button class="btn btn-success wallet-button" on:click={openModal}>
          Solicitar
        </button>
  
        <button class="btn btn-info wallet-button" on:click={openModal}>
          Historial
        </button>
      </div>
  
      <!-- Modal -->
      {#if showModal}
        <button class="modal-backdrop" on:click={closeModal} role="button" aria-label="Close modal"></button>
        <div class="custom-modal">
          <h2>🚧 Próximamente</h2>
          <p>Esta función aún no está disponible.</p>
          <button class="btn btn-secondary mt-3" on:click={closeModal}>Cerrar</button>
        </div>
      {/if}
  
    </div>
  </div>
  
  <style>
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.5);
      z-index: 10;
    }
  
    .custom-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 10px;
      padding: 2rem;
      z-index: 11;
      text-align: center;
      max-width: 90%;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    }
  
    .wallet-container {
      padding: 2rem;
      max-width: 600px;
      margin: 2rem auto;
      background: linear-gradient(145deg, #ffffff, #f5f5f5);
      border-radius: 20px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  
    .balance-section {
      text-align: center;
      padding: 2rem 0;
      margin-bottom: 2rem;
      background: linear-gradient(145deg, #2196f3, #1976d2);
      border-radius: 15px;
      color: white;
      position: relative;
    }
  
    .balance-label {
      margin: 0;
      font-size: 1.2rem;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  
    .balance-amount {
      margin: 0.5rem 0 0 0;
      font-size: 3rem;
      font-weight: bold;
    }
  
    .bonus-float {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      font-weight: bold;
      color: #ff5252;
      animation: floatUp 1s ease-out forwards;
      z-index: 100;
    }
  
    @keyframes floatUp {
      0% {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50px);
      }
    }
  
    .buttons-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .wallet-button {
      width: 100%;
      padding: 1rem;
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: none;
      border-radius: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
  
    .wallet-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
  
    @media (max-width: 768px) {
      .wallet-container {
        margin: 1rem;
        padding: 1rem;
      }
  
      .balance-amount {
        font-size: 2.5rem;
      }
    }
  </style>
  