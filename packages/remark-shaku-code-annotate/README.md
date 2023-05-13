# remark-shaku-code-annotate

This is a plugin of remark for [shaku-code-annotate](../shaku-code-annotate/)


# How to use

```js
import { remark } from "remark";
import html from "remark-html";
import { remarkShakuCodeAnnotate } from "remark-shaku-code-annotate";

export default async function Page() {
  const processorShaku = remark()
    .use(remarkShakuCodeAnnotate, { theme: "github-light" })
    .use(html, { sanitize: false });

  const markdown = `
\`\`\`js annotate

const blog = "https://jser.dev"
//                    ^
//       [JSer.dev is the homepage for JSer.]
//       [Check it out!]

const blog = "https://jser.dev"
//                    ~~~~~~~~
//       [JSer.dev is the homepage for JSer.]
//       [Check it out!]

const blog = "jser.dev"
//            --------
//          [Check it out!]

const blog = "jser.dev"
//            ........
//          [Check it out!]


const blog = "jser.dev"
//            ........

const blog = "jser.dev"
//            --------
const blog = "jser.dev"
//            ~~~~~~~~

// @highlight
function useSomeEffect({blog}) {
//       ~~~~~~~~~~~~~
  useEffect(() => {
    // do some stuff
    
// @highlight start
      return () => {
        location.href = 'https://jser.dev'
      }
//    ^
// [This cleanup function is super important]
// @highlight end

    }, [blog])
}
\`\`\`
`;

  const resultShaku = await processorShaku.process(markdownShaku);
  ...
}

```

Also you need CSS code to get it rendered nicely, surely you can alter it and adapt to your needs.

```css
pre.shiki .line {
  min-height: 1em;
}

pre.shiki .line.highlight {
  background-color: #dffa83;
  display: block;
}

.shaku-callout {
  background-color: #0685ce;
  color: #fff;
  padding: 0.5em 1ch;
  position: relative;
  margin: 0.5em 0;
  display: inline-block;
  border-radius: 3px;

}

.shaku-callout-arrow {
  width: 1ch;
  height: 1ch;
  display: inline-block;
  background-color: #0685ce;
  position: absolute;
  top: -0.5ch;
  transform: rotate(45deg);
}

.shaku-underline {
  padding: 0 1ch;
  position: relative;
  display: block;
  border-radius: 3px;
  color: red;
  margin: 0.3em 0;
}

.shaku-underline-line {
  line-height: 0;
  top: 0.5em;
  position: absolute;
  text-decoration-line: overline;
  text-decoration-color: red;
  color: transparent;
  pointer-events: none;
  user-select: none;
  text-decoration-thickness: 2px;
}

.shaku-underline-wavy > .shaku-underline-line {
  text-decoration-style: wavy;
  top: 0.7em;
}

.shaku-underline-solid > .shaku-underline-line{
  text-decoration-style: solid;
}

.shaku-underline-dotted > .shaku-underline-line{
  text-decoration-style: dotted;
}
```