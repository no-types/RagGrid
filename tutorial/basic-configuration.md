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

### Column Definition options
Column definition options can be passed to ```aggrid()``` using the ```colOpts``` arguments. 

Please go over the documentation [(https://www.ag-grid.com/javascript-grid-column-properties/)](https://www.ag-grid.com/javascript-grid-column-properties/)  to configure the column properties.

Here's an example of how you can use it.

```r
library(RagGrid)
# Rename the column header name to "Sepal Length" for example
colOpts = list(Sepal.Length=list(headerName='Sepal Length'))
aggrid(iris,options=list(pagination = FALSE),colOpts =colOpts )

#You can pin a column by using the pinned property
colOpts = list(Sepal.Length=list(headerName='Sepal Length',pinned='left'))
aggrid(iris,options=list(pagination = FALSE),colOpts =colOpts )

#Sort by a column Sepal.Length 'asc'
colOpts = list(Sepal.Length=list(sort='asc'))
aggrid(iris,options=list(pagination = FALSE),colOpts =colOpts )


#Multiple sort (Sort by Sepal.Length 'asc' followed by Sepal.Width 'desc' )
colOpts = list(Sepal.Length=list(sort='asc'),Sepal.Width=list(sort='desc'))
aggrid(iris,options=list(pagination = FALSE),colOpts =colOpts )
```

## Enterprise mode

Enterprise mode will be enabled by passing the ```licenseKey``` option. Enterprise provides a lot of features like row grouping, pivoting, status bar.

```r
aggrid(iris,licenseKey=<YOUR LICENSE KEY>)
```

### Enterpise Demo
![](assets/enterprise-options.gif)
![](/assets/enterprise-options.gif)


### Default Grid options - Enterprise edition ( + Community Edition )

| Property        | Value           |
| ------------- |:-------------:|
| enableStatusBar    | true |
| alwaysShowStatusBar      | false      |
| suppressDragLeaveHidesColumns | true      |
| suppressMakeColumnVisibleAfterUnGroup | true      |
