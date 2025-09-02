document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');

  // Initialize showdown converter for Markdown
  const converter = new showdown.Converter({
    ghCompatibleHeaderId: true,
    simpleLineBreaks: true,
    strikethrough: true,
    tables: true,
  });

  // This array will hold the entire conversation history to provide context to the AI.
  const conversationHistory = [];

  /**
   * Appends a new message to the chat box UI.
   * For bot messages, it renders content as Markdown.
   * @param {string} content - The text or HTML content of the message.
   * @param {'user' | 'bot' | 'error'} type - The type of message for styling purposes.
   * @returns {HTMLElement} The newly created message element.
   */
  function appendMessage(content, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${type}-message`);

    if (type === 'user' || type === 'error') {
      // For user and error messages, treat as plain text to prevent XSS
      messageElement.textContent = content;
    } else { // For 'bot' messages, render Markdown
      const rawHtml = converter.makeHtml(content);
      // Sanitize the HTML before inserting to prevent XSS attacks
      messageElement.innerHTML = DOMPurify.sanitize(rawHtml);
    }

    chatBox.appendChild(messageElement);
    // Automatically scroll to the bottom to show the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageElement;
  }

  chatForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission which reloads the page
    event.preventDefault();

    const userMessage = userInput.value.trim();
    if (!userMessage) {
      return; // Don't send empty messages
    }

    // 1. Add the user's message to the UI and conversation history
    appendMessage(userMessage, 'user'); // Render user message as plain text
    conversationHistory.push({ role: 'user', content: userMessage });

    // Clear the input field and focus it for the next message
    userInput.value = '';
    userInput.focus();

    // 2. Show a temporary "Thinking..." message while waiting for the response
    const thinkingMessage = appendMessage('Thinking...', 'bot');
    thinkingMessage.classList.add('thinking');

    try {
      // 3. Send the conversation history to the streaming backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // 4. Handle the single JSON response
      const data = await response.json();
      thinkingMessage.classList.remove('thinking');

      if (data.result) {
        const aiResponseContent = data.result;
        // Convert final markdown to HTML, sanitize, and update UI
        const rawHtml = converter.makeHtml(aiResponseContent);
        thinkingMessage.innerHTML = DOMPurify.sanitize(rawHtml);
        // Add the complete AI response to the conversation history
        conversationHistory.push({ role: 'model', content: aiResponseContent });
      } else {
        thinkingMessage.textContent = 'Sorry, no response received.';
        thinkingMessage.classList.add('error-message');
      }
    } catch (error) {
      console.error('Failed to fetch chat response:', error);
      // 5. If an error occurs, update the message to show an error state
      thinkingMessage.textContent = 'Failed to get response from server.';
      thinkingMessage.classList.add('error-message');
      thinkingMessage.classList.remove('thinking');
    }
  });
});
