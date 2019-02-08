# Webpack
[Webpack Documentation](https://webpack.js.org/guides/)

## Installation:
- Create project directory and cd into it
	- mkdir webpack-demo && cd webpack-demo
- Set up NPM to establish dependencies
	- Run ```npm init```
	- Mark json package as private to prevent accidental publishing of code
		- ```"private": true,```
- Install webpack and webpack cli
	- ```npm install --save-dev webpack webpack-cli```

###Create a Bundle
- Create index.html into dist
```
<!doctype html>
<html>
	<head>
		<title>Asset Management</title>
	</head>
	<body>
		<script src="./bundle.js"></script>
	</body>
</html>
```
- Create style.css into src
- Create index.js into src

```
import _ from 'lodash';
import './style.css';

function component() {
    let element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
  
    return element;
  }
  
document.body.appendChild(component());
```

- Install lodash to read global variable of '_'
```npm install --save lodash```

- run 'npx webpack' to take our script at src/index.js as the entry point, and generate dist/main.js as the output
	- If installed correctly index.html should return "Hello webpack"

#### Create webpack config file:
	
- Install xcode/clt if needed
	- npm install xcode 
- Create config file
```touch webpack.config.js```

```
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	}
};
```

- Tell webpack which config file to point to
	- ```npx webpack --config webpack.config.js```
- [Generate Custom Config Files](https://generatewebpackconfig.netlify.com/)
			
##### NPM Scripts:
- Add build script to json to automate build from cli
	- ```"build": "webpack"```		
- Instead of npx run new build command
	- ```npm run build``` 

## Asset Management

#### Loading CSS & SASS
		
- Install dependencies for css and sass. Chain css loader with sass-loader to be peer dependencies to immediately apply all styles to the DOM.

```
npm install node-sass mini-css-extract-plugin css-loader style-loader sass-loader --save-dev
```
	
- Add module to config file to include style loader and css loader
 
```
module: {
	rules: [
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		}
	]
}
```

#### Loading Images:
- Install file loader

```
npm install --save-dev file-loader
```

- Add image file to src folder
- Import image to index.js

```
import Icon from './icon.png';
```
- Add the image to our existing div

```
var myIcon = new Image();
myIcon.src = Icon;

element.appendChild(myIcon);
```

- Add image to stylesheet

```
background: url('./icon.png');
```

- A logical next step from here is minifying and optimizing your images. Check out the image-webpack-loader and url-loader for more on how you can enhance your image loading process.

#### Loading Fonts:
- Update config file to handle fonts

```
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
    'file-loader'
    ]
}
```
- Include fonts to src directory
- Incorporate fonts via fontface (Found that woff files work here)

```
@font-face {
  font-family: 'MyFont';
  src:  url('./my-font.woff') format('woff');
}

font-family: 'MyFont';
```


## Output-Management
#### Step 1: Preparation
- Set up HtmlWebpackPlugin to generate its own newly generated index file.
	- ```npm install --save-dev html-webpack-plugin```
- Add const and plugin to config file
	- ```const HtmlWebpackPlugin = require('html-webpack-plugin');```
	- ```plugins: [ new HtmlWebpackPlugin({title: 'Output Management'}) ]```
			
- [Additional Resources](https://github.com/jaketrent/html-webpack-template)

#### Step 2: Clean Up Dist Folder
- In general it's good practice to clean the /dist folder before each build, so that only used files will be generated.
- Install CleanWebpackPlugin
	- ```npm install --save-dev clean-webpack-plugin```
- Add const and plugin to plugin to config file
	- ```const CleanWebpackPlugin = require('clean-webpack-plugin');```
	- ```plugins: [ new CleanWebpackPlugin(['dist']) ]```


## Development Environment
	Note: These tools are used for local environment only

- Set mode to development
	- In config add ```mode: 'development',``` before entry
- Set up source maps to track errors and warnings to specific files within a bundle. Errors will show up in console.
	- Add inline-source-map to config under entry
		- ```devtool: 'inline-source-map',```

#### Development tools (Watchlist, Dev Server, and/or Dev Middleware):
- Once these are installed you can run server by using either:
	- Watchlist: npm run watch
	- Dev Server: npm start
	- Dev Middleware: npm run server
	- Note: This will remove the dist folder from working directory and keep in memory. Run npm run build to bundle files into dist.

##### Watchlist (This will require a page refresh):
- Add watch mode to json scripts before build
	- ```"watch": "webpack --watch"```

##### Webpack Dev Server
- Install webpack dev server
	- ```npm install --save-dev webpack-dev-server```
- Add server to config file and specify the dist folder (This tells webpack-dev-server to serve the files from the dist directory on localhost: 8080).
	- ```devServer: { contentBase: './dist' },```
- Add script to json to run dev server
	- ```"start": webpack-dev-server --open",```
- Next: [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)

##### Dev Middleware
- Install express and web dev middleware to wrap and emit files processed by webpack to a server. 
	- ```npm install --save-dev express webpack-dev-middleware```
- Add public path to config file output
	- ```publicPath: '/'```
- Set up custom express server
	- Create server.js in root
		
		```
		const express = require('express');
		const webpack = require('webpack');
		const webpackDevMiddleware = require('webpack-dev-middleware');

		const app = express();
		const config = require('./webpack.config.js');
		const compiler = webpack(config);

		// Tell express to use the webpack-dev-middleware and use the webpack.config.js
		// configuration file as a base.
		app.use(webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath
		}));

		// Serve the files on port 3000.
		app.listen(3000, function () {
		console.log('Example app listening on port 3000!\n');
		});
		```
		
	- Add script to json to make it run  easier on the server ```"server": "node server.js",```

##### Adjust Text Editor (Optional)
- If using sublime, webstorm, or vim - [Disable safewrite mode](https://webpack.js.org/guides/development/#adjusting-your-text-editor)