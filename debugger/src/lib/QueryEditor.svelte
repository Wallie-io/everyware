<script lang="ts" context="module">
	let userInput: string = `{
	body: "This is a sample body",
	author: "jakefromdubsado"
}
	`;

	export function submitForm() {
		const propRegex = /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g;
		userInput = userInput.replace(propRegex, '$1"$2"$3');
		const parsed = JSON.parse(userInput);
		if (typeof parsed === 'object') {
			return parsed;
		} else {
			throw new Error('JSON must be an object');
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		const target = event.target as HTMLTextAreaElement;
		let start = target.selectionStart;
		let end = target.selectionEnd;

		if (event.key === 'Tab' && !event.shiftKey) {
			event.preventDefault();
			// Insert tab character
			userInput = userInput.substring(0, start) + '\t' + userInput.substring(end);
			target.value = userInput;
			target.selectionStart = target.selectionEnd = start + 1;
		} else if (event.key === 'Tab' && event.shiftKey) {
			event.preventDefault();
			// Find the start of the current line
			const lineStart = userInput.lastIndexOf('\n', start - 1) + 1;
			const lineUpToCursor = userInput.substring(lineStart, start);

			// Check if the line starts with a tab or spaces
			if (lineUpToCursor.startsWith('\t')) {
				// Remove a tab at the start of the line
				userInput = userInput.substring(0, lineStart) + userInput.substring(lineStart + 1);
				target.value = userInput;
				target.selectionStart = target.selectionEnd = start - 1;
			} else if (lineUpToCursor.match(/^ {2,}/)) {
				// If there are 2 or more spaces at the start of the line, remove them
				const newStart = lineStart + lineUpToCursor.indexOf(' ') + 1;
				userInput = userInput.substring(0, newStart) + userInput.substring(start);
				target.value = userInput;
				target.selectionStart = target.selectionEnd = newStart;
			}
		} else if (event.key === 'Enter') {
			event.preventDefault();
			const beforeCursor = userInput.substring(0, start);
			const afterCursor = userInput.substring(end);

			// Find the indentation of the current line
			const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
			const currentIndentation = beforeCursor.substring(currentLineStart).match(/^(\s+)/);
			const indent = currentIndentation ? currentIndentation[0] : '';

			// Apply the same indentation after the newline
			userInput = beforeCursor + '\n' + indent + afterCursor;
			target.value = userInput;
			const newPosition = start + 1 + indent.length;
			target.selectionStart = target.selectionEnd = newPosition;
		}
	};
</script>

<textarea bind:value={userInput} on:keydown={handleKeyDown} placeholder="Enter your query here"
></textarea>

<style>
	textarea {
		width: 100%;
		min-height: 10rem;
		font-size: 1.1rem;
		padding: 1rem;
		border-radius: 5px;
		margin-bottom: 1rem;
		resize: none;
		margin-top: 0.7rem;
		font-family: 'Fira Code, monospace';
		background: #222222;
		color: #e6e3e3;
	}
</style>
