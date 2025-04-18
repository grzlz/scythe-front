<script>
  import SendMoney from '$lib/components/SendMoney.svelte'
  import RequestMoney from '$lib/components/RequestMoney.svelte'
</script>

<div class="row g-4">
  <div class="col-md-6">
    <SendMoney />
  </div>
  <div class="col-md-6">
    <RequestMoney />
  </div>
</div>

<style>
  .wallet-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .balance-card {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .balance-amount {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .action-buttons {
    margin-top: 2rem;
  }

  .action-buttons button {
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 12px;
    transition: transform 0.2s;
  }

  .action-buttons button:hover {
    transform: translateY(-2px);
  }
</style>