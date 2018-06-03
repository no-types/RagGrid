## RagGrid in Shiny

Here's an example of RagGrid in shiny.Use the functions RagGridOutput() and renderRagGrid().

#### ui.R
```r
library(shiny)

shinyUI(fluidPage(
  title = 'Use the RagGrid package in shiny',
  h1('A Table Using aggrid'),
  fluidRow(
    column(2),
    column(8, RagGrid::RagGridOutput('tbl1')),
    column(2)
  )
))

```

#### server.R
```r
library(shiny)
library(RagGrid)


shinyServer(function(input, output, session) {
    output$tbl1 <- renderRagGrid(
        aggrid(iris)
     )
})
```

The example is also included in the /examples folder.
You can run this using

```r
shiny::runApp('inst/examples/aggrid-shiny')
```

![](assets/shiny-example.png)
![](/assets/shiny-example.png)
