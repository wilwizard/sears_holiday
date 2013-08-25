// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//

var host = 'http://operation-sears.herokuapp.com';//'http://192.168.3.135:3000';
var searsStores = null;
/// Stores 



/// Missions

function singleMissionTemplate(name, description, item) {
  var data = '<ul id="missionItem_' + item +'" data-role="listview" data-inset="true" data-divider-theme="a"';
      data    += ' onclick="return removeMissionEvent(\'missionItem_' + item +'\')">';
      data +=    '  <li data-role="list-divider">' + name + '</li>';
      data +=    '  <li data-icon="gear"><a href="">' + description + '</a></li>';
      data +=    '</ul>';
  return data;
}

function searsSelectStore(searsStore) {
  var storeNumber = searsStore.replace(/searsStore_/,'');
  var urlRequest = host + '/sears/offers?store_number=' + storeNumber;
  megajax(urlRequest, null, function(data) {
    var newData = '<ul class="thumbnails">';
    for (productKey in data) {
      newData += searsItemTemplate(productKey, data[productKey]);
      console.log(productKey + ' => ' + data[productKey]);
    }
    newData += '</ul>';
    jQuery('#mainContent').html(newData).trigger("create");
    //console.log(data);
  });  

  console.log('store number => ' + storeNumber);
}

function searsItemTemplate(title, link) {
var item = '';
item += '  <li class="span5 clearfix">';
item += '  <div class="thumbnail clearfix">';
item += '    <img class="item-image" src="' + link +'" alt="ALT NAME" class="pull-left span2 clearfix" style=\'margin-right:10px\'>';
item += '    <div class="caption" class="pull-left">';
//item += '      <a href="http://bootsnipp.com/" class="btn btn-primary icon  pull-right">Select</a>';
item += '      <h4>      ';
item += '      <a href="#" >' + title + '</a>';
item += '      </h4>';
item += '      <small><b>RG: </b>99384877</small>';
item += '    </div>';
item += '  </div>';
item += '</li>';
return item;
}

function singleMissionTemplate2(name, description, item) {
  var data = '<ul id="missionItem_' + item +'" data-role="listview" data-inset="true" data-divider-theme="a" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"';
      data    += ' onclick="return removeMissionEvent(\'missionItem_' + item +'\')">';
      data += '<li data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-bottom ui-li-last ui-btn-up-a mission-li" style="background-image:url(\''+ host +'/assets/cool'+ item +'.jpg\')"><div class="ui-btn-inner ui-li mission-inner-li"><div class="ui-btn-text"><a href="" class="ui-link-inherit mission-text">' + name + '</a></div></div></li>'
      data += '</ul>';
      
      return data;
}

function singleSearsStor(name, description, item, item2) {
  var data = '<ul id="searsStore_' + item +'" data-role="listview" data-inset="true" data-divider-theme="a" class="ui-listview ui-listview-inset ui-corner-all ui-shadow"';
      data    += ' onclick="return searsSelectStore(\'searsStore_' + item +'\')">';
      data += '<li data-icon="gear" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="a" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-corner-bottom ui-li-last ui-btn-up-a mission-li" style="background-image:url(\''+ host +'/assets/cool' + item2 + '.jpg\')"><div class="ui-btn-inner ui-li mission-inner-li"><div class="ui-btn-text"><a href="" class="ui-link-inherit mission-text">' + name + '</a></div></div></li>';
      data += '</ul>';
      
      return data;
}


function populateList() {

  var urlRequest = host + '/missions/list'; 
            
  megajax(urlRequest, null, function(data) {
    var missionListData = '';
    for (missionItem in data) {
      var currentMission = data[missionItem];
      missionListData += singleMissionTemplate(currentMission['title'], currentMission['statement']);
    }
    jQuery('#missionListContainer').html(missionListData).trigger("create");
    //console.log(data);
  });
}

function initZipCodeForm() {

  var urlRequest = host + '/pages/zip_code_form'; 
            
  megajax(urlRequest, null, function(data) {
    jQuery('#popupVideo').html(data).trigger("create");
      var butoonLogin = jQuery('#loginButton').button();
      
      var accpetButton = jQuery('#acceptButton').button();
      accpetButton.click(function(event) {
        event.preventDefault();
        var zipCode = jQuery('#zipcode').val();
        var url = host + '/sears/store_info?zip=' + zipCode;
        if (zipCode != '' || zipCode != null) {
          megajax(url, null, function(data) {
            searsStores = data;
            jQuery('#popupVideo').popup( "close" );
            var newMainContent = '';
            var iter = 0;
            for (dataRow in data) {
              newMainContent += singleSearsStor(dataRow, null, data[dataRow], iter);
              console.log(dataRow);
              iter += 1;
              if (iter == 11) iter = 0;
            }
            //console.log(data);
            jQuery('#mainContent').html(newMainContent);
          });
        }


      });

      var cancelButton = jQuery('#cancelButton').button();
      cancelButton.click(function(event) {
        event.preventDefault();
        jQuery('#popupVideo').popup( "close" );
      });


  });
}

function removeMissionEvent(item) {
  //jQuery('#' + item).hide();
  initZipCodeForm();
  jQuery('#popupVideo').popup( "open" );
  //jQuery('#dialogBox').dialog();
}

//// LOGIN

function loginAction() {
  megajax(urlRequest, null, function(data) {
    var missionListData = '';
    for (missionItem in data) {
      var currentMission = data[missionItem];
      missionListData += singleMissionTemplate(currentMission['title'], currentMission['statement']);
    }
    jQuery('#missionListContainer').html(missionListData).trigger("create");
    //console.log(data);
  });
}

function setUpMissionsPage() {
  var newMainContent = '';

  newMainContent += '<h2 id="pageTitle">Missions</h2>';
  newMainContent += '<div id="missionListContainer">';
  newMainContent += '</div>';
  jQuery('#mainContent').html(newMainContent);

  //var data = jQuery('#loginForm').serialize();
  var urlRequest = host + '/missions/list'; 
  megajax(urlRequest, null, function(data) {
    var missionListData = '';
    var items = 0;
    for (missionItem in data) {
      var currentMission = data[missionItem];
      missionListData += singleMissionTemplate2(currentMission['statement'], currentMission['title'], items);
      items += 1;
    }

    var popup = '<div data-role="popup" id="popupVideo"  data-overlay-theme="a" data-theme="d" data-tolerance="15,15" class="ui-content">';
    popup     += '<h1>hello</h1>';
    //dialog    += '<iframe src="http://player.vimeo.com/video/41135183" width="497" height="298" seamless></iframe>';
    popup    += '</div>';

    var dialog = '<a href="" id="dialogBox" data-rel="dialog" data-transition="pop">Open dialog</a>';    
    missionListData += popup;
    missionListData += dialog;

    jQuery('#missionListContainer').html(missionListData).trigger("create");
            //console.log(data);
  });  
  jQuery('#navBar').show();
}


function main() {
  console.log('running ...');
  var missionListData = singleMissionTemplate();
  populateList();
}

$(document).ready(function() {
  var butoonLogin = jQuery('#loginButton').button();
  butoonLogin.click(function(event) {
    event.preventDefault();
    setUpMissionsPage();
  });
});
