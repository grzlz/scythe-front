// Helper function to check if a route is public
export function isPublicRoute(path) {
    // Routes that don't require authentication
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/about'
    ]
    
    return publicRoutes.some(route => path.startsWith(route))
  }
  
  // Helper to get the current path from URL
  export function getCurrentPath() {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return ''
  }