// Type definitions for @anthropic-ai/claude-code
import type { Anthropic } from '@anthropic-ai/sdk';

export type NonNullableUsage = {
  [K in keyof Anthropic.Usage]: NonNullable<Anthropic.Usage[K]>
}

export type SDKUserMessage = {
  type: 'user'
  message: Anthropic.MessageParam
  parent_tool_use_id: string | null
  session_id: string
}

export type SDKAssistantMessage = {
  type: 'assistant'
  message: Anthropic.Message
  parent_tool_use_id: string | null
  session_id: string
}

export type SDKResultMessage =
  | {
      type: 'result'
      subtype: 'success'
      duration_ms: number
      duration_api_ms: number
      is_error: boolean
      num_turns: number
      result: string
      session_id: string
      total_cost_usd: number
      usage: NonNullableUsage
    }
  | {
      type: 'result'
      subtype: 'error_max_turns' | 'error_during_execution'
      duration_ms: number
      duration_api_ms: number
      is_error: boolean
      num_turns: number
      session_id: string
      total_cost_usd: number
      usage: NonNullableUsage
    }

export type SDKSystemMessage = {
  type: 'system'
  subtype: 'init'
  session_id: string
}

export type SDKMessage =
  | SDKAssistantMessage
  | SDKUserMessage
  | SDKResultMessage
  | SDKSystemMessage

export interface Query extends AsyncGenerator<SDKMessage, void> {
  interrupt(): Promise<void>
}

export function query(props: {
  prompt: string | AsyncIterable<SDKUserMessage>
  abortController?: AbortController
  options?: {
    maxTurns?: number
    [key: string]: any
  }
}): Query