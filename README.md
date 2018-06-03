# R ag-Grid

[![Build Status](https://travis-ci.com/no-types/RagGrid.svg?branch=master)](https://travis-ci.com/no-types/RagGrid)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/#active)
[![GitHub issues](https://img.shields.io/github/issues-raw/no-types/RagGrid.svg)](https://github.com/no-types/RagGrid/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/no-types/RagGrid.svg)](https://github.com/no-types/RagGrid/issues)

R interface to ag-grid.

This package provides a function `aggrid()` to display R data via the [ag-grid](https://www.ag-grid.com/) library.

## Installation

We're still actively developing and hopefully it'll be available in CRAN soon. 

But feel free to install from github.
You may install the development version using **devtools**:

```r

# the development version
devtools::install_github('no-types/RagGrid')

# then try RagGrid::aggrid(iris) as a hello world example
```
![](assets/aggrid-basic-usage.gif)

### Tutorial
1. [Grid Options](tutorial/basic-configuration.md)
2. [Table Formatting Options](tutorial/table-formatting.md)
3. [Integration with Shiny](tutorial/shiny.md)
4. [Cross Talk Demo](tutorial/cross-talk-demo.md)


## Licensing
RagGrid has a dependency on ag-Grid which provides community and enterprise options. We've bundled both the versions in this package. Please review the licensing options and terms before you use this software.  [(https://www.ag-grid.com/license-pricing.php)](https://www.ag-grid.com/license-pricing.php)