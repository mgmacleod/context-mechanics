import { LLMProvider, LLMMessage, LLMResponse } from '../provider';

export class MockProvider implements LLMProvider {
    readonly name = 'Mock Provider';
    readonly capabilities = ['testing'];

    async isAvailable(): Promise<boolean> {
        return true;
    }

    async sendMessage(message: string, context?: LLMMessage[]): Promise<LLMResponse> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            content: `Mock response to: "${message}"`,
            timestamp: new Date(),
            metadata: {
                provider: 'mock',
                messageLength: message.length
            }
        };
    }

    async *streamMessage(message: string, context?: LLMMessage[]): AsyncIterable<Partial<LLMResponse>> {
        const response = `Mock streaming response to: "${message}"`;
        const words = response.split(' ');
        
        for (const word of words) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield {
                content: word + ' ',
                timestamp: new Date()
            };
        }
    }
}