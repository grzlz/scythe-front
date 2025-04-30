<script>
    import { onMount } from 'svelte';
  
    let proposals = $state([
      { id: 1, title: 'Mejorar sistema de votación', status: 'passed', created_at: '2025-04-28T10:00:00Z' },
      { id: 2, title: 'Agregar niveles de recompensa', status: 'failed', created_at: '2025-04-27T15:00:00Z' },
      { id: 3, title: 'Expandir acceso a nuevos devs', status: 'active', created_at: '2025-04-26T18:30:00Z' },
      { id: 4, title: 'Reducir tokens por bug', status: 'passed', created_at: '2025-04-25T09:45:00Z' },
      { id: 5, title: 'Aumentar frecuencia de reuniones', status: 'active', created_at: '2025-04-24T11:20:00Z' }
    ]);
  
    let stats = $state({
      total: proposals.length,
      approved: proposals.filter(p => p.status === 'passed').length,
      rejected: proposals.filter(p => p.status === 'failed').length,
      active: proposals.filter(p => p.status === 'active').length
    });
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
        <h5>Últimas Propuestas</h5>
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {#each proposals as p}
              <tr>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.status}</td>
                <td>{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  
    <div class="text-end mt-4">
      <button class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2 w-100">Proponer Iniciativa</button>
    </div>
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
  