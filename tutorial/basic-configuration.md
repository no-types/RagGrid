## RagGrid Configuration

Grid options can be passed to ```aggrid()``` using the ```options``` arguments. The package passes the below properties as default options to aggrid(). 

Please read through the aggrid documentation [(https://www.ag-grid.com/javascript-grid-properties/)](https://www.ag-grid.com/javascript-grid-properties/) to configure the grid's properties.

### Default Grid options - Community Edition

| Property        | Value           |
| ------------- |:-------------:|
| rowSelection      | multiple |
| enableSorting      | true      |
| enableFilter | true      |
| enableRangeSelection | false      |
| enableColResize | true      |
| pagination | true      |
| paginationAutoPageSize | true   |

Here are a few examples
```r
library(RagGrid)
#Disable pagination
aggrid(iris,options=list(pagination = FALSE))

#Set 50 items per page
aggrid(iris,options=list(paginationAutoPageSize = FALSE,paginationPageSize=50))

# Sort by multiple column. Multiple column selection is achieved by holding down Control and selecting multiple columns.
aggrid(iris,options=list(paginationAutoPageSize = FALSE,paginationPageSize=50,multiSortKey='ctrl'))
```

### Default Grid options - Enterprise edition ( + Community Edition )

| Property        | Value           |
| ------------- |:-------------:|
| enableStatusBar    | true |
| alwaysShowStatusBar      | false      |
| suppressDragLeaveHidesColumns | true      |
| suppressMakeColumnVisibleAfterUnGroup | true      |
| enableColResize | true      |
| pagination | true      |
| paginationAutoPageSize | true      |