# !formatR
library(RagGrid)
m = cbind(matrix(rnorm(60, 1e5, 1e6), 20), runif(20), rnorm(20, 100))
colnames(m) = head(LETTERS, ncol(m))
# Format Column A,C as currency and Column D as percentage.
formattingOptions <- list(A='$0,0.00',C='$00.00',D ='0.00%')
aggrid(m,formattingOptions = formattingOptions)

# Format Column A,C as currency and Column D as percentage.Number format on Column B.
formattingOptions <- list(A='$0,0.00',B='0.0a',C='$00.00',D ='0.00%')
aggrid(m,formattingOptions = formattingOptions)