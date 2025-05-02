<script>
    import { supabase } from '$lib/supabase';// adjust to your setup
    let { onClose } = $props();
    import { fly } from 'svelte/transition'
    import { cubicOut, cubicIn } from 'svelte/easing';
  
    let proposalTitle = $state('');
    let proposalDesc = $state('');
    let proposalBurn = $state(1);
    let feedback = $state('');
    let submitting = $state(false);
    
    async function submitProposal() {
        console.log('Submitting proposal:', proposalTitle, proposalDesc, proposalBurn);
        submitting = true;
        feedback = '';
        
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
            feedback = 'Error: usuario no autenticado.';
            submitting = false;
            return;
        }
    
        const { error } = await supabase.rpc('submit_proposal', {
            p_user_id: userData.user.id,
            p_title: proposalTitle,
            p_description: proposalDesc,
            p_burned: proposalBurn
        });
    
        if (error) {
            feedback = `❌ ${error.message}`;
        } else {
            feedback = '✅ Propuesta enviada correctamente';
            proposalTitle = '';
            proposalDesc = '';
            proposalBurn = 1;
            onClose(); // close modal after success
        }
    
        submitting = false;
        }
  </script>
  
<div class="modal show d-block" tabindex="-1" role="dialog" style="background-color: rgba(0, 0, 0, 0.5);" transition:fly={{y: 200, duration: 300}} >
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content glassy p-4" 
    in:fly={{ y: 200, duration: 300, easing: cubicOut }}
    out:fly={{ y: 200, duration: 300, easing: cubicIn }}>
        <div class="modal-header">
        <h5 class="modal-title">Proponer iniciativa</h5>
        <button aria-label="Close" type="button" class="btn-close" onclick={onClose}></button>
        </div>
        <div class="modal-body">
        <div class="mb-3">
            <label class="form-label" for="title">Título</label>
            <input class="form-control" bind:value={proposalTitle} />
        </div>
        <div class="mb-3">
            <label class="form-label" for="description">Descripción</label>
            <textarea class="form-control" rows="4" bind:value={proposalDesc}></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label" for="scythes">Scythes a quemar</label>
            <input class="form-control" type="number" min="1" bind:value={proposalBurn} />
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn btn-secondary" onclick={onClose}>Cancelar</button>
            <button class="btn btn-primary" onclick={submitProposal} disabled={submitting}>Enviar</button>
        </div>
        {#if feedback}
            <p class="mt-3 text-center">{feedback}</p>
        {/if}
        </div>
    </div>
    </div>
</div>
