<script>
    import confetti from 'canvas-confetti';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import Modal from '$lib/components/Modal/Modal.svelte';


    let giveawayClaimed = $state(false)
    let showBonus = $state(false)
    let showModal = $state(false)
    let currentUser = $state(null)
    let modalMode = $state('')
    let balance = $state(0)
    let senderWalletId = $state('')
    let wallets = $state([])
    let subscription;

    onMount(async () => {
      currentUser = await getCurrentUser();
      console.log('Current User:', currentUser);
      
      if (currentUser?.id) {
        await fetchBalance();
        subscribeToWalletChanges()
        const { data, error } = await supabase.from('wallets').select('wallet_id').eq('user_id', currentUser.id).single();
        senderWalletId = data?.wallet_id || '';
        console.log('Sender Wallet ID:', senderWalletId);

        await fetchWallets();
      } else {
        console.error('No hay usuario autenticado');
      }
    })

    function subscribeToWalletChanges() {
      subscription = supabase.channel('wallet_changes')
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${currentUser.id}`
        }, async (payload) => {
          console.log('Wallet updated:', payload);
          await fetchBalance();
        })
        .subscribe(); 
    }

  async function fetchWallets() {
      const { data, error } = await supabase.from('wallets').select('wallet_id');
      if (error) {
        console.error('Error fetching wallets:', error);
      } else {
        wallets = data ?? [];
      }
    }

  async function getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        if (error.name === 'AuthSessionMissingError') {
          console.log('No hay sesión de usuario activa');
          // Intentar recuperar la sesión
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData && sessionData.session) {
            currentUser = sessionData.session.user;
            return currentUser;
          }
        } else {
          console.error('Error obteniendo usuario:', error);
        }
        return null;
      }
      
      if (data && data.user) {
        currentUser = data.user;
        return data.user;
      }
      
      return null;
    } catch (e) {
      console.error('Error inesperado:', e);
      return null;
    }
  }

  async function fetchBalance() {
    if (!currentUser) {
      console.error('No hay usuario autenticado');
      balance = 0;
      return;
    }
    
    const { data, error } = await supabase
      .from('wallets')
      .select('balance')
      .eq('user_id', currentUser.id)
      .single();

    if(!data) {
      console.error('Error fetching balance:', error);
      balance = 0;
    } else {
      balance = data.balance ?? 0;
    }

    const { count: giveawayCount, error: countError } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', currentUser.id)
      .eq('type', 'giveaway');

    if (!countError && giveawayCount !== null) {
      giveawayClaimed = giveawayCount >= 10;  // Si ya tiene 10 o más, disable botón
    }
  }
  
  function openModal(mode) {
    modalMode = mode
    showModal = true
  }
  
  function closeModal() {
    showModal = false
    modalMode = ''
  }
  
  async function claimGiveaway() {
    if (giveawayClaimed) return; 

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error('Error fetching user:', userError);
      return;
    }

    const { error: giveawayError } = await supabase.rpc('claim_giveaway', {
      p_user_id: userData.user.id
    });

    if (giveawayError) {
      console.error('Error claiming giveaway:', giveawayError.message);
      return;
    }

    await fetchBalance();
    
    setTimeout(() => {
      showBonus = true;
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

    <div class="text-center mb-4">
      <p class="mb-1 text-muted">Scythe ID:</p>
      <h5 class="fw-bold">{senderWalletId}</h5>
    </div>

    <div class="balance-section text-center mb-4 position-relative">
      <p class="balance-label">Scythes</p>
      <h1 class="balance-amount">{balance}</h1>

      {#if showBonus}
        <div class="bonus-float">+10</div>
      {/if}
    </div>

    <div class="text-center my-5">
      <button 
        class="btn btn-danger btn-lg d-flex align-items-center justify-content-center gap-2 w-100"
        disabled={giveawayClaimed}
        onclick={claimGiveaway}
      >
        <span class="fs-4">★</span>
        {giveawayClaimed ? 'Giveaway recibido!' : 'Scythe Giveaway!'}
      </button>
    </div>

    <div class="buttons-container d-flex flex-wrap justify-content-center gap-3">
      <button class="btn btn-primary wallet-button" onclick={() => openModal('enviar')}>
        Enviar
      </button>
      <button class="btn btn-success wallet-button" onclick={() => openModal('solicitar')}>
        Solicitar
      </button>
      <button class="btn btn-info wallet-button" onclick={() => openModal('historial')}>
        Historial
      </button>
    </div>

    <!-- Modal -->
     {#if showModal}
     <Modal mode={modalMode} senderId={currentUser.id} {wallets} {senderWalletId} closeModal={closeModal} {fetchBalance} />
     {/if}



  </div>
</div>
  
<style>

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