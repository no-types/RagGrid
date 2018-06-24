export class ErrorMessageUtils{
    static checkWindowsViewerPane(element){
        if(document.location.search.indexOf("viewer_pane=1")!==-1 && navigator.platform==="Win32")
        {
            var url=document.location.href.replace("viewer_pane=1","");
            $(element).html("ag-grid uses CSS transform to position rows in the grid. It looks like your Rstudio Viewer Pane doesn't support this. <br>"
            +`Open the <a href='${url}'>link</a> in other browser or use the Show in New Window button from the tools.`);
            return true;
        }
        return false;
    }
}