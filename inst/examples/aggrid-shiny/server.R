library(shiny)
library(RagGrid)


shinyServer(function(input, output, session) {
    output$tbl1 <- renderRagGrid(
        aggrid(iris)
     )
})