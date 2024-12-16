export class MarkdownCompiler {
  static compile(markdown: string): MarkdownElement[] {
    const words = markdown.split(' ');
    const elements: MarkdownElement[] = [];
    for (const word of words) {
      const parsedWord = word.slice(1, -1);
      if (
        word.startsWith('[') &&
        word.endsWith(')') &&
        word.includes(']') &&
        word.includes('(')
      ) {
        const url = word.slice(word.indexOf('(') + 1, -1);
        const content = word.slice(1, word.indexOf(']'));
        elements.push({ type: MarkdownElementType.Link, content, url });
      } else if (
        word.startsWith('[') &&
        word.endsWith('}') &&
        word.includes(']') &&
        word.includes('{')
      ) {
        const style = word.slice(word.indexOf('{') + 1, -1);
        const content = word.slice(1, word.indexOf(']'));
        elements.push({ type: MarkdownElementType.StyleBox, content, style });
      } else if (word.startsWith('*') && word.endsWith('*')) {
        elements.push({ type: MarkdownElementType.Bold, content: parsedWord });
      } else if (word.startsWith('_') && word.endsWith('_')) {
        elements.push({
          type: MarkdownElementType.Italic,
          content: parsedWord,
        });
      } else {
        elements.push({ type: MarkdownElementType.Text, content: word });
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
