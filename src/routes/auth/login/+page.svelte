<script>
  import { supabase } from '$lib/supabase'
  
  let email = ''
  let loading = false
  let message = ''

  async function handleLogin() {
    try {
      loading = true
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/wallet`
        }
      })

      if (error) throw error
      message = 'Check your email for the login link!'
    } catch (error) {
      message = error.message
    } finally {
      loading = false
    }
  }
</script>


  
<div class="row justify-content-center">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card shadow">
      <div class="card-body">
        <h2 class="text-center mb-4">Login</h2>
        <form on:submit|preventDefault={handleLogin}>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              bind:value={email}
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Loading...' : 'Send Magic Link'}
          </button>
        </form>
        {#if message}
          <div class="alert alert-info mt-3">
            {message}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>