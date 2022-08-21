declare global {
  interface Window {
    HtmlLightweightTemplateEngine: new (
      texts: { [key: string]: string },
      elementPrefix?: string
    ) => object
  }
}

export {}
