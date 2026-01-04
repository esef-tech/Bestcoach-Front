
import './App.css';
import Navbar from './COMPONENTS/Navbar';
import Header from './COMPONENTS/HEADER/Header';
import Services from './COMPONENTS/SECTION/Services';
// import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar />
<section id="home"><Header /></section>
      <section id="services"><Services /></section>
    </div>
  );
}

export default App;
