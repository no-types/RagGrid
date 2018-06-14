# R ag-Grid


[![CRAN_Status_Badge](https://www.r-pkg.org/badges/version/RagGrid?color=brightgreen)](https://cran.r-project.org/package=RagGrid)
[![Rdoc](http://www.rdocumentation.org/badges/version/RagGrid)](http://www.rdocumentation.org/packages/RagGrid)
[![Build Status](https://travis-ci.com/no-types/RagGrid.svg?branch=master)](https://travis-ci.com/no-types/RagGrid)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](http://www.repostatus.org/badges/latest/active.svg)](http://www.repostatus.org/#active)
[![GitHub issues](https://img.shields.io/github/issues-raw/no-types/RagGrid.svg)](https://github.com/no-types/RagGrid/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/no-types/RagGrid.svg)](https://github.com/no-types/RagGrid/issues)

R interface to ag-grid.

This package provides a function `aggrid()` to display R data via the [ag-grid](https://www.ag-grid.com/) library.

## Installation


You may install from CRAN or the development version from github using **devtools**:

```r
# install from CRAN
install.packages("RagGrid")

# the development version
devtools::install_github('no-types/RagGrid')

# then try RagGrid::aggrid(iris) as a hello world example
```
![](https://github.com/no-types/RagGrid/raw/master/assets/aggrid-basic-usage.gif)

### Tutorial
1. [Grid Options](tutorial/basic-configuration.md)
2. [Table Formatting Options](tutorial/table-formatting.md)
3. [Integration with Shiny](tutorial/shiny.md)
4. [Cross Talk Demo](tutorial/cross-talk-demo.md)
5. [Theme](tutorial/theme.md)


## Licensing
RagGrid has a dependency on ag-grid v17.1.1 which provides community and enterprise options. We've bundled both the versions in this package. Please review the licensing options and terms before you use this software.  [(https://www.ag-grid.com/license-pricing.php)](https://www.ag-grid.com/license-pricing.php)

Thanks to [DT](https://rstudio.github.io/DT) for providing a lot of samples which we've used here in the documentation.
