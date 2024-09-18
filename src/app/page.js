import TerminalComponent from '../components/TerminalComponent'
export default function Home() {
  return (
    <main style={{ height: '100vh', margin:0, padding:0 }}>
	<h1 style={{ textAlign: 'center' }}>Welcome to My Portfolio</h1>
	  <div style={{height: 'calc(100vh - 60px)' }}>
	      <TerminalComponent />
	  </div>
    </main>
  );
}
