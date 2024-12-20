console.log('Starting process...');

const fs = require('node:fs');
const { execSync } = require('node:child_process');

const devDependencies = 'typescript webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin ' +
    'mini-css-extract-plugin ts-loader @types/react @types/react-dom';

console.log('Installing dependencies...');

execSync('npm i --save-dev ' + devDependencies);

console.log('Creating files...');

fs.writeFileSync('tsconfig.json', JSON.stringify({
    "compilerOptions": {
        "esModuleInterop": true,
        "jsx": "react-jsx",
        "module": "esnext",
        "moduleResolution": "node",
        "lib": [
            "dom",
            "esnext"
        ],
        "strict": true,
        "sourceMap": true,
        "target": "esnext",
    },
    "exclude": [
        "node_modules"
    ]
}), { flag: 'w+' });

if (!fs.existsSync('public')) fs.mkdirSync('public');

fs.writeFileSync('public/index.html', "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "  <meta charset=\"utf-8\"/>\n" +
    "  <meta name=\"viewport\" content=\"initial-scale=1, width=device-width\"/>\n" +
    "  <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "  <main id=\"root\"></main>\n" +
    "</body>\n" +
    "</html>"
);

if (!fs.existsSync('src')) fs.mkdirSync('src');

fs.writeFileSync('webpack.config.js', "const prod = process.env.NODE_ENV === 'production';\n" +
    "\n" +
    "const HtmlWebpackPlugin = require('html-webpack-plugin');\n" +
    "const MiniCssExtractPlugin = require('mini-css-extract-plugin');\n" +
    "\n" +
    "module.exports = {\n" +
    "  mode: prod ? 'production' : 'development',\n" +
    "  entry: './src/index.tsx',\n" +
    "  output: {\n" +
    "    path: __dirname + '/dist/',\n" +
    "  },\n" +
    "  module: {\n" +
    "    rules: [\n" +
    "      {\n" +
    "        test: /\\.(ts|tsx)$/,\n" +
    "        exclude: /node_modules/,\n" +
    "        resolve: {\n" +
    "          extensions: ['.ts', '.tsx', '.js', '.json'],\n" +
    "        },\n" +
    "        use: 'ts-loader',\n" +
    "      },\n" +
    "      {\n" +
    "        test: /\\.css$/,\n" +
    "        use: [MiniCssExtractPlugin.loader, 'css-loader'],\n" +
    "      },\n" +
    "    ]\n" +
    "  },\n" +
    "  devtool: prod ? undefined : 'source-map',\n" +
    "  plugins: [\n" +
    "    new HtmlWebpackPlugin({\n" +
    "      template: 'public/index.html',\n" +
    "    }),\n" +
    "    new MiniCssExtractPlugin(),\n" +
    "  ],\n" +
    "};");

console.log('Installing React...');

execSync('npm i react react-dom');

console.log('Creating index.tsx and app.tsx...');

fs.writeFileSync('src/app.tsx',
    "import React from 'react'\n" +
    "\n" +
    "export default function App() {\n" +
    "  return (<></>);\n" +
    "}");

fs.writeFileSync('src/index.tsx',
    "import { createRoot } from 'react-dom/client'\n" +
    "import App from './app'\n" +
    "\n" +
    "const container = document.getElementById('root')!;\n" +
    "const root = createRoot(container);\n" +
    "root.render(<App />);");