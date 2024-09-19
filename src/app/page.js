import dynamic from 'next/dynamic'
import Header from '../components/Header';
import Footer from '../components/Footer';

const TerminalComponent = dynamic(() => import ('../components/TerminalComponent'), {
	ssr: false
})

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
