export class MediaLoader {
  protected replaceAttr(
    node: HTMLElement,
    sourceAttr: string,
    targetAttr: string
  ): void {
    const src = node.getAttribute(sourceAttr);
    if (src) {
      // @ts-ignore
      node[targetAttr] = src;
      node.removeAttribute(sourceAttr);
    }
  }
}
