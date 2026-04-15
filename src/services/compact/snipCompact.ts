import type { Message } from "../../types/message.js";

export function isSnipRuntimeEnabled(): boolean {
  return false;
}

export function shouldNudgeForSnips(_messages: Message[]): boolean {
  return false;
}
