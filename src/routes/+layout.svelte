<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'
  import { navigation } from '$app/stores'

  let user = null
  let isInitialized = false // Use this instead of isLoading

  onMount(async () => {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      user = session?.user || null

    // Initial redirect if needed
      if (!user && !window.location.pathname.includes('/auth')) {
      await goto('/auth/register')
        }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      user = session?.user || null
      
      // Redirect if not authenticated
      if (!user && !window.location.pathname.includes('/auth')) {
        goto('/auth/register')
      }
  })

    isInitialized = true // Mark as initialized after initial check

    return () => {
      subscription.unsubscribe()
    }
  })

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      goto('/auth/register')
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }
</script>

{#if !isInitialized}
  <!-- Show nothing while initializing to prevent flash -->
{:else}
  {#if user && !window.location.pathname.includes('/auth')}
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a href="/" class="navbar-brand">Mi Aplicación</a>
      <div class="ms-auto">
          <div class="d-flex align-items-center">
            <span class="me-3">{user.email}</span>
            <button 
              class="btn btn-outline-danger" 
              on:click={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  {/if}
<main class="container mt-4">
  <slot />
</main>
{/if}

<style>
  :global(body) {
    background-color: #f8f9fa;
  }
  
  .navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>