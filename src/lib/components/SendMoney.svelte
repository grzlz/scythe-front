<script>
  import { supabase } from '$lib/supabase'

  let amount = ''
  let recipient = ''
  let loading = false
  let error = null
  let success = null

  async function handleSend() {
    try {
      loading = true
      error = null
      success = null

      // Add your send money logic here
      // This is a placeholder for the actual implementation
      const { data: session } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('No user session')

      // Example transaction creation
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          sender_id: session.user.id,
          recipient_email: recipient,
          amount: parseFloat(amount),
          type: 'send'
        })

      if (txError) throw txError

      success = 'Dinero enviado exitosamente'
      amount = ''
      recipient = ''
    } catch (e) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

<div class="card">
  <div class="card-body">
    <h5 class="card-title">Enviar Dinero</h5>

    {#if error}
      <div class="alert alert-danger">{error}</div>
    {/if}

    {#if success}
      <div class="alert alert-success">{success}</div>
    {/if}

    <form on:submit|preventDefault={handleSend}>
      <div class="mb-3">
        <label for="recipient" class="form-label">Email del destinatario</label>
        <input
          type="email"
          class="form-control"
          id="recipient"
          bind:value={recipient}
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
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  </div>
</div>