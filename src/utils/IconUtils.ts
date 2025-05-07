export default class IconUtils {
  static parseIconPath(
    path: string,
    name: string | undefined = undefined
  ): string {
    const iconBasePath = 'assets/icons/logos/';

    if (path!.startsWith('http')) {
      return path;
    }

    const iconName = name || path;

    return iconBasePath + this.parseIconName(iconName) + '.png';
  }

  private static parseIconName(name: string): string {
    name = name.toLowerCase();
    switch (name) {
      case 'c#':
        return 'csharp';
      case 'js':
        return 'javascript';
      case 'ts/js':
      case 'js/ts':
      case 'ts':
        return 'typescript';
      case 'html5':
        return 'html';
      case 'css3':
        return 'css';
      default:
        return name;
    }
  }
}
