#' Format table columns
#'
#' @param table a table object created from \code{\link{aggrid}()}
#' @param columns the indices of the columns
#' @param format format based on numeral.js (see
#'   \url{http://numeraljs.com/#format});
formatColumns = function(table, columns, format) {
    x = table$x
    x$formattingOptions = append(x$formattingOptions,as.list(setNames(rep(format,length(columns)), columns)))
    table$x = x
    table
}