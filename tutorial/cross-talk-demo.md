## Crosstalk Supoort

Crosstalk is an add-on to the htmlwidgets package. It extends htmlwidgets with a set of classes, functions, and conventions for implementing cross-widget interactions (currently, linked brushing and filtering). [(http://rstudio.github.io/crosstalk/index.html)](http://rstudio.github.io/crosstalk/index.html) 

RagGrid supports cross-talk. Please see the example below.

```r
library(crosstalk)
library(leaflet)
library(RagGrid)

# Wrap data frame in SharedData
sd <- SharedData$new(quakes[sample(nrow(quakes), 100),])

# Use SharedData like a dataframe with Crosstalk-enabled widgets
bscols(
  leaflet(sd) %>% addTiles() %>% addMarkers(),
  aggrid(sd)
)

```
![](assets/cross-talk-demo.png)
![](/assets/cross-talk-demo.png)