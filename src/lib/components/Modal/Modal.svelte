<script>
    import { fly } from 'svelte/transition'
    import { cubicOut, cubicIn } from 'svelte/easing';
    import ModalHeader from './ModalHeader.svelte';
    import ModalBody from './ModalBody.svelte';
    
    let error = $state('')
    let success = $state('') 

    let { mode, senderId, closeModal, senderWalletId, wallets, fetchBalance } = $props()

  

    const modalProps = { mode, closeModal };
  </script>
  

    <div class="modal show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}} >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg" 
        in:fly={{ y: 200, duration: 300, easing: cubicOut }}
        out:fly={{ y: 200, duration: 300, easing: cubicIn }}
        > 
        <ModalHeader {...modalProps}  />
        <ModalBody {...modalProps} {error} {success} {senderWalletId} {senderId} {wallets} {fetchBalance} />
        </div>
      </div>
    </div>
