# webpack
Basic installation of webpack project.


Webpack

<Installation:>
	- Create project directory and cd into it
		- mkdir webpack-demo && cd webpack-demo
	- Set up NPM in project
		- npm init
		- creates json and tracks dependencies
	- Install webpack, cli, and server locally
		- npm install --save-dev webpack webpack-cli webpack-web-server

	Create Directory Structure
		  webpack-demo
			|- package.json
		 	|- /dist
		 		|- index.html
			|- /src
				|- index.js

		- npm install --save lodash to read global variable of '_'
		- run 'npx webpack' to take our script at src/index.js as the entry point, and generate dist/main.js as the output
		- If installed correctly index.html should return "Hello webpack"

	Create webpack config file
		- Install xcode/clt if needed
		- touch webpack.config.js
		- npx webpack --config webpack.config.js

		For more complex config files:
		- https://generatewebpackconfig.netlify.com/
		- install dependencies
			- npm install node-sass mini-css-extract-plugin css-loader sass-loader --save-dev
			
	NPM Scripts:
		- Add '"build": "webpack"' to scripts in .json
		- npm run build command can be used now in place of the npx

ASSET MGMT

	- Change script src in html to ./bundle.js
	- Change filename to bundle.js in config file

	Loading CSS:
		- Add style-loader and css-loader
			- npm install --save-dev style-loader css-loader
		- Add module to config file to include
			```module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							'style-loader',
							'css-loader'
						]
					}
				]
			}```'
        - Create css file
        - Import to index.js
            - import './style.css';
            - element.classList.add('hello');

    Loading Images:
        - Install file loader
            - npm install --save-dev file-loader
        - Add icon file to src
        - Import icon to main.js
            - import Icon from './icon.png';
            - Add the image to our existing div.
                ```var myIcon = new Image();
                myIcon.src = Icon;

                element.appendChild(myIcon);```
            - Add image to stylesheet
                - background: url('./icon.png');
        - A logical next step from here is minifying and optimizing your images. Check out the image-webpack-loader and url-loader for more on how you can enhance your image loading process.

    Loading Fonts:
        - Update config to handle fonts
            -   ```{
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                    'file-loader'
                    ]
                }```
        - Include fonts to src directory
        - Incorporate fonts via fontface (Found that woff files work here)


    <!-- Loading SASS
        - Install sass-loader
            - npm install sass-loader node-sass webpack --save-dev
        - Chain css loader with sass-loader to be peer dependencies to immediately apply all styles to the dom
            -  -->


<Output-Management>
	- Step 1: Preparation
		- Set up HtmlWebpackPlugin
			- npm install --save-dev html-webpack-plugin
			- Add const and plugin to config file
				- const HtmlWebpackPlugin = require('html-webpack-plugin');
				- 	plugins: [
					new HtmlWebpackPlugin({
						title: 'Output Management'
					})
					],
			- Additional resources: https://github.com/jaketrent/html-webpack-template

	- Step 2: Clean Up Dist
		- In general it's good practice to clean the /dist folder before each build, so that only used files will be generated.
		- Install CleanWebpackPlugin
			- npm install --save-dev clean-webpack-plugin
			- Add plugin to config


<Development Environment>
	- THESE TOOLS USED FOR LOCAL ENVIRONMENT only
	- Set mode to development
		- In config add ```mode: 'development',```
	- Set up source maps to track errors and warnings to specific files within a bundle. Errors will show up in console.
		- Add inline-source-map to config
			- devtool: 'inline-source-map',

	Development tools (Watchlist, Dev Server, or Dev Middleware):
		- Once these are installed you can run server by using either:
			- Watchlist: npm run watch
			- Dev Server: npm start
			- Dev Middleware: npm run server
		- Watchlist (This will require a page refresh):
			- Add watch mode to json scripts
				- ```"watch": "webpack --watch",```
		- Install webpack dev server
			- npm install --save-dev webpack-dev-server
			- Add server to config file and specify dist folder (This tells webpack-dev-server to serve the files from the dist directory on localhost:8080)
				```devServer: {
					contentBase: './dist'
				},```
			- Add script to json to run dev server
				- "start": webpack-dev-server --open",
			- Once working look into https://webpack.js.org/guides/hot-module-replacement/
		- Dev Middleware
			- Install express and web dev middleware
				- npm install --save-dev express webpack-dev-middleware
				- Add public path to config file output
					- publicPath: '/'
				- Set up custom express server
					- Create server.js in root
				- Populate server.js
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
				- Add script to json to make it run  easier on the server
					```
					"server": "node server.js",
					```
	Adjust Text Editor
		- If using sublime, webstorm, or vim - disable safewrite mode (https://webpack.js.org/guides/development/#adjusting-your-text-editor)
</Development>