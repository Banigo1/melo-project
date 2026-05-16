async function sendMessage() {
	const userInput = document.getElementById('userInput').value.trim();
	const responseDiv = document.getElementById('response');
  
	// Check for empty input
	if (!userInput) {
	  responseDiv.innerHTML = '<p>Please enter a job title.</p>';
	  return;
	}
  
	// Decide if input is a question or job title
	const isQuestion = userInput.endsWith("?");
  
	// Validation only if it's a job title
	if (!isQuestion) {
	  if (userInput.length < 4) {
		responseDiv.innerHTML = '<p>Please enter a valid job title (at least 4 characters).</p>';
		return;
	  }
	  if (!/[A-Za-z]/.test(userInput)) {
		responseDiv.innerHTML = '<p>Please enter a valid job title (e.g., "Software Engineer").</p>';
		return;
	  }
	}
  
	responseDiv.innerHTML = '<p>Generating response...</p>';
  
	try {
	  let systemPrompt;
	  let userPrompt;
  
	  if (isQuestion) {
		// User asked a question → answer directly
		systemPrompt = "You are a helpful assistant that answers user questions clearly and concisely.";
		userPrompt = userInput;
	  } else {
		// User entered a job title → generate interview questions
		systemPrompt = "You are a recruiter that creates high-quality interview questions.";
		userPrompt = `
		  Generate exactly 3 thoughtful interview questions 
		  for the role: "${userInput}".
  
		  Requirements:
		  - Questions must be role-specific, professional and concise
		  - Return only a numbered list
		`;
	  }
  
	  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
		  Authorization: "Bearer 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",
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({
		  model: "deepseek/deepseek-v4-flash",
		  messages: [
			{ role: "system", content: systemPrompt },
			{ role: "user", content: userPrompt },
		  ],
		}),
	  });
  
	  const data = await response.json();
	  console.log(data);
  
	  if (!response.ok) {
		responseDiv.innerHTML = `<p>HTTP Error: ${response.status} ${response.statusText}</p>`;
		return;
	  }
  
	  if (data.error) {
		responseDiv.innerHTML = `<p>Error: ${JSON.stringify(data.error)}</p>`;
		return;
	  }
  
	  const aiResponse = data.choices?.[0]?.message?.content || "No response received.";
  
	  responseDiv.innerHTML = `
		<div class="ai-response">
		  <h4>${isQuestion ? "Answer" : `Interview Questions for "${userInput}"`}</h4>
		  ${marked.parse(aiResponse)}
		</div>
	  `;
	} catch (error) {
	  console.error(error);
	  responseDiv.innerHTML = `<p>Error: ${error.message}</p>`;
	}
  }
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("userInput").addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
	  event.preventDefault();
	  sendMessage();
	}
  });