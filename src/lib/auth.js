// Helper function to check if a route is public
export function isPublicRoute(path) {
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/about',
      '/historial',
      '/gobierno',
      '/mercado'
    ]
    
    return publicRoutes.some(route => path.startsWith(route))
  }
  
  export function getCurrentPath() {
    if (typeof window !== 'undefined') {
      return window.location.pathname
    }
    return ''
  }