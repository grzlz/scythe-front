<script>
    let { mode, recipientEmail, amount, error, success } = $props();
</script>

<div class="modal-body">
    {#if mode === 'enviar'}
      <div class="mb-3">
        <label class="form-label" for="wallet_id">Correo del destinatario</label>
        <input type="email" class="form-control" bind:value={recipientEmail} />
      </div>
      <div class="mb-3">
        <label class="form-label" for="scythes">Cantidad</label>
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