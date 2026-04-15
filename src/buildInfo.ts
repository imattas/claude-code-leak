import packageJson from "../package.json";

export type MacroInfo = {
  VERSION: string;
  BUILD_TIME: string;
  FEEDBACK_CHANNEL: string;
  ISSUES_EXPLAINER: string;
  NATIVE_PACKAGE_URL: string;
  PACKAGE_URL: string;
  VERSION_CHANGELOG: string;
};

export const MACRO: MacroInfo = {
  VERSION: packageJson.version ?? "1.0.0",
  BUILD_TIME: "",
  FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
  ISSUES_EXPLAINER:
    "https://github.com/anthropics/claude-code/issues",
  NATIVE_PACKAGE_URL: "https://claude.ai/download",
  PACKAGE_URL: "https://www.npmjs.com/package/claude-code",
  VERSION_CHANGELOG: "https://claude.ai/changelog"
};
