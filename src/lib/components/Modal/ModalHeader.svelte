<script>
    let { mode, closeModal } = $props()

</script>

<div class="modal-header">
    <h5 class="modal-title">
      {#if mode === 'enviar'}Holaaaaa{/if}
      {#if mode === 'solicitar'}Solicitar Scythes{/if}
      {#if mode === 'historial'}Historial{/if}
    </h5>
    <button type="button" class="btn-close" aria-label="Close" onclick={closeModal}></button>
  </div>