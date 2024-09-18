const Contact = () => {
	return (
		<section id="contact" className="py-10">
		<h2 className="text-3xl text-center font-bold">Contact</h2>
		<form className="max-w-lg mx-auto mt-6">
			<input type="text" placeholder="venukotamraju" className="block w-full p-2 mb-4 border rounded" />
			<input type="email" placeholder="kotamraju.venugopal@gmail.com" className="block w-full p-2 mb-4 border rounded" />
        <textarea placeholder="Your Message" className="block w-full p-2 mb-4 border rounded" rows={4} />
        <button type="submit" className="w-full bg-primary text-white p-2 rounded">Send</button>
		</form>
		</section>
	)
}

export default Contact;
