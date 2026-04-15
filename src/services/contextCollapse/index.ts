type ContextCollapseStats = {
  collapsedSpans: number;
  stagedSpans: number;
  health: {
    totalErrors: number;
    totalEmptySpawns: number;
    emptySpawnWarningEmitted: boolean;
  };
};

const listeners = new Set<() => void>();

const defaultStats: ContextCollapseStats = {
  collapsedSpans: 0,
  stagedSpans: 0,
  health: {
    totalErrors: 0,
    totalEmptySpawns: 0,
    emptySpawnWarningEmitted: false
  }
};

export function getStats(): ContextCollapseStats {
  return defaultStats;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
