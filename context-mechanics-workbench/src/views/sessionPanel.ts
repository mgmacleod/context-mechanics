import * as vscode from 'vscode';
import { LLMProviderManager } from '../llm/provider';
import { TranscriptCapture } from '../llm/parser';

export class SessionPanel implements vscode.Disposable {
    private panel?: vscode.WebviewPanel;
    private currentSession?: ResearchSession;
    private transcriptCapture: TranscriptCapture;

    constructor(
        private context: vscode.ExtensionContext,
        private providerManager: LLMProviderManager
    ) {
        this.transcriptCapture = new TranscriptCapture();
    }

    show() {
        if (this.panel) {
            this.panel.reveal();
            return;
        }

        this.panel = vscode.window.createWebviewPanel(
            'contextMechanicsSession',
            'Context Mechanics Session',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        this.panel.webview.html = this.getWebviewContent();
        this.setupWebviewMessageHandler();

        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }

    createNewSession() {
        const sessionId = `session-${Date.now()}`;
        this.currentSession = {
            id: sessionId,
            title: `Research Session ${new Date().toLocaleDateString()}`,
            startTime: new Date(),
            messages: [],
            notes: []
        };

        this.transcriptCapture.startSession(sessionId);
        
        if (this.panel) {
            this.panel.webview.postMessage({
                type: 'sessionCreated',
                session: this.currentSession
            });
        }
    }

    openMessageComposer() {
        if (!this.panel) {
            this.show();
        }
        
        this.panel?.webview.postMessage({
            type: 'focusComposer'
        });
    }

    private getWebviewContent(): string {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Context Mechanics Session</title>
    <style>
        body { 
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            margin: 0;
            padding: 20px;
        }
        .session-header {
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .composer {
            margin-bottom: 20px;
        }
        .composer textarea {
            width: 100%;
            min-height: 100px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            padding: 10px;
            font-family: inherit;
            resize: vertical;
        }
        .composer-actions {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }
        button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .messages {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
            padding: 15px;
        }
        .message {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 4px;
        }
        .message.user {
            background-color: var(--vscode-textPreformat-background);
        }
        .message.assistant {
            background-color: var(--vscode-textBlockQuote-background);
        }
        .message-meta {
            font-size: 0.9em;
            opacity: 0.7;
            margin-bottom: 5px;
        }
        .provider-selector {
            margin-bottom: 10px;
        }
        select {
            background-color: var(--vscode-dropdown-background);
            color: var(--vscode-dropdown-foreground);
            border: 1px solid var(--vscode-dropdown-border);
            padding: 4px 8px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="session-header">
        <h2 id="sessionTitle">No Active Session</h2>
        <div class="provider-selector">
            <label for="providerSelect">LLM Provider: </label>
            <select id="providerSelect">
                <option value="claudeCode">Claude Code</option>
                <option value="mock">Mock Provider</option>
            </select>
        </div>
    </div>

    <div class="composer">
        <textarea id="messageInput" placeholder="Enter your research prompt..."></textarea>
        <div class="composer-actions">
            <button id="sendButton">Send Message</button>
            <button id="newSessionButton">New Session</button>
        </div>
    </div>

    <div class="messages" id="messagesContainer">
        <p>Start a new session to begin your research conversation.</p>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        document.getElementById('sendButton').addEventListener('click', sendMessage);
        document.getElementById('newSessionButton').addEventListener('click', newSession);
        document.getElementById('messageInput').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const provider = document.getElementById('providerSelect').value;
            const message = input.value.trim();
            
            if (!message) return;
            
            vscode.postMessage({
                type: 'sendMessage',
                message: message,
                provider: provider
            });
            
            input.value = '';
        }

        function newSession() {
            vscode.postMessage({ type: 'newSession' });
        }

        window.addEventListener('message', event => {
            const message = event.data;
            
            switch (message.type) {
                case 'sessionCreated':
                    document.getElementById('sessionTitle').textContent = message.session.title;
                    document.getElementById('messagesContainer').innerHTML = '';
                    break;
                    
                case 'messageReceived':
                    appendMessage(message.message);
                    break;
                    
                case 'focusComposer':
                    document.getElementById('messageInput').focus();
                    break;
            }
        });

        function appendMessage(message) {
            const container = document.getElementById('messagesContainer');
            const messageEl = document.createElement('div');
            messageEl.className = \`message \${message.role}\`;
            messageEl.innerHTML = \`
                <div class="message-meta">
                    \${message.role === 'user' ? 'You' : 'Assistant'} • \${new Date(message.timestamp).toLocaleTimeString()}
                </div>
                <div>\${message.content}</div>
            \`;
            container.appendChild(messageEl);
            container.scrollTop = container.scrollHeight;
        }
    </script>
</body>
</html>`;
    }

    private setupWebviewMessageHandler() {
        this.panel?.webview.onDidReceiveMessage(async (message) => {
            switch (message.type) {
                case 'sendMessage':
                    await this.handleSendMessage(message.message, message.provider);
                    break;
                case 'newSession':
                    this.createNewSession();
                    break;
            }
        });
    }

    private async handleSendMessage(messageText: string, providerName: string) {
        if (!this.currentSession) {
            vscode.window.showWarningMessage('Please start a new session first');
            return;
        }

        const userMessage = {
            role: 'user' as const,
            content: messageText,
            timestamp: new Date()
        };

        this.currentSession.messages.push(userMessage);
        this.transcriptCapture.addMessage(userMessage);
        
        this.panel?.webview.postMessage({
            type: 'messageReceived',
            message: userMessage
        });

        try {
            this.providerManager.setActiveProvider(providerName);
            const provider = await this.providerManager.getActiveProvider();
            
            if (!provider) {
                throw new Error(`Provider ${providerName} not available`);
            }

            const response = await provider.sendMessage(messageText, this.currentSession.messages.slice(0, -1));
            
            const assistantMessage = {
                role: 'assistant' as const,
                content: response.content,
                timestamp: response.timestamp
            };

            this.currentSession.messages.push(assistantMessage);
            this.transcriptCapture.addMessage(assistantMessage);
            
            this.panel?.webview.postMessage({
                type: 'messageReceived',
                message: assistantMessage
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Error sending message: ${error}`);
        }
    }

    dispose() {
        this.panel?.dispose();
    }
}

interface ResearchSession {
    id: string;
    title: string;
    startTime: Date;
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: Date;
    }>;
    notes: string[];
}