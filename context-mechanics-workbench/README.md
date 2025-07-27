# Context Mechanics Research Workbench

A VSCode extension for studying human-AI collaboration dynamics with integrated LLM providers.

## Features

- **Research Session Management**: Create, save, and resume research sessions
- **LLM Integration**: Support for Claude Code, OpenAI, and local models
- **Real-time Transcript Capture**: Automatic capture of all interactions
- **Note-taking System**: Side panel for research notes during sessions
- **Message Composition**: Rich interface for composing prompts

## Development

### Prerequisites
- Node.js 16.x or higher
- VSCode
- TypeScript

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Compile: `npm run compile`
4. Press F5 to run the extension in a new Extension Development Host window

### Usage
1. Open the Command Palette (Ctrl/Cmd+Shift+P)
2. Run "Open Context Mechanics Workbench"
3. Create a new research session
4. Start composing and sending messages to LLM providers

## Architecture

The extension follows a modular architecture:

- `src/extension.ts` - Main extension entry point
- `src/views/` - UI components (session panel, note panel)
- `src/llm/` - LLM provider abstraction and implementations
- `src/storage/` - Session persistence and artifact management

## Configuration

```json
{
  "contextMechanics.llmProvider": "claudeCode",
  "contextMechanics.autoCapture": true,
  "contextMechanics.sessionPath": "./transcripts-and-artifacts"
}
```