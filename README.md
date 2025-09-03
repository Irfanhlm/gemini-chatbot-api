# Gemini AI Chatbot

This is a simple chatbot web application built with Node.js and Express on the backend, and Vanilla JavaScript on the frontend. This application uses the Google Gemini API to generate intelligent responses to user input.

## Features

-   **Interactive Chat Interface**: A clean bubble chat UI for user and bot messages.
-   **Google Gemini Connection**: Connects to a backend that uses the Google Gemini API to generate AI responses.
-   **Markdown Rendering**: Responses from the AI containing Markdown formatting (like lists, code blocks, bold, italics) are rendered correctly.
-   **Asynchronous Handling**: Displays a "Thinking..." message while waiting for the server's response.
-   **Simple Setup**: Easy to set up and run locally.

## Tech Stack

### Backend
-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: Web framework for Node.js.
-   **@google/generative-ai**: The official Google SDK for interacting with the Gemini API.
-   **dotenv**: For managing environment variables (like API keys).
-   **cors**: Middleware to enable Cross-Origin Resource Sharing.

### Frontend
-   **HTML5**
-   **CSS3**: Custom styling for the chat interface.
-   **Vanilla JavaScript (ES6+)**: For frontend logic, DOM manipulation, and API requests.
-   **Showdown.js**: A library to convert Markdown to HTML.
-   **DOMPurify**: A library to sanitize HTML and prevent XSS attacks.

## Prerequisites

Make sure you have the following software installed on your machine:
-   [Node.js](https://nodejs.org/en/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation and Setup

1.  **Clone this repository (or download the project files):**
    ```bash
    git clone https://github.com/Irfanhlm/gemini-chatbot-api.git
    cd gemini-chatbot-api
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the project's root directory.

4.  **Add your API Key:**
    Open the `.env` file and add your Google Gemini API Key as follows:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

## Running the Application

1.  **Run the backend server:**
    ```bash
    node index.js
    ```

2.  **Open the application in your browser:**
    Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

```
gemini-chatbot-api/
├── public/                # File frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── script.js
│   └── style.css
├── .env                   # File variabel lingkungan (dibuat manual)
├── index.js               # File utama server Express
└── package.json           # Dependensi dan skrip proyek
```
