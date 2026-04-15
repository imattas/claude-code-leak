export class ColorDiff {
  constructor(patch, firstLine, filePath, fileContent) {
    this.patch = patch;
    this.firstLine = firstLine;
    this.filePath = filePath;
    this.fileContent = fileContent;
  }

  render() {
    return null;
  }
}

export class ColorFile {
  constructor(code, filePath) {
    this.code = code;
    this.filePath = filePath;
  }

  render() {
    return null;
  }
}

export function getSyntaxTheme() {
  return {};
}
