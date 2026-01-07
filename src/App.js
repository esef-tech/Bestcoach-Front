
import './App.css';
import Navbar from './COMPONENTS/Navbar';
import Header from './COMPONENTS/HEADER/Header';
import Services from './COMPONENTS/SECTION/Services';
import Programs from './COMPONENTS/PROGRAMS/Programs';
import Register from './COMPONENTS/REGISTER/Register';
import Team from './COMPONENTS/TEAM/Team';
import Footer from './COMPONENTS/FOOTER/Footer';
import AIAgent from './COMPONENTS/AIAgent';
// import { Container } from 'react-bootstrap';

function App() {
  return (
    <><div className="App">
      <Navbar />
      <section id="home"><Header /></section>
      <section id="services"><Services /></section>
      <hr className="section-divider" />
      <section id="programs"><Programs /></section>
      <hr className="section-divider" />
      <hr className="section-divider" />
      <Register />
      <hr className="section-divider" />
      <section id="team"><Team /></section>
      <Footer />
    </div><AIAgent /></>
  );
}

export default App;
