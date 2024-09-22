"use client"; // client side rendering

import { Terminal } from '@xterm/xterm';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { useEffect, useRef, useState } from 'react';
import { comma } from 'postcss/lib/list';

const TerminalComponent = () => {
	const terminalRef = useRef(null);
	const terminalInstance = useRef(null);

	// Using a ref to store the historyIndex and commandHistory locally
	const commandHistoryRef = useRef([]);
	const historyIndexRef = useRef(-1);

	useEffect(() => {
		if (typeof window !== 'undefined') {

			// Delay terminal initialization to make sure the dom is ready
			const initializeTerminal = () => {
				if (terminalRef.current && !terminalInstance.current) {
					const term = new Terminal({
						cursorBlink: true,
						fontFamily: `'Fira Mono', monospace`,
						fontSize: 15,
					});

					// Add addons to the terminal
					term.loadAddon(new WebLinksAddon());
					const fitAddon = new FitAddon();
					term.loadAddon(fitAddon);

					// Open the terminal into the referenced div
					term.open(terminalRef.current);

					// Focus the terminal on load to make it interactive
					term.focus();

					// Apply the fit add on
					fitAddon.activate(term);
					fitAddon.fit();

					// Starting Line
					term.write('Welcome to my portfolio!\r\nType "help" for a list of available commands\r\n> ');

					terminalInstance.current = term;

					// Handle terminal input
					handleTerminalInput(term);

					// Event listeners for focusing terminal in touch or click
					const handleTouchOrClick = () => {
						term.focus();
					};

					terminalRef.current.addEventListener('touchstart', handleTouchOrClick);
					terminalRef.current.addEventListener('click', handleTouchOrClick);

					// Cleanup function
					/* The terminal instance remains active even when the component unmounts. So a cleanup function is returned to dispose of the terminal when the component is unmounted. useEffect only runs when the components are mounted and reloads upon the dependent changes. But even before the component is mounted and while is being rendered, a terminal instance runs which is left undisposed even when the mounting and rendering is complete which leaves us with two terminal instances running. So we need to make sure the terminal instance runs only for the mounted component. */
					return () => {
						terminalRef.current.removeEventListener('touchstart', handleTouchOrClick);
						terminalRef.current.removeEventListener('click', handleTouchOrClick);
						term.dispose();
					};
				}
			};

			const animationFrameId = requestAnimationFrame(initializeTerminal);

			// Cleanup timeout on component unmount
			return () => {
				cancelAnimationFrame(animationFrameId);
				if (terminalInstance.current) {
					terminalInstance.current.dispose();
					terminalInstance.current = null;
				}
			};
		}
	}, []);

	// Function to handle terminal input with onData event listener
	const handleTerminalInput = (term) => {
		let input = '';

		term.onData((data) => {

			// 'data' contains the character that was input
			const char = data;

			if (char === '\r') {
				// Enter key
				if (input.trim() !== '') {

					// Update ref with latest history
					commandHistoryRef.current = [...commandHistoryRef.current, input];

					// Reset history index after input is submitted
					historyIndexRef.current = -1;
					console.log(commandHistoryRef.current)
				}
				processCommand(input.trim(), term);

				// Clear input after processing
				input = '';
			} else if (char === '\u007F') {
				// Backspace character
				if (input.length > 0) {
					term.write('\b \b');
					input = input.slice(0, -1);
				}
			} else if (char === '\x1B[A') {
				console.log("Up arrow is pressed")
				// Up arrow (ANSI escape code for up)
				if (commandHistoryRef.current.length > 0 && historyIndexRef.current < commandHistoryRef.current.length - 1) {
					const newIndex = historyIndexRef.current + 1;
					historyIndexRef.current = newIndex;
					const command = commandHistoryRef.current[commandHistoryRef.current.length - 1 - newIndex];
					
					// clear current line
					term.write('\r\x1B[K');

					input = command;
					term.write(`> ${input}`);
				}
			} else if (char === '\x1B[B') {
				// Down arrow (ANSI escape code for down)
				if (historyIndexRef.current > 0) {
					const newIndex = historyIndexRef.current - 1;
					historyIndexRef.current = newIndex;
					const command = commandHistoryRef.current[commandHistoryRef.current.length - 1 - newIndex];

					term.write('\r\x1B[K');
					input = command;
					term.write(`> ${input}`);
				} else if (historyIndexRef.current === 0) {
					historyIndexRef.current = -1;

					term.write('\r\x1B[K');
					input = '';

					// Clear the input if at the bottom of the history
					term.write('> ');
				}
			} else if (char === '\t') {
				// Tab key for autocomplete
				const autocompleteResult = handleAutoComplete(input);
				if (autocompleteResult) {
					term.write('\r\x1B[K');
					input = autocompleteResult;
					term.write(`> ${input}`);
				}
			} else {

				// Regular character input
				input += char;

				// Display character in the terminal
				term.write(char);
			}
		});
	};

	// For autocomplete
	const availableCommands = ['help', 'projects', 'resume', 'contact', 'clear'];

	// Handle input for autocomplete
	const handleAutoComplete = (input) => {
		if (input) {
			const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(input));
			if (matchingCommands.length === 1) {

				// Return the exact match
				return matchingCommands[0];
			}
		}
		return null;
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
					term.write(` ${index + 1}. ${project.name} - ${project.description}\r\n visit: ${project.url}\r\n`);
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

	return (
		<div ref={terminalRef}
			style={{
				width: '100%',
				height: '100%'
			}}
		/>
	);
};

export default TerminalComponent;
