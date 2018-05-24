# !formatR
library(RagGrid)

# see the package vignette for examples and the link to website
vignette('RagGrid', package = 'RagGrid')


 m = data.frame(a = 1, b = 2, c = 3)

aggrid(m)
aggrid(as.matrix(m))