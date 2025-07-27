export interface LLMMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: any;
}

export interface LLMResponse {
    content: string;
    timestamp: Date;
    metadata?: any;
    toolCalls?: any[];
}

export interface LLMProvider {
    readonly name: string;
    readonly capabilities: string[];
    
    sendMessage(message: string, context?: LLMMessage[]): Promise<LLMResponse>;
    streamMessage(message: string, context?: LLMMessage[]): AsyncIterable<Partial<LLMResponse>>;
    isAvailable(): Promise<boolean>;
}

export class LLMProviderManager {
    private providers: Map<string, LLMProvider> = new Map();
    private activeProvider: string = 'claudeCode';

    constructor() {
        this.loadProviders();
    }

    private async loadProviders() {
        const { ClaudeCodeProvider } = await import('./providers/claudeCode');
        const { MockProvider } = await import('./providers/mock');
        
        this.registerProvider('claudeCode', new ClaudeCodeProvider());
        this.registerProvider('mock', new MockProvider());
    }

    registerProvider(name: string, provider: LLMProvider) {
        this.providers.set(name, provider);
    }

    getProvider(name?: string): LLMProvider | undefined {
        return this.providers.get(name || this.activeProvider);
    }

    setActiveProvider(name: string) {
        if (this.providers.has(name)) {
            this.activeProvider = name;
        }
    }

    getAvailableProviders(): string[] {
        return Array.from(this.providers.keys());
    }

    async getActiveProvider(): Promise<LLMProvider | undefined> {
        const provider = this.getProvider();
        if (provider && await provider.isAvailable()) {
            return provider;
        }
        return undefined;
    }
}