<script>
    import { supabase } from '$lib/supabase';

    let { mode, senderWalletId, error, success, closeModal, senderId, wallets } = $props();

    let recipientWalletId = $state('')
    let amount = $state(0) 



  async function sendTokens() {
      error = ''
      success = ''
      console.log('Recipient Wallet ID:', recipientWalletId);
      console.log('Sender Wallet ID:', senderWalletId);
      console.log('Amount:', amount);
      console.log('Sender ID:', senderId);
  
      const { error: rpcError } = await supabase.rpc('send_scythes', {
        p_sender_wallet_id: senderWalletId,
        p_recipient_wallet_id: recipientWalletId,
        p_amount: parseFloat(amount),
        p_user_id: senderId

      })
  
      if (rpcError) {
        error = rpcError.message
      } else {
        success = 'Transferencia realizada con éxito.'
        setTimeout(() => {
          closeModal()
        }, 1000)
      }
    }

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

<div class="modal-footer">
  <button class="btn btn-secondary" onclick={closeModal}>Cerrar</button>
  {#if mode === 'enviar'}
    <button class="btn btn-primary" onclick={sendTokens}>Enviar</button>
  {/if}
</div>