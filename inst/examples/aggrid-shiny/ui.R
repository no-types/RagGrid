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