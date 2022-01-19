# Eslint plugin mobx observer checker

> Plugin for eslint that checks if you import svg incorrect (see exmaples..)

## Table of Contents

* [Installation](#installation)
* [Config](#config)
* [What you need for linter works](#what-you-need-for-linter-works)
* [Example](#example)

## Installation

```sh
$ npm install eslint-plugin-svg-import-helper --save-dev
```

## Config

Update eslint config

```js
"plugins": [
	...
	"svg-import-helper"
],
"rules": {
	...
	"svg-import-helper/correct-import": "warn"
}
```

## What you need for linter works

Modify webpack config. `svg?url` imported like url, `svg` with `@svgr/webpack`:

```js
			{
				test: /\.svg$/,
				oneOf: [
					{
						resourceQuery: /url/,
						issuer: /\.(js|ts)x?$/,
						type: 'asset/resource',
						generator: {
							filename: 'images/[name].[contenthash][ext]',
						},
					},
					{
						type: 'asset/resource',
						issuer: /\.(s?css|sass)$/,
						generator: {
							filename: 'images/[name].[contenthash][ext]',
						},
					},
					{
						issuer: /\.(js|ts)x?$/,
						use: '@svgr/webpack',
					}
				]
			},
```

## Example

```js
// Error
import Twitter from 'icons/twitter.svg?url';
import twitter from 'icons/twitter.svg';

// Good 
import Twitter from 'icons/twitter.svg';
import twitter from 'icons/twitter.svg?url';

<Twitter />
<img srg={twitter} alt='twitter logo'>
```
