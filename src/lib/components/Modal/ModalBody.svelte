<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let { mode, recipientWalletId = $bindable(''), amount = $bindable(0), error, success } = $props();

    let wallets = $state([]);

    onMount(async () => {
    const { data, error } = await supabase.from('wallets').select('wallet_id');
    
    if (error) {
      console.error('Error fetching wallets:', error);
    } else {
      wallets = data ?? [];
    }
  });
</script>

<div class="modal-body">
    {#if mode === 'enviar'}
    <div class="mb-3">
        <label class="form-label" for="wallet_id">¿A quién le quieres enviar?</label>
        <select id="wallet_id" class="form-select" bind:value={recipientWalletId}>
          <option disabled selected value="">Selecciona una wallet</option>
          {#each wallets as wallet}
            <option value={wallet.wallet_id}>{wallet.wallet_id}</option>
          {/each}
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label" for="scythes">¿Cuántas?</label>
        <input type="number" class="form-control" bind:value={amount} />
      </div>
    {#if error}<div class="alert alert-danger mt-2">{error}</div>{/if}
    {#if success}<div class="alert alert-success mt-2">{success}</div>{/if}
    
    {:else if mode === 'solicitar'}
      <p class="text-muted">Esta función estará disponible próximamente.</p>
    
    {:else if mode === 'historial'}
      <p class="text-muted">Aquí podrás ver el historial de transacciones.</p>
    {/if}
</div>