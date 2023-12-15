import { lazy, Suspense } from 'react'
import './App.css'

import { Router } from './Router'
import { Route } from './Route'

// ---- imports estáticos ----
// (se cargan todos desde el inicio)

/* 
  import HomePage from './pages/Home'
  import AboutPage from './pages/About'
  import Page404 from './pages/404'
  import SearchPage from './pages/Search'
*/

// ---- imports dinámicos ----
// (se van cargando según se necesitan para renderizar)

const LazyAboutPage = lazy(() => import ('./pages/About.jsx'))
const LazyHomePage = lazy(() => import ('./pages/Home.jsx'))
const LazyPage404 = lazy(() => import ('./pages/404.jsx'))
const LazySearchPage = lazy(() => import ('./pages/Search.jsx'))

const appRoutes = [
  {
    path: '/search/:query', // ruta dinámica
    Component: LazySearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes = { appRoutes } defaultComponent={LazyPage404}>
          <Route path = '/' Component={LazyHomePage} />
          <Route path = '/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
