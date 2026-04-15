export type AnyZodRawShape = Record<string, unknown>;
export type InferShape<T extends AnyZodRawShape> = {
  [K in keyof T]: unknown;
};

export type ForkSessionOptions = Record<string, unknown>;
export type ForkSessionResult = Record<string, unknown>;
export type GetSessionInfoOptions = Record<string, unknown>;
export type GetSessionMessagesOptions = Record<string, unknown>;
export type InternalOptions = Record<string, unknown>;
export type ListSessionsOptions = Record<string, unknown>;
export type McpSdkServerConfigWithInstance = Record<string, unknown>;
export type Options = Record<string, unknown>;
export type SDKSession = Record<string, unknown>;
export type SDKSessionOptions = Record<string, unknown>;
export type SessionMessage = unknown;
export type SessionMutationOptions = Record<string, unknown>;
export type SdkMcpToolDefinition<T extends AnyZodRawShape = AnyZodRawShape> = {
  inputSchema?: T;
  name?: string;
};

export type Query = AsyncIterable<unknown>;
export type InternalQuery = AsyncIterable<unknown>;

export {};
