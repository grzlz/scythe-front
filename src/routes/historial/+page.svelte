<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { supabase } from '$lib/supabase';
    let { transactions, governance } = $props();
  
    let stats = $state({
      totalHolders: 0,
      totalMinted: 0,
      totalBurned: 0,
      circulatingSupply: 0,
      avgScythesPerDev: 0,
      votingParticipationRate: '68%',
      personalBalance: 0
    });

    let userWalletId = '';
  
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
    let donutChart;
    let barChart;
  
    let balancePercentage = $derived(((stats.personalBalance / stats.circulatingSupply) * 100).toFixed(2));
  
    function filteredTransactions() {
      if (filterType === 'All') return transactions;
      return transactions.filter(t => t.type === filterType);
    }
  
    onMount(async() => {
        const { data } = await supabase.from('scythe_stats').select('*').single();
        stats.totalHolders = data.total_holders;
        stats.totalMinted = data.total_minted;
        stats.circulatingSupply = data.circulating_supply;
        stats.avgScythesPerDev = Math.round(data.avg_scythes_per_dev);

        const balanceResult = await fetchBalanceAndWalletId();

        stats.personalBalance = balanceResult.balance;
        userWalletId = balanceResult.walletId;

        const { data: walletList } = await supabase.from('wallets').select('wallet_id, balance').gt('balance', 0);
        
        const donutCtx = document.getElementById('tokenChart');
        const walletLabels = walletList.map(wallet => wallet.wallet_id);
        const walletBalances = walletList.map(wallet => wallet.balance);

        donutChart = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                labels: walletLabels,
                datasets: [{
                    label: 'Cantidad de scythes:',
                    data: walletBalances,
                    backgroundColor: walletLabels.map((_, idx) => `hsl(${idx * 50}, 70%, 60%)`),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#333'
                        }
                    }
                }
            }
        });

        const sorted = [...walletList].sort((a, b) => b.balance - a.balance);
        const userIndex = sorted.findIndex(w => w.wallet_id === userWalletId);
        const start = Math.max(0, userIndex - 5);
        const end = userIndex + 6;
        const nearby = sorted.slice(start, end);

        const barLabels = nearby.map(w => w.wallet_id === userWalletId ? 'You' : w.wallet_id.slice(0, 8) + '...');
        const barData = nearby.map(w => Number(w.balance));
            
        const barCtx = document.getElementById('holdersChart');
        barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
            labels: barLabels,
            datasets: [{
                label: 'Scythes:',
                data: barData,
                backgroundColor: barLabels.map(label =>
                    label === 'You' ? 'rgba(0, 123, 255, 0.7)' : 'rgba(153, 102, 255, 0.7)'
                ),
                borderWidth: 1
            }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { 
                        display: false 
                    }
                },
                scales: {
                    y: {
                        ticks: { color: '#333' },
                        beginAtZero: true
                    },
                    x: {
                        ticks: { color: '#333' }
                    }
                    }
                }
            });
        });

    async function fetchBalanceAndWalletId() {
        const { data: userData , error: walletError } = await supabase.auth.getUser();

        let user = userData?.user;
        console.log('User:', user);
        
        const { data: walletData, error } = await supabase
            .from('wallets')
            .select('balance, wallet_id')
            .eq('user_id', user.id)
            .single();

        if(!walletData) {
            console.error('Error fetching balance:', error);
            stats.personalBalance = 0;
        } else {
            return {
                balance: walletData.balance ?? 0,
                walletId: walletData.wallet_id ?? ''
            } 
        }
    }
  </script>
  
  <div class="container mt-4">
    <div class="row text-center g-4">
      <div class="col-md-3"><div class="card glassy p-3"><div class="card-body"><h5>Total Holders</h5><h2>{stats.totalHolders}</h2></div></div></div>
      <div class="col-md-3"><div class="card glassy p-3"><div class="card-body"><h5>Total Minted</h5><h2>{stats.totalMinted} ⚔️</h2></div></div></div>
      <div class="col-md-3"><div class="card glassy p-3"><div class="card-body"><h5>Total Burned</h5><h2>{stats.totalBurned} 🔥</h2></div></div></div>
      <div class="col-md-3"><div class="card glassy p-3"><div class="card-body"><h5>Circulating</h5><h2>{stats.circulatingSupply} 🌀</h2></div></div></div>
    </div>
  
    <div class="row my-5 g-4">
      <div class="col-md-6">
        <div class="card glassy p-4 h-100">
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <h5>Token Distribution</h5>
            <canvas id="tokenChart" style="max-width: 100%; height: 250px;"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card glassy p-4 h-100">
          <div class="card-body text-center">
            <h5>Your Balance</h5>
            <h1 class="text-primary">{balancePercentage}%</h1>
            <p class="lead">{stats.personalBalance} Scythes</p>
            <h5 class="mt-4">Nearby Holders</h5>
            <canvas id="holdersChart" style="max-width: 100%; height: 250px;"></canvas>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row text-center g-4">
      <div class="col-md-6">
        <div class="card glassy p-3"><div class="card-body">
          <h5>Avg Scythes/Dev</h5><h2>{stats.avgScythesPerDev}</h2>
        </div></div>
      </div>
      <div class="col-md-6">
        <div class="card glassy p-3"><div class="card-body">
          <h5>Voting Participation</h5><h2>{stats.votingParticipationRate}</h2>
        </div></div>
      </div>
    </div>
  
    <div class="row my-5">
      <div class="col-12">
        <div class="card glassy p-4">
          <div class="card-body">
            <h5>Recent Governance Actions</h5>
            <ul class="list-group list-group-flush">
              {#each governance as action}
                <li class="list-group-item glassy d-flex justify-content-between align-items-center">
                  {action.title}
                  <span class="badge bg-primary rounded-pill">{action.result} ({action.participation})</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row mb-5">
      <div class="col-12">
        <div class="card glassy p-4">
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
            <table class="table table-hover align-middle">
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