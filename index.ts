interface ITexts {
  [key: string]: string
}

;(() => {
  let _elementAttributePrefix: string
  let _templateSelector: string
  let _containerSelector: string

  class Template extends HTMLElement {
    constructor() {
      super()
      Template.onInit(this)
    }

    static onInit(template: HTMLElement): void {
      template.style.display = 'none'
    }
  }

  class Container extends HTMLElement {
    constructor() {
      super()
      Container.onInit(this)
    }

    static onInit(container: HTMLElement): void {
      const templateOutletValue /*: string */ = container.getAttribute(
        `${_elementAttributePrefix}TemplateOutlet`
      )
      const targetTemplate: HTMLElement = window.document.querySelector(
        `${_templateSelector}[${templateOutletValue}]`
      ) as HTMLElement
      container.innerHTML = targetTemplate.innerHTML
    }
  }

  class HtmlLightweightTemplateEngine {
    private texts: ITexts = {}

    constructor(texts: ITexts, elementAttributePrefix?: string) {
      this.texts = texts || this.texts
      _elementAttributePrefix = elementAttributePrefix || 'app'

      _templateSelector = `${_elementAttributePrefix}-template`
      _containerSelector = `${_elementAttributePrefix}-container`
    }

    private templateInterpolationUtil(htmlTemplate: string): string {
      const pattern = new RegExp(
        `{{\\s*([0-9a-zA-Z]+|[0-9a-zA-Z]+\\s+\\|\\s+[0-9a-zA-Z]+)\\s*}}`,
        'g'
      )
      let alteredHtmlTemplate = ''
      let currentPosition = 0
      let match

      while ((match = pattern.exec(htmlTemplate))) {
        alteredHtmlTemplate += htmlTemplate.slice(currentPosition, match.index)
        const resourceKey = match[1]
        let evaluatedExpression = ''
        evaluatedExpression = this.texts[resourceKey] || resourceKey
        alteredHtmlTemplate += evaluatedExpression
        currentPosition = pattern.lastIndex
      }
      alteredHtmlTemplate += htmlTemplate.slice(currentPosition)

      return alteredHtmlTemplate
    }

    private runCustomElementsPolyfill(): void {
      const templates = window.document.querySelectorAll(
        _templateSelector
      ) as unknown as HTMLElement[]
      const containers = window.document.querySelectorAll(
        _containerSelector
      ) as unknown as HTMLElement[]

      if (templates) templates.forEach((template) => Template.onInit(template))
      if (containers)
        containers.forEach((container) => Container.onInit(container))
    }

    renderTemplate(): void {
      window.document.head.innerHTML = this.templateInterpolationUtil(
        window.document.head.innerHTML
      )
      window.document.body.innerHTML = this.templateInterpolationUtil(
        window.document.body.innerHTML
      )

      if (window.customElements && window.customElements.define) {
        window.customElements.define(_templateSelector, Template)
        window.customElements.define(_containerSelector, Container)
      } else this.runCustomElementsPolyfill()
    }
  }

  window.HtmlLightweightTemplateEngine = HtmlLightweightTemplateEngine
})()
