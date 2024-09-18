const Projects = () => {
	const projectList = [
		{
			title: 'InfoShow',
			description: 'An API utilisation platfor to search and know about T.V shows.',
		}
	];

	return (
		<section id="projects" className="py-10">
		<h2 className="text-3xl text-center font-bold">Projects</h2>
		<div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
		{
			projectList.map((project, index) => (
				<div key={index} className="bg-white p-4 rounded-lg shadow-md">
				<h3 className="font-bold text-xl">{project.title}</h3>
				<p>{project.description}</p>
				</div>
				)
			)
		}
		</div>
		</section>
	);
};


export default Projects;
