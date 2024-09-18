import TerminalComponent from '../components/TerminalComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
	  <div>
	  <Header />
	  <main className="container mx-auto">
	  <h1 className="text-5xl text-center font-bold mt-10">Welcome to My Portfolio</h1>
	  <TerminalComponent />
	  </main>
	  <Footer />
	  </div>
  );
}
