# Obfuscate My Code
You can use this to obfuscate (AND, OR) minify your project files so it can't be easily stolen or to make it very hard to read.

## Installation
### npm
```ruby
 $ npm i obfuscate-my-code --save-dev
```
### yarn
```ruby
 $ yarn add obfuscate-my-code --save-dev
```
### pnpm
```ruby
 $ pnpm add obfuscate-my-code --save-dev
```

## Example Code
### Typescript :
```ts
import path from 'path';
import { OBFMC } from 'obfuscate-my-code';

const obf: OBFMC = new OBFMC();
obf.silentLog = true; // Default is false
obf.obfuscate('js', path.join(__dirname, '/mycodedir/'), 'browser');
obf.minifyDir(path.join(__dirname, '/i/want/to/minify/this/dir/'));
```
### Javascript :
```js
const path = require('path');
const { OBFMC } = require('obfuscate-my-code');

const obf = new OBFMC();
obf.silentLog = true; // Default is false
obf.obfuscate('js', path.join(__dirname, '/mycodedir/'), 'browser');
obf.minifyDir(path.join(__dirname, '/i/want/to/minify/this/dir/'));
```

## About obfuscate() last argument
Last argument of obfuscate() function is the options of the obfuscater and how it will obfuscate your files, It's optional there's options by default. But if you want to change it see https://obfuscator.io/ all the options of the page is the same as the argument.

### Default Options :
```ts
{
    compact: true,
    simplify: true,
    stringArray: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayThreshold: 0.75,
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayWrappersCount: 1,
    stringArrayWrappersType: 'variable',
    stringArrayWrappersChainedCalls: true,
    target: obfuscateTargetType,
    seed: 0,
    deadCodeInjection: false,
}
```

### If you get any bug please let me know in the issues page.