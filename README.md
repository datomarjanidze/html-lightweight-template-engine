## HTML Lightweight Template Engine

### Installation

```console
npm i html-lightweight-template-engine
```

### Description

When you simply want to use template interpolation `{{ someValue }}` and
Angular like `ng-container` and `ng-template` elements (with the limited
functionality) in plain HTML without any frameworks, you can use this
library to do that.

### Usage example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ pageTitle }}</title>
  </head>
  <body>
    <p>{{ greeting }}</p>
    <app-container appTemplateOutlet="myIcon"></app-container>

    <app-template myIcon>
      <svg height="100" width="100">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          stroke-width="3"
          fill="yellow"
        />
      </svg>
    </app-template>

    <script src="./dist/index.js"></script>
    <script>
      window.onload = () => {
        const templateEngine = new HtmlLightweightTemplateEngine({
          pageTitle: "Mia's Blog",
          greeting: 'Good evening'
        })
        templateEngine.renderTemplate()
      }
    </script>
  </body>
</html>
```

<br>
<br>

![Example](https://github.com/datomarjanidze/html-lightweight-template-engine/blob/main/example.png?raw=true)

### Specs

- `HtmlLightweightTemplateEngine` class constructor parameters:
  - `texts` {[key: string]: string}: interpolation key-values
  - `elementAttributePrefix` {string}: this value is used as a prefix to reference custom elements and attributes. Default - 'app'
