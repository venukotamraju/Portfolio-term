import Link from 'next/link';

const Header = () => {
	return (
		<header className="bg-primary text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Venu Kotamraju</h1>
				<nav>
					<Link href="/" className="mx-2">Home</Link>
					<Link href="#projects" className="mx-2">Projects</Link>
					<Link href="#contact" className="mx-2">Contact</Link>
				</nav>
			</div>
		</header>
	)
}

export default Header;
