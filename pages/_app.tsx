import '../styles/globals.scss'
import Menu from "../components/Menu";
import App from '../components/App';
function MyApp({ Component, pageProps }) {
  
  return( 
  <div>
    <App />
    <Menu />
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
