<script>
    let {mode, closeModal, sendTokens} =$props()
</script>

<div class="modal-footer">
    <button class="btn btn-secondary" onclick={closeModal}>Cerrar</button>
    {#if mode === 'enviar'}
      <button class="btn btn-primary" onclick={sendTokens}>Enviar</button>
    {/if}
  </div>