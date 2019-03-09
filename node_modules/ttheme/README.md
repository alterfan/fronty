# TTheme

TTheme is a YAML/JSON to PLIST/TMTHEME converter, heavily based off of [Aroma](https://github.com/jisaacks/Aroma).

# WTF?
I built this to generate [Oblivion](http://github.com/jbrooksuk/Oblivion) colour schemes much faster, allowing me to iterate current versions and generate variations with little work.

# Usage

## Compile a single file
`$ ttheme -c tests/oblivion.ttheme.js`

## Compile all the ttheme files in `src` and put them into `output`
`$ ttheme -o src -c output`

## Watch the current directory for changes and automatically compile
`$ ttheme -w`

## Specify what extension to save as - defaults to `tmTheme`
`$ ttheme -e "plist"`

# Installation
`npm install -g ttheme`

# License
MIT - [http://jbrooksuk.mit-license.org](http://jbrooksuk.mit-license.org)