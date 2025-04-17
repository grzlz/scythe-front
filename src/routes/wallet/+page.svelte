<script>
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabase'

  let balance = 1000.00 // This should come from your backend
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }
</script>

<div class="wallet-container">
  <div class="balance-card mb-4">
    <h3 class="text-center mb-2">Balance</h3>
    <h1 class="text-center balance-amount">{formatCurrency(balance)}</h1>
  </div>

  <div class="action-buttons">
    <button class="btn btn-primary btn-lg w-100 mb-3" on:click={() => goto('/wallet/send')}>
      Enviar
    </button>
    
    <button class="btn btn-success btn-lg w-100 mb-3" on:click={() => goto('/wallet/request')}>
      Solicitar
    </button>
    
    <button class="btn btn-info btn-lg w-100" on:click={() => goto('/wallet/history')}>
      Historial
    </button>
  </div>
</div>

<style>
  .wallet-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .balance-card {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .balance-amount {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .action-buttons {
    margin-top: 2rem;
  }

  .action-buttons button {
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 12px;
    transition: transform 0.2s;
  }

  .action-buttons button:hover {
    transform: translateY(-2px);
  }
</style>