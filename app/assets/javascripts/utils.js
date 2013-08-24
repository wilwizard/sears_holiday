function megajax(url, uri, callback, mode, xData, loading) {
  var loadingFlag = typeof loading !== 'undefined' ? loading : true;
  var useMode = "GET";
  if (mode != null && mode != undefined) useMode = mode;

  pData = '';
  if (xData != null && xData != undefined) pData = xData;

  if (loadingFlag == true) {
    //showLoading();
  }
  
  var uriNew = '';
  if (uri != null || uri != undefined) {
    console.log(uri);
    uriNew = '?' + uri;
  }
  
  jQuery.ajax({
    type: useMode,
    url: url + uriNew,
    cache: false,
    data: pData,
    success: function(jencoded) {
      if (loadingFlag == true) {
        //hideLoading();
      }
      if (jencoded.errcode > 0) {
        jAlert("Error", jencoded.errmsg, true);
      } else {
        if (callback != null && callback != undefined && (jencoded.data != undefined || jencoded.data != null )) {
          if (jencoded.data != null && jencoded.data != undefined) {
            callback(jencoded.data);
          } else {
            callback(jencoded);
          }
        }
      }
    },
    failure: function(e) {
      //hideLoading();
      jAlert("Communications failure", e, true);
    }
  });
}
