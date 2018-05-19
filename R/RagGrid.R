#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
RagGrid <- function(visualData, options=list(), licenseKey=NULL, width = NULL, height = NULL, elementId = NULL) {

  if (crosstalk::is.SharedData(visualData)) {
    # Using Crosstalk
    key <- visualData$key()
    group <- visualData$groupName()
    visualData <- visualData$origData()
  } else {
    # Not using Crosstalk
    key <- NULL
    group <- NULL
  }

  isNumeric = vapply(visualData, is.numeric, logical(1))
  isNumeric = lapply(split(isNumeric, names(isNumeric)), unname)
  # forward options using x
  x = list(
    data = visualData,
    gridOptions=options,
    licenseKey=licenseKey,
    isNumeric=isNumeric,
    settings = list(
      crosstalk_key = key,
      crosstalk_group = group
    )
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'RagGrid',
    x,
    width = width,
    height = height,
    package = 'RagGrid',
    elementId = elementId,
    dependencies = crosstalk::crosstalkLibs()
  )
}


#' Shiny bindings for RagGrid
#'
#' Output and render functions for using RagGrid within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a RagGrid
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name RagGrid-shiny
#'
#' @export
RagGridOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'RagGrid', width, height, package = 'RagGrid')
}

#' @rdname RagGrid-shiny
#' @export
renderRagGrid <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, RagGridOutput, env, quoted = TRUE)
}
