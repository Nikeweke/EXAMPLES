## AMP guidelines

[AMP](https://www.ampproject.org/) is the technology developed by Google to provide improved experience for mobile users, that is supported by Google by caching content rich pages on their servers and improved indexing of those pages.

In order to AMPify article pages in our [Nuxt.js](https://nuxtjs.org/) projects, following steps should be done:

1) General setup of AMP according to [AMP HTML Specification](https://www.ampproject.org/docs/fundamentals/spec)
2) Following certain set of rules while creating pages (will be described below)
3) Parsing of output HTML for /amp pages via custom parser function, to apply all requirements and validations of route render.

#### General setup

In our application, we've came up with custom solution for AMP pages.

First thing, we should have a separate `*.vue*` template for every dynamic article or content rich page route with `/amp` child route.
This route will have [AMP script](https://www.ampproject.org/docs/getting_started/create/basic_markup) injected and will have a `<link rel="canonical" href="{Link to original}"` tag, that will point to original page

Secondary, we will have to parse HTML output of `/amp` pages with custom
function, that we call `ampify`.

To do that, we will use Nuxt `hooks` property in `nuxt.config.js`
and use `render:route` hook specifically. Hook handler receives two arguments that we will use `url, html`.
What is left at this point, is to check if `url` ends with `/amp` and apply our custom parser to `html` output string if it does.

#### Rules to follow

There is a bunch of rules that Google requires pages to follow in order to be considered valid AMP pages.
Here will be pointed just few of them, the most relevant and easy to forget, IMO.

To start with, it is important to know how to check if page [is valid](https://www.ampproject.org/docs/fundamentals/validate). Thankfully, Google provides such tool for developers out of the box.
In order to validate current page for AMP validity, we can simply add `#development` to AMP page url in the browser, regardless of the environment.
Obviously, AMP script should be loaded on the page, in order for debug to work. So it will looks something like:

```
http://localhost:3000/category-slug/article-slug/amp#development
http://fmpedia.lc/category-slug/article-slug/amp#development
```

Okay, so some of [fundamental rules](https://www.ampproject.org/docs/fundamentals/spec) that should be noted during development (others are more relevant to parser function):

- `img, video, audio, iframe` tags should be replaced with alternative name of `amp-img, amp-video, etc`
- `script` tags are not allowed, except for `application/ld+json`, AMP script itself and those that are allowed by Google
- Do not use `!important` CSS tag
- Do not use `style=` html attributes for HTML elements
- Class names should not start with `.amp-`
- `transition` and `@keyframes` CSS property can be only used with `opacity, transform and -vendorPrefix-transform`
- Google Analytics script should be initialized via [amp-analytics](https://www.ampproject.org/docs/analytics/analytics_basics) script

These are the basics, but there are more to be discovered and they strongly depend on situation. Good news, is that we will have separate template file for AMP pages, possibly with special components as well.

#### AMPify parser

The parser itself is used in `route:render` hook inside nuxt.config.js.
The function can be found in `~/utils/ampify.js`.

Here is an example function that will apply general requirements to the output HTML of the page.
Note that this parser is not in it's final form and later it can be extended with tags replacement or any other functionality, depending on requirements and results of AMP validation.

```javascript
/**
 * Function takes Nuxt rendered HTML and modifies it to AMP requirements, which can be found:
 * https://www.ampproject.org/docs/fundamentals/spec#required-markup
 * This is not everything that is necessary to satify AMP
 */

module.exports = function (html) {
  // Collect all styles into a single file and also generate obligatory boilerplate styles
  const collectedStylesStr = generateCustomStyles(html)
  const boilerplateStyles = generateBoilerplateStyles(obligatoryApmStyleSnippet, obligatoryApmStyleSnippetNoScript)

  // Remove all the styles from the html
  html = html.replace(/<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/gi, '')

  // Add collected styles and boilerplate styles to html
  html = html.replace('</head>', boilerplateStyles + '</head>')
  html = html.replace('</head>', collectedStylesStr + '</head>')

  // Add required amp-custom attribute to the single left <style> tag
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')

  // Remove every script tag from generated HTML
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  html = html.replace('<html', '<html ⚡')
  // Remove "as" attribute from <link /> tags as forbidden
  html = html.replace(/ as="script"/g, '')
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  return html
}

// Required [AMP boilerplate](https://www.ampproject.org/docs/fundamentals/spec/amp-boilerplate) code
const obligatoryApmStyleSnippet = 'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}'
const obligatoryApmStyleSnippetNoScript = 'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}'

function generateBoilerplateStyles (ampBoilerplate, ampBoilerplateNoScript) {
  return '<noscript><style amp-boilerplate>' + ampBoilerplateNoScript + '</style></noscript>' +
    '<style amp-boilerplate>' + obligatoryApmStyleSnippet + '</style>'
}

function generateCustomStyles (html) {
  return '<style amp-custom>' + html.match(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/g)
    .join(' ')
    .replace(/<style (.*?)>/g, '')
    .replace(/<\/style>/g, '') + '</style>'
}
```

Currently, these steps are implemented, as expected according to AMP specs:

- Remove all `<style>` tags from the page and put their content inside a single `style` tag
- Rename created `style` tag to valid AMP one: `<style amp-custom>`
- Generate and include AMP boilerplate styles inside `<style amp-boilerplate>` tag
- Remove all the script tags from the page
- Add `⚡` to `<html>` tag
- Remove `as` attributes from all `link` tags on the page
- Inject AMP script itself `<script async src="https://cdn.ampproject.org/v0.js"></script>` script (note, this might be transferred to /amp template later)

These are first steps to guide AMP development.
Make sure that any work that is done on `/amp` pages is tested for validation before committing to the repository.
