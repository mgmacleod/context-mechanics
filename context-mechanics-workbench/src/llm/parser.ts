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
        
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (workspaceFolder) {
            const config = vscode.workspace.getConfiguration('contextMechanics');
            const sessionDir = config.get<string>('sessionPath') || './transcripts-and-artifacts';
            this.sessionPath = path.join(workspaceFolder.uri.fsPath, sessionDir, sessionId);
            
            this.ensureSessionDirectory();
        }
    }

    addMessage(message: LLMMessage) {
        if (!this.currentSessionId) {
            console.warn('No active session for transcript capture');
            return;
        }

        this.messages.push(message);
        this.saveTranscript();
    }

    private ensureSessionDirectory() {
        if (this.sessionPath && !fs.existsSync(this.sessionPath)) {
            fs.mkdirSync(this.sessionPath, { recursive: true });
        }
    }

    private saveTranscript() {
        if (!this.sessionPath) return;

        const transcript = this.formatTranscript();
        const transcriptPath = path.join(this.sessionPath, 'transcript.md');
        
        fs.writeFileSync(transcriptPath, transcript, 'utf8');
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