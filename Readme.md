# AssistantAI-API-Node - Node.js project

This is a simple Node.js API project built without any frameworks like Express. It simulates functionalities similar to an assistant and moderation service, as seen in OpenAI's API. The API handles user questions, moderation checks, and thread management without using a database.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Endpoints](#endpoints)
-   [Project Structure](#project-structure)
-   [Technologies Used](#technologies-used)

## Installation

```
    git clone https://github.com/Edyta2801/AssistantAI-API-Node.git
    npm install
```

## Usage

```
  node server.js
```

## Endpoints

-   GET /
-   POST /api/ask
-   POST /api/threads
-   POST /api/new-thread

## Project Structure

```
├── controllers
│   ├── askController.js
│   ├── mainController.js
│   ├── threadController.js
│   ├── newThreadController.js
├── data
│   ├── messages.json
│   └── threads.json
├── helpers
│   └── parseJSONBody.js
├── models
│   └── threadModel.js
├── services
│   ├── assistantService.js
│   ├── moderationService.js
│   └── threadService.js
└── server.js
```

## Technologies Used

-   Node.js: Server environment
-   JavaScript: Main programming language
-   JSON: Used for data storage (threads and messages)
