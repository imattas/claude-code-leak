export class SandboxViolationStore {
  getViolations() {
    return [];
  }

  clear() {}
}

export class SandboxManager {
  static isSupportedPlatform() {
    return false;
  }

  static isSandboxingEnabled() {
    return false;
  }

  static isAutoAllowBashIfSandboxedEnabled() {
    return false;
  }

  static getFsWriteConfig() {
    return { allowOnly: [], denyWithinAllow: [] };
  }

  static getFsReadConfig() {
    return { allowOnly: [], denyWithinAllow: [] };
  }

  static getNetworkRestrictionConfig() {
    return { allowOnly: [] };
  }

  static getIgnoreViolations() {
    return {};
  }

  static getProxyPort() {
    return undefined;
  }

  static getSocksProxyPort() {
    return undefined;
  }

  static getLinuxHttpSocketPath() {
    return undefined;
  }

  static getLinuxSocksSocketPath() {
    return undefined;
  }

  static getAllowUnixSockets() {
    return false;
  }

  static getAllowLocalBinding() {
    return false;
  }

  static getEnableWeakerNestedSandbox() {
    return false;
  }

  static getLinuxGlobPatternWarnings() {
    return [];
  }

  static getExcludedCommands() {
    return [];
  }

  static async waitForNetworkInitialization() {
    return false;
  }

  static async initialize() {}

  static updateConfig() {}

  static setSandboxSettings() {}

  static wrapWithSandbox(command) {
    return command;
  }

  static refreshConfig() {}

  static reset() {}

  static checkDependencies() {
    return { satisfied: true, missing: [] };
  }

  static getSandboxViolationStore() {
    return new SandboxViolationStore();
  }

  static annotateStderrWithSandboxFailures() {}

  static cleanupAfterCommand() {}
}

export const SandboxRuntimeConfigSchema = {
  parse(value) {
    return value;
  },
  safeParse(value) {
    return { success: true, data: value };
  }
};
