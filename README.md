# Neural Patterns

This repo contains the source code for [neuralpatterns.io](https://neuralpatterns.io/), which is a web toy for generating simple neural cellular automata in the browser. It uses webgl to run the core simulation, which is a 3x3 convolution followed by an activation function applied to each pixel. [The code is open source under the mit license](https://github.com/MaxRobinsonTheGreat/webgl-convolution/blob/main/LICENSE).

## To run locally

Clone this repo and run this command
```
npm install
```

This is a standard vue project, and the following npm scripts run the standard vue controls:
```
npm run serve
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
