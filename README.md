<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/hghammoud/ngx-inovisum/master/demo/src/assets/logo.svg">
</p>

# ngx-inovisum - Angular library built to bootstrap jhisper backend

[![npm version](https://badge.fury.io/js/ngx-inovisum.svg)](https://badge.fury.io/js/ngx-inovisum),
[![Build Status](https://travis-ci.org/hghammoud/ngx-inovisum.svg?branch=master)](https://travis-ci.org/hghammoud/ngx-inovisum)
[![Coverage Status](https://coveralls.io/repos/github/hghammoud/ngx-inovisum/badge.svg?branch=master)](https://coveralls.io/github/hghammoud/ngx-inovisum?branch=master)
[![dependency Status](https://david-dm.org/hghammoud/ngx-inovisum/status.svg)](https://david-dm.org/hghammoud/ngx-inovisum)
[![devDependency Status](https://david-dm.org/hghammoud/ngx-inovisum/dev-status.svg?branch=master)](https://david-dm.org/hghammoud/ngx-inovisum#info=devDependencies)

## Demo

View all the directives in action at https://hghammoud.github.io/ngx-inovisum

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-inovisum` via:
```shell
npm install --save ngx-inovisum
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-inovisum`:
```js
map: {
  'ngx-inovisum': 'node_modules/ngx-inovisum/bundles/ngx-inovisum.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-inovisum';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-inovisum';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-inovisum';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 Hassan Hammoud. Licensed under the MIT License (MIT)

