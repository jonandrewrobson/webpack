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