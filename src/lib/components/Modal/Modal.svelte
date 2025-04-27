<script>
    import { supabase } from '$lib/supabase'
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'
    import { cubicOut, cubicIn } from 'svelte/easing';
    import ModalHeader from './ModalHeader.svelte';
    import ModalBody from './ModalBody.svelte';

    let { mode, senderId, closeModal } = $props()

  
    let {
      senderWalletId = '', 
      error = '', 
      success = ''
    } = $state();

    onMount(async () => {
      const { data, error } = await supabase.from('wallets').select('wallet_id').eq('user_id', senderId).single();
      senderWalletId = data?.wallet_id || '';
      console.log('Sender Wallet ID:', senderWalletId);
  
    })
  

    const modalProps = { mode, closeModal };
  </script>
  

    <div class="modal show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}} >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg"
        in:fly={{ y: 200, duration: 300, easing: cubicOut }}
        out:fly={{ y: 200, duration: 300, easing: cubicIn }}

        > 
        <ModalHeader {...modalProps}  />
        <ModalBody {...modalProps} {error} {success} {senderWalletId} {senderId} />
        </div>
      </div>
    </div>
