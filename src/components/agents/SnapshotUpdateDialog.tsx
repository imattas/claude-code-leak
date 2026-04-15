import React from "react";

type Props = {
  agentType: string;
  scope: unknown;
  snapshotTimestamp: string;
  onComplete: (value: "merge" | "keep" | "replace") => void;
  onCancel: () => void;
};

export function SnapshotUpdateDialog(_props: Props): React.JSX.Element | null {
  return null;
}
