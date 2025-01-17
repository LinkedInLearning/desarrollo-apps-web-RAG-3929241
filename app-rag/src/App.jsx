
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/NavBar';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>

      <div className='container-fluid'>

        <Header />
        <Navbar />
        <div className="container">
          <AppRoutes />
        </div>
        <Footer />

      </div>
    </>
  )
}

export default App
