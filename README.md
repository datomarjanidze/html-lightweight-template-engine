## HTML Lightweight Template Engine v1.2.0 Documentation

<p align="center">
  <a href="https://www.npmjs.com/package/html-lightweight-template-engine" target="_blank"><img src="https://img.shields.io/npm/v/html-lightweight-template-engine.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/html-lightweight-template-engine" target="_blank"><img src="https://img.shields.io/npm/l/html-lightweight-template-engine.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/html-lightweight-template-engine" target="_blank"><img src="https://img.shields.io/npm/dm/html-lightweight-template-engine.svg" alt="NPM Downloads" /></a>
</p>

### Table of contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage example](#Usage-example)
- [API](#API)

### Description

When you simply want to use template interpolation `{{ someValue }}` and
Angular like `ng-container` and `ng-template` elements (with the limited
functionality) in plain HTML without any frameworks, you can use this
library to do that.

### Installation

For the usage in ESM run the following command:

```console
npm i html-lightweight-template-engine
```

For the script tag usage include the following script:

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/html-lightweight-template-engine@1.2.0/dist/html-lightweight-template-engine.min.js"></script>
  </body>
</html>
```

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

    <script src="https://cdn.jsdelivr.net/npm/html-lightweight-template-engine@1.2.0/dist/html-lightweight-template-engine.min.js"></script>
    <script>
      window.onload = () => {
        const templateEngine =
          new htmlLightweightTemplateEngine.HtmlLightweightTemplateEngine({
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

### API

- `HtmlLightweightTemplateEngine` class constructor parameters:
  - `texts` {[key: string]: string}: interpolation key-values
  - `elementAttributePrefix` {string}: this value is used as a prefix to reference custom elements and attributes. Default - 'app'
