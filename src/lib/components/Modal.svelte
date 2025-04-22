<script>
    import { supabase } from '$lib/supabase'
    import { goto } from '$app/navigation'
    import { fly, slide } from 'svelte/transition'
    import { expoOut } from 'svelte/easing';
  
    export let show = false
    export let mode = 'enviar'
    export let senderId
    export let closeModal = () => {}

    console.log(senderId)
  
    let recipientEmail = ''
    let amount = ''
    let error = ''
    let success = ''
  
    async function sendTokens() {
      error = ''
      success = ''
  
      if (!recipientEmail || !amount || isNaN(parseFloat(amount))) {
        error = 'Correo o cantidad inválidos.'
        return
      }
  
      const { error: rpcError } = await supabase.rpc('send_tokens', {
        sender_id: senderId,
        recipient_email: recipientEmail,
        amount: parseFloat(amount)
      })
  
      if (rpcError) {
        error = rpcError.message
      } else {
        success = 'Transferencia realizada con éxito.'
        setTimeout(() => {
          closeModal()
          goto('/wallet')
        }, 1000)
      }
    }
  </script>
  
  {#if show}
    <div class="modal fade show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg"
        in:fly={{y: 200, duration: 600 }}
        out:slide={{duration: 300, easing: expoOut }}
  
        > 
          <div class="modal-header">
            <h5 class="modal-title">
              {#if mode === 'enviar'}Enviar Scythes{/if}
              {#if mode === 'solicitar'}Solicitar Scythes{/if}
              {#if mode === 'historial'}Historial{/if}
            </h5>
            <button type="button" class="btn-close" aria-label="Close" on:click={closeModal}></button>
          </div>
  
          <div class="modal-body">
            {#if mode === 'enviar'}
              <div class="mb-3">
                <label class="form-label">Correo del destinatario</label>
                <input type="email" class="form-control" bind:value={recipientEmail} />
              </div>
              <div class="mb-3">
                <label class="form-label">Cantidad</label>
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
            <button class="btn btn-secondary" on:click={closeModal}>Cerrar</button>
            {#if mode === 'enviar'}
              <button class="btn btn-primary" on:click={sendTokens}>Enviar</button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
  