<script>
  import { supabase } from '$lib/supabase'
  
  let email = ''
  let loading = false
  let error = null
  let successMessage = null

  async function handleLogin() {
    try {
      loading = true
      error = null
      successMessage = null
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: 'https://scythe-theta.vercel.app/wallet'
        }
      })

      if (authError) throw authError
      successMessage = 'Se ha enviado un enlace de acceso a tu correo electrónico'
    } catch (e) {
      error = e.message
    } finally {
      loading = false
    }
  }
</script>

<div class="container mt-5">
<div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
    <div class="card shadow">
      <div class="card-body">
          <h2 class="text-center mb-4">Iniciar Sesión</h2>
          
          {#if error}
            <div class="alert alert-danger">{error}</div>
        {/if}

          {#if successMessage}
            <div class="alert alert-success">{successMessage}</div>
          {/if}

          <form on:submit|preventDefault={handleLogin}>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                bind:value={email}
                required
                disabled={loading}
              />
      </div>

            <button
              type="submit"
              class="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Enviando enlace...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div class="mt-3 text-center">
            <a href="/auth/register">¿No tienes cuenta? Regístrate</a>
    </div>
  </div>
</div>
    </div>
  </div>
</div>