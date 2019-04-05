# react-searchbar

A prebuilt react searchbar with

- Accessbility
- Autosuggest / Autocomplete
- Callbacks for search submission and value change

[![NPM](https://img.shields.io/npm/v/react-searchbar.svg)](https://www.npmjs.com/package/react-searchbar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-searchbar
```

## Usage

```jsx
import React, { Component } from 'react'

import Searchbar from 'react-searchbar'

class Example extends Component {
  render () {
    return (
      <Searchbar />
    )
  }
}
```
### Examples

#### Basic use case

You can simply include <Searchbar> to your component and start using the library

```jsx
import React, { Component } from 'react'

import Searchbar from 'react-searchbar'

class Example extends Component {
  render () {
    return (
      <Searchbar onChange={this.handleFieldChange} autosuggestCount={15} handleSearch={(e)=>this.handleSearch()} selectSuggestion={this.handleSelectedSuggestion} prompt={names}></Searchbar>
    )
  }
}
```
This will inturn generate a HTML as the following
```html
<form>
   <div class="searchbar-collection-container">
      <div class="searchbar-container">
         <input type="text" id="searchbar-input" class="searchbar-input" name="st" maxlength="90" placeholder="Search" aria-label="Type to search. Navigate below to hear suggestions" autocomplete="off" autocorrect="off" autocapitolize="off" spellcheck="false" value="">
      </div>
      <div class="searchbar-buttons-container">
         <button type="submit" class="buttons" aria-label="submit search" title="Search">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
         </button>
      </div>
   </div>
</form>
```

## License

MIT © [dhirajsriram](https://github.com/dhirajsriram)
