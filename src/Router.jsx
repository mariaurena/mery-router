import { EVENTS } from "./consts"
import { useEffect, useState, Children } from "react"
import { match } from 'path-to-regexp'
import { getCurrentPath } from "./utils"


export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }){
    const [currentPath, setCurrentPath] = useState(getCurrentPath)

    useEffect(() => {
  
      // ---- escuchamos cuando cambia la URL ----
  
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath)
      }
  
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
  
      // para la navegación con el botón de atras
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
  
        // ---- limpiamos los eventos ----
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
  
      }
  
    }, []) // solo se ejecuta la primera vez

    let routeParams = {}

    // añadimos las rutas que vienen del componente children <Route />
    // (si queremos ver lo que estamos mapeando hacer console.log(children))
    const routesFromChildren = Children.map(children, ({ props, type }) => {
      const { name } = type
      const isRoute = name == 'Route'

      return isRoute ? props : null
    })

    // console.log(routesFromChildren)
    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)
  
    // buscamos en routes la ruta cuyo path sea igual al path actual y sacamos el Component 
    const Page = routesToUse.find(({ path }) => {

        if (path === currentPath) return true

        // usamos path-to-regexp para poder detectar rutas dinámicas
        // como por ejemplo: /search/:query

        const matcherUrl = match(path,{ decode: decodeURIComponent }) // devuelve una función
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        // guardamos los parámetros de la url que eran dinámicos
        // por ejemplo, si la ruta es /search/javascript
        // matched.params.query === 'javascript'
        routeParams = matched.params 
        return true

    })?.Component
    
    return Page 
        ? <Page routeParams={routeParams} /> 
        : <DefaultComponent routeParams={routeParams} />
  }