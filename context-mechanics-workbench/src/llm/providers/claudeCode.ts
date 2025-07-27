import { LLMProvider, LLMMessage, LLMResponse } from '../provider';
// Import directly from the Claude Code SDK
const { query } = require('@anthropic-ai/claude-code');
import type { SDKMessage } from '../../types/claude-code';

export class ClaudeCodeProvider implements LLMProvider {
    readonly name = 'Claude Code';
    readonly capabilities = ['tools', 'streaming', 'large_context', 'codebase_aware'];
    
    constructor() {
        // Claude Code SDK doesn't require explicit initialization
    }

    async isAvailable(): Promise<boolean> {
        try {
            // Test if Claude Code is available by checking if we can import it
            return typeof query === 'function';
        } catch (error) {
            console.warn('Claude Code SDK not available:', error);
            return false;
        }
    }

    async sendMessage(message: string, _context?: LLMMessage[]): Promise<LLMResponse> {
        const messages: SDKMessage[] = [];
        let content = '';
        
        try {
            for await (const sdkMessage of query({
                prompt: message,
                abortController: new AbortController(),
                options: {
                    maxTurns: 1,
                },
            })) {
                messages.push(sdkMessage);
                if (sdkMessage.type === 'assistant') {
                    content += this.extractTextFromSDKMessage(sdkMessage);
                }
            }

            return {
                content,
                timestamp: new Date(),
                metadata: {
                    provider: 'claude-code',
                    messageCount: messages.length
                }
            };
        } catch (error) {
            throw new Error(`Claude Code query failed: ${error}`);
        }
    }

    async *streamMessage(message: string, _context?: LLMMessage[]): AsyncIterable<Partial<LLMResponse>> {
        try {
            for await (const sdkMessage of query({
                prompt: message,
                abortController: new AbortController(),
                options: {
                    maxTurns: 1,
                },
            })) {
                if (sdkMessage.type === 'assistant') {
                    const textContent = this.extractTextFromSDKMessage(sdkMessage);
                    
                    if (textContent) {
                        yield {
                            content: textContent,
                            timestamp: new Date(),
                            metadata: {
                                provider: 'claude-code',
                                messageType: sdkMessage.type
                            }
                        };
                    }
                }
            }
        } catch (error) {
            throw new Error(`Claude Code streaming failed: ${error}`);
        }
    }

    private extractTextFromSDKMessage(sdkMessage: SDKMessage): string {
        if (sdkMessage.type !== 'assistant') {
            return '';
        }
        
        const message = sdkMessage.message;
        if (!message || !message.content) {
            return '';
        }
        
        const content = message.content;
        if (typeof content === 'string') {
            return content;
        }
        
        if (Array.isArray(content)) {
            return content
                .filter(block => block.type === 'text')
                .map(block => (block as any).text || '')
                .join('');
        }
        
        return '';
    }
}