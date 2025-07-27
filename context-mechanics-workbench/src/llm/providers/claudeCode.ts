import { LLMProvider, LLMMessage, LLMResponse } from '../provider';
import { Anthropic } from '@anthropic-ai/sdk';

export class ClaudeCodeProvider implements LLMProvider {
    readonly name = 'Claude Code';
    readonly capabilities = ['tools', 'streaming', 'large_context'];
    
    private client?: Anthropic;

    constructor() {
        this.initializeClient();
    }

    private initializeClient() {
        try {
            this.client = new Anthropic({
                apiKey: process.env.ANTHROPIC_API_KEY || ''
            });
        } catch (error) {
            console.warn('Failed to initialize Claude Code client:', error);
        }
    }

    async isAvailable(): Promise<boolean> {
        return !!this.client && !!process.env.ANTHROPIC_API_KEY;
    }

    async sendMessage(message: string, context?: LLMMessage[]): Promise<LLMResponse> {
        if (!this.client) {
            throw new Error('Claude Code client not available');
        }

        const messages = this.buildMessageHistory(message, context);
        
        const response = await this.client.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            }))
        });

        return {
            content: this.extractTextContent(response.content),
            timestamp: new Date(),
            metadata: {
                model: 'claude-3-5-sonnet-20241022',
                usage: response.usage
            }
        };
    }

    async *streamMessage(message: string, context?: LLMMessage[]): AsyncIterable<Partial<LLMResponse>> {
        if (!this.client) {
            throw new Error('Claude Code client not available');
        }

        const messages = this.buildMessageHistory(message, context);
        
        const stream = await this.client.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4096,
            messages: messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            })),
            stream: true
        });

        let content = '';
        for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
                content += chunk.delta.text;
                yield {
                    content: chunk.delta.text,
                    timestamp: new Date()
                };
            }
        }
    }

    private buildMessageHistory(message: string, context?: LLMMessage[]): LLMMessage[] {
        const messages: LLMMessage[] = context ? [...context] : [];
        messages.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });
        return messages;
    }

    private extractTextContent(content: any[]): string {
        return content
            .filter(block => block.type === 'text')
            .map(block => block.text)
            .join('');
    }
}