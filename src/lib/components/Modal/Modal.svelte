<script>
    import { supabase } from '$lib/supabase'
    import { goto } from '$app/navigation'
    import { fly } from 'svelte/transition'
    import { cubicOut, cubicIn } from 'svelte/easing';
    import ModalHeader from './ModalHeader.svelte';
    import ModalBody from './ModalBody.svelte';
    import ModalFooter from './ModalFooter.svelte';

    let { mode, senderId, closeModal } = $props()

    console.log(senderId)
  
    let recipientUserName = ''
    let amount = ''
    let error = ''
    let success = ''
  
    async function sendTokens() {
      error = ''
      success = ''
  
      if (!recipientUserName || !amount || isNaN(parseFloat(amount))) {
        error = 'Correo o cantidad inválidos.'
        return
      }
  
      const { error: rpcError } = await supabase.rpc('send_tokens', {
        sender_id: senderId,
        recipient_user_name: recipientUserName,
        amount: parseFloat(amount)
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

    const modalProps = { mode, closeModal };
  </script>
  

    <div class="modal show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}} >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg"
        in:fly={{ y: 200, duration: 300, easing: cubicOut }}
        out:fly={{ y: 200, duration: 300, easing: cubicIn }}

        > 
        <ModalHeader {...modalProps}  />
          <ModalBody {...modalProps} {recipientUserName} {amount} {error} {success} />
        <ModalFooter {...modalProps} {sendTokens} />
        </div>
      </div>
    </div>
