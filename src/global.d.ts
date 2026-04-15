declare const MACRO: {
  VERSION: string;
  BUILD_TIMESTAMP?: string;
  BUILD_TIME?: string;
  FEEDBACK_CHANNEL?: string;
  ISSUES_EXPLAINER?: string;
  NATIVE_PACKAGE_URL?: string;
  PACKAGE_URL?: string;
  VERSION_CHANGELOG?: string;
};

declare module "*.md" {
  const content: string;
  export default content;
}

export {};
