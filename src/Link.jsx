import { EVENTS, BUTTONS } from './consts.js'

export function navigate (href) {

    // cambiamos la url 
    window.history.pushState({},'',href)
  
    // crear un evento personalizado para avisar de que hemos cambiado la url
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
  
    window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ... props }){

    const handleClick = (event) => {

        const isMainEvent = event.button === BUTTONS.primary // boton principal
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // evento modificado
        const isManageableEvent = target === undefined || target === '_self'

        if ( isMainEvent && isManageableEvent && !isModifiedEvent){
            
            // ignoramos el comportamiento por defecto (volver a cargarlo todo)
            event.preventDefault()
            navigate(to) // navegación con SPA
            window.scrollTo(0,0)
        }

    }

    return <a onClick={handleClick} href={to} target={target} {... props} />
}