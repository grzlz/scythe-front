<script>
    import { supabase } from '$lib/supabase'
    import { goto } from '$app/navigation'
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'
    import { cubicOut, cubicIn } from 'svelte/easing';
    import ModalHeader from './ModalHeader.svelte';
    import ModalBody from './ModalBody.svelte';
    import ModalFooter from './ModalFooter.svelte';

    let { mode, senderId, closeModal } = $props()

    console.log('Este es el sender id', senderId)
  
    let recipientWalletId = ''
    let senderWalletId = ''
    let amount = ''
    let error = ''
    let success = ''

    onMount(async () => {
      const { data, error } = await supabase.from('wallets').select('wallet_id').eq('user_id', senderId).single();
      senderWalletId = data?.wallet_id || '';
      console.log('Sender Wallet ID:', senderWalletId);
  
    })
  
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

    const modalProps = { mode, closeModal };
  </script>
  

    <div class="modal show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}} >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg"
        in:fly={{ y: 200, duration: 300, easing: cubicOut }}
        out:fly={{ y: 200, duration: 300, easing: cubicIn }}

        > 
        <ModalHeader {...modalProps}  />
          <ModalBody {...modalProps} {recipientWalletId} {amount} {error} {success}/>
        <ModalFooter {...modalProps} {sendTokens} />
        </div>
      </div>
    </div>
