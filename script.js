
	async function sendMessage() {
		const jobTitle = document
			.getElementById('userInput')
			.value.trim();
		

		const responseDiv = document.getElementById('response');

		  // Check 1: not empty
		if (!jobTitle) {
			responseDiv.innerHTML = '<p>Please enter a job title.</p>';
			return;
		}
	
		// Check 2: minimum length (3 characters)
		if (jobTitle.length < 3) {
			responseDiv.innerHTML = '<p>Please enter a valid job title (at least 3 characters).</p>';
			return;
		}
	
		// Check 3: must contain at least one letter (rejects numbers/symbols only)
		if (!/[A-Za-z]/.test(jobTitle)) {
			responseDiv.innerHTML = '<p>Please enter a valid job title (e.g., "Software Engineer").</p>';
			return;
		}

		responseDiv.innerHTML =
			'<p>Generating interview questions...</p>';

		try {
			const prompt = `
Generate exactly 3 thoughtful interview questions 
for the role: "${jobTitle}".

Requirements:
- Questions must be role-specific
- Questions should evaluate practical thinking
- Keep them professional and concise
- Return only a numbered list
`;

			const response = await fetch(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					method: 'POST',
					headers: {
						Authorization: 'Bearer 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',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						model: 'openrouter/auto',
						messages: [
							{
								role: 'system',
								content:
									'You are an expert recruiter that creates high-quality interview questions.',
							},
							{
								role: 'user',
								content: prompt,
							},
						],
					}),
				},
			);

			const data = await response.json();

			console.log(data);

			if (!response.ok) {
				responseDiv.innerHTML = `
					<p>
						HTTP Error: ${response.status} ${response.statusText}
					</p>
				`;
				return;
			}

			if (data.error) {
				responseDiv.innerHTML = `
					<p>Error: ${JSON.stringify(data.error)}</p>
				`;
				return;
			}

			const aiResponse =
				data.choices?.[0]?.message?.content ||
				'No response received.';

			responseDiv.innerHTML = `
				<div class="ai-response">
					<h4>Interview Questions for "${jobTitle}"</h4>
					${marked.parse(aiResponse)}
				</div>
			`;
			} catch (error) {
			console.error(error);

			responseDiv.innerHTML = `
				<p>Error: ${error.message}</p>
			`;
		}
	}
	document.getElementById('sendBtn').addEventListener('click', sendMessage);

	document.getElementById('userInput').addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			event.preventDefault(); // stops form submission / page refresh
			sendMessage();
		}
	});