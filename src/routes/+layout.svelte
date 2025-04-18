<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { onMount } from 'svelte'
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import { isPublicRoute, getCurrentPath } from '$lib/auth'

  let user = null
  let loading = true
  injectAnalytics()

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      user = session?.user || null
      
      const currentPath = getCurrentPath()
      if (!user && !isPublicRoute(currentPath)) {
      goto('/auth/login')
    }
    } catch (error) {
      console.error('Auth check error:', error)
    } finally {
      loading = false
  }
  }

  onMount(() => {
    checkAuth()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      user = session?.user || null
      
      const currentPath = getCurrentPath()
      if (!user && !isPublicRoute(currentPath)) {
        goto('/auth/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  })

  async function handleLogout() {
    try {
      loading = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      goto('/auth/login')
    } catch (error) {
      console.error('Error logging out:', error.message)
    } finally {
      loading = false
    }
  }
</script>

{#if loading}
  <div class="loading-container">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
{:else}
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <img src="/logo.png" alt="Logo" style="height: 80px;" />
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
{/if}

<style>
  :global(body) {
    background-color: #f8f9fa;
  }
  
  .navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  }
</style>