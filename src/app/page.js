import dynamic from 'next/dynamic'
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroImage from '@/components/HeroImage';


const TerminalComponent = dynamic(() => import ('../components/TerminalComponent'), {
	ssr: false
})

export default function Home() {
  return (
	  <div>
	  <Header />
	  <main className="container my-auto mx-auto overflow-x-hidden">
	  <HeroImage />
	  <TerminalComponent />
	  </main>
	  <Footer />
	  </div>
  );
}
