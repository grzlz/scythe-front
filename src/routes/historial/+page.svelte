<script>
    // Props to inject real data later
    let { stats, transactions, governance } = $props();
  
    // Mockup Data
    stats = {
      totalHolders: 124,
      totalMinted: 56000,
      totalBurned: 3000,
      circulatingSupply: 53000,
      avgScythesPerDev: 427,
      votingParticipationRate: '68%'
    };
  
    transactions = [
      { date: '2025-04-25', type: 'Mint', amount: 100, actor: 'dev1', details: 'Completed task #101' },
      { date: '2025-04-26', type: 'Transfer', amount: 50, actor: 'dev2 -> dev3', details: 'Peer bonus' },
      { date: '2025-04-26', type: 'Burn', amount: 10, actor: 'system', details: 'Penalty' },
      { date: '2025-04-27', type: 'Governance', amount: 500, actor: 'dev4', details: 'Voted on proposal #5' }
    ];
  
    governance = [
      { title: 'Proposal #5: Increase Mint Rate', result: 'Passed', participation: '72%' },
      { title: 'Proposal #4: New Reward Tier', result: 'Failed', participation: '60%' }
    ];
  
    let filterType = $state('All');
  
    function filteredTransactions() {
      if (filterType === 'All') return transactions;
      return transactions.filter(t => t.type === filterType);
    }
  </script>
  
  <div class="container mt-4">
    <div class="row text-center">
      <div class="col-md-3 mb-3"><div class="card"><div class="card-body"><h5>Total Holders</h5><p>{stats.totalHolders}</p></div></div></div>
      <div class="col-md-3 mb-3"><div class="card"><div class="card-body"><h5>Total Minted</h5><p>{stats.totalMinted} ⚔️</p></div></div></div>
      <div class="col-md-3 mb-3"><div class="card"><div class="card-body"><h5>Total Burned</h5><p>{stats.totalBurned} 🔥</p></div></div></div>
      <div class="col-md-3 mb-3"><div class="card"><div class="card-body"><h5>Circulating</h5><p>{stats.circulatingSupply} 🌀</p></div></div></div>
    </div>
  
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5>Token Distribution</h5>
            <p><em>[Pie Chart Placeholder]</em></p>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="card"><div class="card-body">
          <h5>Avg Scythes/Dev</h5><p>{stats.avgScythesPerDev}</p>
        </div></div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card"><div class="card-body">
          <h5>Voting Participation</h5><p>{stats.votingParticipationRate}</p>
        </div></div>
      </div>
    </div>
  
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5>Recent Governance Actions</h5>
            <ul class="list-group">
              {#each governance as action}
                <li class="list-group-item d-flex justify-content-between">
                  <span>{action.title}</span>
                  <span>{action.result} ({action.participation})</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h5>Detailed Transaction History</h5>
            <div class="d-flex mb-3">
              <select class="form-select w-auto" bind:value={filterType}>
                <option>All</option>
                <option>Mint</option>
                <option>Transfer</option>
                <option>Burn</option>
                <option>Governance</option>
              </select>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Actor(s)</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {#each filteredTransactions() as tx}
                  <tr>
                    <td>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.actor}</td>
                    <td>{tx.details}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    h5 {
      font-weight: bold;
    }
  </style>
  