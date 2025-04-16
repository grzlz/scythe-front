<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'

  let user = null

  onMount(() => {
    // Get initial session
    const session = supabase.auth.getSession()
    console.log('Initial session:', session) // Add this line
      user = session?.user || null
      
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session) // Add this line
      user = session?.user || null
      
      // Redirect if not authenticated
      if (!user) {
        goto('/auth/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  })

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      goto('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }
</script>

<!-- Navbar will always show now, we'll handle visibility with proper styling -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <span class="navbar-brand">Mi Aplicación</span>
      <div class="ms-auto">
      {#if user}
        <button 
          class="btn btn-outline-danger" 
          on:click={handleLogout}
        >
          Cerrar sesión
        </button>

{/if}
    </div>
  </div>
</nav>

<main class="container mt-4">
  <slot />
</main>

<style>
  :global(body) {
    background-color: #f8f9fa;
  }
  
  .navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>