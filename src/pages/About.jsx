import { Link } from '../Link'

export default function AboutPage() {
    return (
      <>
        <h1>About</h1>
        <div>
          <img src='https://pbs.twimg.com/profile_images/1613453767164264448/bnMOwM_g_400x400.jpg'
            alt='Foto de mery' />
          <p>Hola! Me llamo Mery y estoy creando un clon de React Router</p>
        </div>
        <Link to='/'>Ir a la home</Link>
      </>
    )
  }