import React from "react";

type WizardProps = {
  defaultDir: string;
  onInstalled: (dir: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

export function NewInstallWizard(_props: WizardProps): React.JSX.Element | null {
  return null;
}

export async function computeDefaultInstallDir(): Promise<string> {
  return "";
}

const assistantCommand = null;

export default assistantCommand;
