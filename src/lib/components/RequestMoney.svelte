<script>
  import { supabase } from '$lib/supabase'

  let amount = ''
  let requestFrom = ''
  let loading = false
  let error = null
  let success = null

  async function handleRequest() {
    try {
      loading = true
      error = null
      success = null

      // Add your request money logic here
      // This is a placeholder for the actual implementation
      const { data: session } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('No user session')

      // Example request creation
      const { error: reqError } = await supabase
        .from('money_requests')
        .insert({
          requester_id: session.user.id,
          requested_from_email: requestFrom,
          amount: parseFloat(amount),
          status: 'pending'
        })

      if (reqError) throw reqError

      success = 'Solicitud enviada exitosamente'
      amount = ''
      requestFrom = ''
    } catch (e) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Solicitar Dinero</h5>

    {#if error}
      <div class="alert alert-danger">{error}</div>
    {/if}

    {#if success}
      <div class="alert alert-success">{success}</div>
    {/if}

    <form on:submit|preventDefault={handleRequest}>
      <div class="mb-3">
        <label for="requestFrom" class="form-label">Email del pagador</label>
        <input
          type="email"
          class="form-control"
          id="requestFrom"
          bind:value={requestFrom}
          required
          disabled={loading}
        />
      </div>

      <div class="mb-3">
        <label for="amount" class="form-label">Monto</label>
        <input
          type="number"
          class="form-control"
          id="amount"
          bind:value={amount}
          min="0"
          step="0.01"
          required
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? 'Solicitando...' : 'Solicitar'}
      </button>
    </form>
  </div>
</div>