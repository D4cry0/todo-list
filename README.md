# Webpack Starter

Es es el proyecto inicial para crear aplicaciones utilizando webpack.

### Notas:
Git .gitignore
node_modules/ - Porque son modulos que se consiguen de npm
dist/ - porque es la version de desarrollo

---

#### **CONFIGURACIÓN INICIAL**
Incializamos el proyecto en npm
```
npm init
```

Inicializamos e instalamos webpack en nuestro proyecto
```
npm install webpack webpack-cli --save-dev
```
https://webpack.js.org/guides/getting-started/


Agregamos a package.json en la parte de scripts
```
"build": "webpack --config webpack.prod.js"
"build:dev": "webpack --config webpack.config.js"
```
https://webpack.js.org/configuration/


En webpack.config.js
```
mode: 'development',

output: {
    clean: true
},
```


En webpack.prod.js
```
mode: 'production',

output: {
    clean: true,
    filename: 'main.[contenthash].js'
},
```
---

#### **HtmlWebpackPlugin y html-loader**
Minimizar HTML y agregarlo a las carpetas de dist

https://webpack.js.org/plugins/html-webpack-plugin/

https://webpack.js.org/loaders/html-loader/

webpack.prod.js y webpack.config.js

```
rules
{
    test: /\.html$/,
    loader: 'html-loader',
    options: {
        sources: false
    }
},
```
```
const HtmlWebpackPlugin    = require('html-webpack-plugin');

plugins
new HtmlWebpackPlugin({
    title: 'Template',
    filename: 'index.html',
    template: './src/index.html'
})
```
---
#### **DevServer**
Servidor de pruebas para desarrollo

https://webpack.js.org/configuration/dev-server/

```
npm i -D webpack-dev-server
```

Agregamos a package.json en la parte de scripts
```
"start": "webpack serve --config webpack.config.js --open --port=8080"
```

Para correrlo
```
npm start
```
---
#### **css-loader y style-loader**
Manipular e inyectar el CSS en los componentes/DOM de Javascript

https://webpack.js.org/loaders/css-loader/

https://webpack.js.org/loaders/style-loader/

webpack.prod.js y webpack.config.js
```
rules
{
    test: /\.css$/,
    exclude: /styles.css$/,
    use: [ 'style-loader', 'css-loader' ],
},
```
---
#### **MiniCssExtractPlugin**
Extrae el CSS de diferentes archivos para cada archivo de JS esto los coloca en el Dist
Tambien sirve para los CSS globales (se va usar mas para los globales en nuestro caso)

https://webpack.js.org/plugins/mini-css-extract-plugin/

webpack.prod.js y webpack.config.js
```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

rules
{
    test: /styles.css$/,
    use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
},

plugins - webpack.config.js
new MiniCssExtractPlugin({
    filename: '[name].css',
    ignoreOrder: false,
}),

plugins - webpack.prod.js
new MiniCssExtractPlugin({
    filename: '[name].[fullhash].css',
    ignoreOrder: false,
}),
```
---
#### **file-loader**
Resuelve la importacion y manipulacion de archivos

https://v4.webpack.js.org/loaders/file-loader/

webpack.prod.js y webpack.config.js
```
rules
{
    test: /\.(png|jpe?g|gif)$/,
    loader: 'file-loader',
},
```
---
#### **CopyWebpackPlugin**
Copia los assets en este caso archivos estaticos en el dist

https://webpack.js.org/plugins/copy-webpack-plugin/#root

webpack.prod.js y webpack.config.js
```
const CopyPlugin           = require("copy-webpack-plugin");

plugins
new CopyPlugin({
    patterns: [
        { from: "src/assets/", to: "assets/" },
    ]
}),

```
---
#### **CssMinimizerPlugin y TerserPlugin**
Solo para el de producción
Optimizaciones de codigo 1 para minimizar el codigo css
Terser para sobrescribir

https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#minify

https://webpack.js.org/configuration/optimization/#optimizationminimizer

webpack.prod.js
```
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin');
const TerserPlugin         = require('terser-webpack-plugin');


optimization: {
    minimize: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin(),
    ]
},
```
---
#### **Babel**
Solo para producción
Es un conversor de JS Moderno a JS antiguo antes de la version ES6

https://babeljs.io/

```
npm install --save-dev babel-loader @babel/core

webpack.prod.js
rules
{
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
        presets: ['@babel/preset-env']
        }
    }
}

npm install @babel/preset-env --save-dev

babel.config.json
{
    "presets": ["@babel/preset-env"]
}
```
---
#### **Reconstruir modulos y dist**
Para reconstruir los modules de Node
```
npm install
```

y para construir el build
```
npm run build
```

