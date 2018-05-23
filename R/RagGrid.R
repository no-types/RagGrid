#' Create a HTML widget using the ag-grid library
#'
#' This function creates a HTML widget to display matrix or a dataframe using ag-grid.
#' @param data a dataobject (either a matrix or a dataframe)
#' @param options a list of ag-grid grid options
#' @param licenseKey if you wish you to use the enterprise version of ag-grid
#' @param width,height Width/Height in pixels (optional, defaults to automatic
#'   sizing)
#' @param elementId An id for the widget (a random string by default).
#' @import htmlwidgets
#' @importFrom htmltools tags htmlDependency
#'
#' @export
aggrid <- function(data, options=list(), licenseKey=NULL, colOpts=list(), width = NULL, height = NULL, elementId = NULL) {

  if (crosstalk::is.SharedData(data)) {
    # Using Crosstalk
    key <- data$key()
    group <- data$groupName()
    data <- data$origData()
  } else {
    # Not using Crosstalk
    key <- NULL
    group <- NULL
  }

  if (is.data.frame(data)) {
    data = as.data.frame(data)
  }else{
    if (!is.matrix(data)) stop(
      "'data' must be either a matrix or a data frame"
    )
    data = as.data.frame(data)
  }

  isNumeric = vapply(data, is.numeric, logical(1))
  isNumeric = lapply(split(isNumeric, names(isNumeric)), unname)
  # forward options using x
  x = list(
    data = data,
    gridOptions=options,
    licenseKey=licenseKey,
    isNumeric=isNumeric,
    colOpts=colOpts,
    settings = list(
      crosstalk_key = key,
      crosstalk_group = group
    )
  )
  deps = list()
  if(!is.null(licenseKey))
    deps = c(deps,list(getDeps("aggrid-enterprice","17.1.1")))

  deps = c(deps, crosstalk::crosstalkLibs())
  # create widget
  htmlwidgets::createWidget(
    name = 'RagGrid',
    x,
    width = width,
    height = height,
    package = 'RagGrid',
    elementId = elementId,
    sizingPolicy = htmlwidgets::sizingPolicy(
      knitr.figure = FALSE, knitr.defaultWidth = "100%", knitr.defaultHeight = "auto"
    ),
    dependencies = deps
  )
}
#' Dependency Path
#' @param ... plugin
depPath = function(...) {
  system.file('htmlwidgets', 'lib', ..., package = 'RagGrid')
}

#' Get dependencies
#' @param plugin plugin
#' @param version version
getDeps = function(plugin,version) {
  d = depPath(plugin)
  htmlDependency(
     tolower(plugin), version, src = d,
    script = list.files(d, '[.]js$'), stylesheet = list.files(d, '[.]css$')
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
