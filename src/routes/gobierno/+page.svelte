<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import ProposalModal from '$lib/components/ProposalModal/ProposalModal.svelte';
    import ProposalDetailsModal from '$lib/components/ProposalDetailsModal/ProposalDetailsModal.svelte';
  
    let proposals = $state([]);
    let selectedProposal = $state(null);
    let showDetailsModal = $state(false);

    function openProposalDetails(proposal) {
        selectedProposal = proposal;
        showDetailsModal = true;
    }

    function closeDetailsModal() {
        showDetailsModal = false;
        selectedProposal = null;
    }
  
    let stats = $derived({
        total: proposals.length,
        approved: proposals.filter(p => p.status === 'Aprobada').length,
        rejected: proposals.filter(p => p.status === 'Rechazada').length,
        active: proposals.filter(p => p.status === 'Activa').length
    });

    let showCreateModal = $state(false);


    onMount(async () => {
        await fetchProposals();

        const channel = supabase
            .channel('proposals-changes')
            .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'proposals'
            }, payload => {
            fetchProposals();
            })
            .subscribe();
    });


  async function fetchProposals() {
    const { data: proposalData, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching proposals:', error);
    } else {
      proposals = proposalData;
    }
  }
  </script>


  
  <div class="container mt-5">
    <div class="row text-center g-4">
      <div class="col-md-3">
        <div class="card glassy p-3">
          <div class="card-body">
            <h5>Propuestas</h5>
            <h2>{stats.total}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card glassy p-3">
          <div class="card-body">
            <h5>Aprobadas</h5>
            <h2>{stats.approved}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card glassy p-3">
          <div class="card-body">
            <h5>Rechazadas</h5>
            <h2>{stats.rejected}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card glassy p-3">
          <div class="card-body">
            <h5>En Progreso</h5>
            <h2>{stats.active}</h2>
          </div>
        </div>
      </div>
    </div>
  
    <div class="card glassy p-4 mt-5">
        <div class="card-body">
          <h5>Propuestas recientes</h5>
      
          <!-- Vista tabla para desktop -->
          <div class="table-responsive d-none d-md-block">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Votos a favor</th>
                  <th>Votos en contra</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {#each proposals as p}
                  <tr onclick={() => openProposalDetails(p)} style="cursor: pointer;">
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.votes_for}</td>
                    <td>{p.votes_against}</td>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
      
          <!-- Vista tarjetas para mobile -->
          <div class="d-md-none">
            {#each proposals as p}
              <div class="card mb-3">
                <div class="card-body">
                  <div><strong>ID:</strong> {p.id}</div>
                  <div><strong>Título:</strong> {p.title}</div>
                  <div><strong>Estado:</strong> {p.status}</div>
                  <div><strong>Votos a favor:</strong> {p.votes_for}</div>
                  <div><strong>Votos en contra:</strong> {p.votes_against}</div>
                  <div><strong>Fecha:</strong> {new Date(p.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    
    {#if showDetailsModal}
	    <ProposalDetailsModal proposal={selectedProposal} onClose={closeDetailsModal} />
    {/if}
    
    <div class="text-end mt-4">
        <button class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 w-100"  onclick={() => showCreateModal = true}>Proponer iniciativa</button>
        <button class="mt-2 btn btn-dark btn-lg d-flex align-items-center justify-content-center gap-2 w-100">Votar</button>
    </div>
    {#if showCreateModal}
        <ProposalModal show={showCreateModal} onClose={() => showCreateModal = false} />
    {/if}
</div>

  <style>
    .glassy {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
    }
  
    h5 {
      font-weight: 600;
      letter-spacing: 0.5px;
    }
  
    h2, h1 {
      font-weight: bold;
      color: #007BFF;
      margin-top: 0.5rem;
    }
  
    table th {
      background-color: rgba(255, 255, 255, 0.1);
    }
  
    table td, table th {
      color: #333;
    }
  
    .badge {
      font-size: 0.9rem;
    }
  </style>
  