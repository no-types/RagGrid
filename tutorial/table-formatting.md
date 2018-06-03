## Format Columns

Here's an example of how you can format the table columns as currency , percentages  or any options supported by numeraljs.

Please check out [numeraljs](http://numeraljs.com/) for all the options that can be used.

```r
library(RagGrid)
m = cbind(matrix(rnorm(60, 1e5, 1e6), 20), runif(20), rnorm(20, 100))
colnames(m) = head(LETTERS, ncol(m))
# Format Column A,C as currency and Column D as percentage.
formattingOptions <- list(A='$0,0.00',C='$00.00',D ='0.00%')
aggrid(m,formattingOptions = formattingOptions)

```
![](assets/table-formatting.png)
![](/assets/table-formatting.png)

Here's another example for number formatting.Let's do a million/thousand formatting on Column B. This can be achieved with a format string like '0a'

```r
library(RagGrid)
m = cbind(matrix(rnorm(60, 1e5, 1e6), 20), runif(20), rnorm(20, 100))
colnames(m) = head(LETTERS, ncol(m))
# Format Column A,C as currency and Column D as percentage.
formattingOptions <- list(A='$0,0.00',B='0.0a',C='$00.00',D ='0.00%')
aggrid(m,formattingOptions = formattingOptions)

```
![](assets/table-formatting-example2.png)
![](/assets/table-formatting-example2.png)