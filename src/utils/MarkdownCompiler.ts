export class MarkdownCompiler {
  static compile(markdown: string): MarkdownElement[] {
    const elements: MarkdownElement[] = [];
    const regex =
      /\[([^\]]+)\]\(([^)]+)\)|\[([^\]]+)\]\{([^}]+)\}|\*([^*]+)\*|_([^_]+)_|(\S+)/g;

    let match;
    while ((match = regex.exec(markdown)) !== null) {
      if (match[1] && match[2]) {
        // Link: [text](url)
        elements.push({
          type: MarkdownElementType.Link,
          content: match[1],
          url: match[2],
        });
      } else if (match[3] && match[4]) {
        // StyleBox: [text]{style}
        elements.push({
          type: MarkdownElementType.StyleBox,
          content: match[3],
          style: match[4],
        });
      } else if (match[5]) {
        // Bold: *text*
        elements.push({
          type: MarkdownElementType.Bold,
          content: match[5],
        });
      } else if (match[6]) {
        // Italic: _text_
        elements.push({
          type: MarkdownElementType.Italic,
          content: match[6],
        });
      } else if (match[7]) {
        // Plain text
        elements.push({
          type: MarkdownElementType.Text,
          content: match[7],
        });
      }
    }
    return elements;
  }
}

export type MarkdownElement = {
  type: MarkdownElementType;
  content: string;
  url?: string;
  style?: string;
};

export enum MarkdownElementType {
  Link = 'link',
  Text = 'text',
  Bold = 'bold',
  Italic = 'italic',
  StyleBox = 'style-box',
}
