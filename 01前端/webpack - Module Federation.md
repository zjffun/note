---
date: 'Sat, 07 May 2022 13:55:17 GMT'
updated: 'Sat, 07 May 2022 13:57:25 GMT'
---

> Module Federation allows a JavaScript application to dynamically load code from another application and in the process, share dependencies.

e.g.: Let application A use the Component1 of application B. Module Federation can make the Component1 like an independent resource and application A and application B use the same one.

```js
// A
new ModuleFederationPlugin({
  name: "appA",
  remotes: {
    appB: "appB",
  },
  shared: ["react", "react-dom"],
});

// B
new ModuleFederationPlugin({
  name: "appB",
  filename: "remoteEntry.js",
  exposes: {
    Component1: "./src/Component1",
  },
  shared: ["react", "react-dom"],
});
```

See:

-   [Webpack 5 Federation. A Game-changer to Javascript architecture. - inDepthDev](https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture#its-important-to-note-these-are-special-entry-points-they-are-only-a-few-kb-in-size-containing-a-special-webpack-runtime-that-can-interface-with-the-host-it-is-not-a-standard-entry-point--7/)
