"use client"; // client side rendering

import { Terminal } from '@xterm/xterm';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef } from 'react';

const TerminalComponent = () => {
	const terminalRef = useRef(null);

	useEffect(() => {
		const term = new Terminal({
			cursorBlink: true,
		});

		// Add addons to the terminal
		term.loadAddon(new WebLinksAddon());

		// Open the terminal into the referenced div
		term.open(terminalRef.current);

		// ASCII text before the starting line
		const asciiText =``
		term.write('\n' + asciiText + '\r\n')

		// Starting Line
		term.write('Welcome to my portfolio!\r\nType "help" for a list of available commands\r\n> ');

		// Handle terminal input
		handleTerminalInput(term);

		// Cleanup function
		/* The terminal instance remains active even when the component unmounts. So a cleanup function is returned to dispose of the terminal when the component is unmounted. useEffect only runs when the components are mounted and reloads upon the dependent changes. But even before the component is mounted and while is being rendered, a terminal instance runs which is left undisposed even when the mounting and rendering is complete which leaves us with two terminal instances running. So we need to make sure the terminal instance runs only for the mounted component. */
		return () => {
			term.dispose();
		};
	}, []);

	const handleTerminalInput = (term) => {
		// To store the input
		let  input = '';

		// Event Listener included with the terminal instance
		term.onKey(({ key, domEvent }) => {
			if (domEvent.key === 'Enter') {
				// For 'Enter' key, process the input as command
				processCommand(input.trim(), term);
				
				// Clear the input after processing
				input = '';
			} else if (domEvent.key === 'Backspace') {
				// handle 'Backspace': remove the last character from the input and update terminal
				if (input.length > 0) {
					// Remove the last character visually
					term.write('\b \b');

					// Update the input state
					input = input.slice(0, -1);
				}
			} else if (domEvent.key.length === 1) {
				// Add regular characters to the input buffer
				input += key;

				// Display character in the terminal
				term.write(key);
			}
		});
	};

	// Array and Object to structure details for projects
	const projects = [
		{
			name: 'Employee registration',
			description: 'A PERN application with modern architecture and secure APIs enabling registration and logging in of employees',
			url: 'https://github.com/venukotamraju/emrefx1'
		},
		{
			name: 'Infoshow',
			description: 'Browse T.V shows and get their info.',
			url: 'https://github.com/venukotamraju/infoshow'
		},
		{
			name: 'Currency Exchange',
			description: 'An implementation of global currency exchange units. Know what your global currency units values interms of your chosen currency.',
			url: 'https://github.com/venukotamraju/currencyExchange'
		},
		{
			name: 'Portfolio-term',
			description: 'This terminal-based interactive portfolio',
			url: 'You are at it!'
		},
	]

	// Function to process commands
	const processCommand = (command, term) => {
		// Move to a new line before output
		term.write('\r\n');
		switch (command) {
			case 'help':
				term.write('Available commands:\r\n');
				term.write(' - help: List available commands\r\n');
				term.write(' - projects: Show my projects\r\n');
				term.write(' - resume: Download my resume\r\n');
				term.write(' - contact: Show contact info\r\n');
				break;
			case 'projects':
				term.write('Here are some of my projects:\r\n');
				projects.forEach((project, index) => {
					term.write(` ${index +1 }. ${project.name} - ${project.description}\r\n visit: ${project.url}\r\n`);
				})
				break;
			case 'resume':
				// Generate the full url so the link will be clickable
				term.write(`You can download my resume here: ${window.location.origin}/venu_working.pdf\r\n`);
				break;
			case 'contact':
				term.write('Contact Info:\r\n');
				term.write(' - Email: kotamraju.venugopal@gmail.com\r\n');
				term.write(' - LinkedIn: https://www.linkedin.com/in/venukotamraju/\r\n');
				term.write(' - Github: https://github.com/venukotamraju\r\n')
				break;
			default:
				term.write(`Unknown command: ${command}\r\n`);
				break;
		}
		// Display the prompt again after execution
		term.write('> ');
	}

	return <div ref={terminalRef} style={{width: '100%', height: '100%'}} />;
};

export default TerminalComponent;
