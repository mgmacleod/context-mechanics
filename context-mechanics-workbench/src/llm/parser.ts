import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { LLMMessage } from './provider';

export class TranscriptCapture {
    private currentSessionId?: string;
    private sessionPath?: string;
    private messages: LLMMessage[] = [];

    startSession(sessionId: string) {
        this.currentSessionId = sessionId;
        this.messages = [];
        
        this.setupSessionPath(sessionId);
    }

    private setupSessionPath(sessionId: string) {
        const config = vscode.workspace.getConfiguration('contextMechanics');
        const sessionDir = config.get<string>('sessionPath') || './transcripts-and-artifacts';
        
        // Try to get workspace folder first
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        
        if (workspaceFolder) {
            // Use workspace folder if available
            this.sessionPath = path.join(workspaceFolder.uri.fsPath, sessionDir, sessionId);
        } else {
            // Fallback: use current working directory or temp directory
            const basePath = process.cwd() || require('os').tmpdir();
            this.sessionPath = path.join(basePath, 'context-mechanics-sessions', sessionId);
            console.warn('No workspace folder detected, using fallback path:', this.sessionPath);
        }
        
        this.ensureSessionDirectory();
    }

    addMessage(message: LLMMessage) {
        if (!this.currentSessionId) {
            console.warn('No active session for transcript capture');
            return;
        }

        if (!this.sessionPath) {
            console.error('Session path not initialized, attempting to set up');
            this.setupSessionPath(this.currentSessionId);
        }

        this.messages.push(message);
        console.log(`Adding message ${this.messages.length} to session ${this.currentSessionId}`);
        this.saveTranscript();
    }

    getSessionPath(): string | undefined {
        return this.sessionPath;
    }

    private ensureSessionDirectory() {
        if (!this.sessionPath) {
            console.error('No session path configured for transcript capture');
            return;
        }
        
        try {
            if (!fs.existsSync(this.sessionPath)) {
                fs.mkdirSync(this.sessionPath, { recursive: true });
                console.log('Created session directory:', this.sessionPath);
            }
        } catch (error) {
            console.error('Failed to create session directory:', error);
            vscode.window.showErrorMessage(`Failed to create session directory: ${error}`);
        }
    }

    private saveTranscript() {
        if (!this.sessionPath) {
            console.error('No session path available for saving transcript');
            return;
        }

        try {
            const transcript = this.formatTranscript();
            const transcriptPath = path.join(this.sessionPath, 'transcript.md');
            
            fs.writeFileSync(transcriptPath, transcript, 'utf8');
            console.log('Transcript saved to:', transcriptPath);
        } catch (error) {
            console.error('Failed to save transcript:', error);
            vscode.window.showErrorMessage(`Failed to save transcript: ${error}`);
        }
    }

    private formatTranscript(): string {
        const header = this.generateTranscriptHeader();
        const conversation = this.messages.map(msg => this.formatMessage(msg)).join('\n\n');
        
        return `${header}\n\n${conversation}`;
    }

    private generateTranscriptHeader(): string {
        const timestamp = new Date().toISOString();
        return `# Research Session Transcript

**Session ID**: ${this.currentSessionId}
**Started**: ${timestamp}
**Messages**: ${this.messages.length}

---`;
    }

    private formatMessage(message: LLMMessage): string {
        const role = message.role === 'user' ? 'Human' : 'Assistant';
        const timestamp = message.timestamp.toLocaleTimeString();
        
        let content = message.content;
        
        if (message.role === 'user') {
            content = content.split('\n').map(line => line).join('\n');
        } else {
            content = content.split('\n').map(line => line).join('\n');
        }

        return `## ${role} (${timestamp})

${content}`;
    }

    exportSession(): SessionExport | null {
        if (!this.currentSessionId || this.messages.length === 0) {
            return null;
        }

        return {
            sessionId: this.currentSessionId,
            timestamp: new Date(),
            messageCount: this.messages.length,
            transcript: this.formatTranscript(),
            messages: [...this.messages]
        };
    }

    getSessionStats(): SessionStats {
        const userMessages = this.messages.filter(m => m.role === 'user').length;
        const assistantMessages = this.messages.filter(m => m.role === 'assistant').length;
        const totalChars = this.messages.reduce((sum, m) => sum + m.content.length, 0);

        return {
            messageCount: this.messages.length,
            userMessages,
            assistantMessages,
            totalCharacters: totalChars,
            sessionDuration: this.calculateSessionDuration()
        };
    }

    private calculateSessionDuration(): number {
        if (this.messages.length < 2) return 0;
        
        const firstMessage = this.messages[0];
        const lastMessage = this.messages[this.messages.length - 1];
        
        return lastMessage.timestamp.getTime() - firstMessage.timestamp.getTime();
    }
}

export interface SessionExport {
    sessionId: string;
    timestamp: Date;
    messageCount: number;
    transcript: string;
    messages: LLMMessage[];
}

export interface SessionStats {
    messageCount: number;
    userMessages: number;
    assistantMessages: number;
    totalCharacters: number;
    sessionDuration: number;
}