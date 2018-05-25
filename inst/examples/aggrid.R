# !formatR
library(RagGrid)

m = data.frame(a = 1, b = 2, c = 3)

aggrid(m)
aggrid(as.matrix(m))