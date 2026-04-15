export type CacheEditsBlock = {
  type: "cache_edits";
  clearToolUseIds: string[];
};

export type PinnedCacheEdits = {
  userMessageIndex: number;
  block: CacheEditsBlock;
};

export type CachedMCState = {
  registeredTools: Set<string>;
  toolOrder: string[];
  deletedRefs: Set<string>;
  pinnedEdits: PinnedCacheEdits[];
};

export function getCachedMCConfig() {
  return {
    triggerThreshold: 10,
    keepRecent: 3
  };
}

export function createCachedMCState(): CachedMCState {
  return {
    registeredTools: new Set<string>(),
    toolOrder: [],
    deletedRefs: new Set<string>(),
    pinnedEdits: []
  };
}

export function registerToolResult(state: CachedMCState, toolUseId: string): void {
  state.registeredTools.add(toolUseId);
  if (!state.toolOrder.includes(toolUseId)) {
    state.toolOrder.push(toolUseId);
  }
}

export function registerToolMessage(_state: CachedMCState, _toolUseIds: string[]): void {}

export function getToolResultsToDelete(_state: CachedMCState): string[] {
  return [];
}

export function createCacheEditsBlock(
  _state: CachedMCState,
  toolUseIds: string[]
): CacheEditsBlock | null {
  if (toolUseIds.length === 0) {
    return null;
  }

  return {
    type: "cache_edits",
    clearToolUseIds: toolUseIds
  };
}

export function markToolsSentToAPI(_state: CachedMCState): void {}

export function resetCachedMCState(state: CachedMCState): void {
  state.registeredTools.clear();
  state.toolOrder = [];
  state.deletedRefs.clear();
  state.pinnedEdits = [];
}
