const hostName = '192.168.43.95:2222';
const token = localStorage.getItem("token");

var mon, tue, wed, thu, fri, sat, sun;
var windows = false;
var rows = [];
var days = [];

var allrooms;
var allgroups;
var allsubjects;

/*
const urlPost = `http://${hostName}/api/constraints?token=${token}`;

require('./profPref.less');
*/
function postThisShit(json, callback) {

  alert(json);

/*  $.ajax({
    url: urlPost,
    method: 'POST',
    contentType: 'application/json',
    data: json
  });*/
};



function getSubjectsShow(){
  var url = 'http://'+hostName+'/api/subjects?token=' + token;
  $.get(`${url}`).done(function (result){
    if (result.success !== true)
      return;
    allsubjects=result;
  });
};


function getRoomsShow(){
  var url = 'http://'+hostName+'/api/rooms?token=' + token;
  var pos;
  $.get(`${url}`).done(function(result){
    if (result.success !== true)
      return;
    allrooms=result.rooms;
  });
};

function getGroupsShow(){
  var url = 'http://'+hostName+'/api/groups?token=' + token;
  $.get(`${url}`).done(function(result){
    if (result.success !== true)
      return;
    allgroups=result;
  });
};

function subName(id){
  for(var i=0;i<allsubjects.subjects.length;i++)
    if(allsubjects.subjects[i].id == id) return allsubjects.subjects[i].name;
};

function roomName(ids){
  var roomNames =[];
  var pos =0;
  for(var i=0;i<ids.length;i++)
  {
    if(allrooms.rooms[i].id == ids[pos])
    {roomNames.push(allrooms.rooms[i].name); pos++;}
  }
  return roomNames;
};

function groupName(ids){
  var groupNames=[];
  var pos=0;
  for(var i=0;i<ids.length;i++){
    if(allgroups.groups[i].id == ids[pos])
    {groupNames.push(allgroups.groups[i].name);pos++;}
  }
  return groupNames;
};


function getUnlinkedConstraints(){
  var url = 'http://'+hostName+'/api/rooms?token=' + token;
  var pos;
  $.get(`${url}`).done(function(result){
    if (result.success !== true)
      return;
    for(var i=0;i<result.constraints.length;i++){
      for(var j=0;j<result.constraints[i].possibleIntervals.length;j++)
      {
        if(result.constraints[i].possibleIntervals[j].intervals.length !== 0)
        {
          $("#tabl tbody").append('<tr><td class="mdl-data-table__cell--non-numeric">' + result.constraints[i].id + '</td><td class="mdl-data-table__cell--non-numeric">' + subName(result.constraints[i].subjectId) + '</td><td class="mdl-data-table__cell--non-numeric">'+roomName(result.constraints[i].roomIds)+'</td><td class="mdl-data-table__cell--non-numeric">'+groupName(result.constraints[i].groupIds)+'</td><td class="mdl-data-table__cell--non-numeric">'+result.constraints[i].date+'</td><td class="mdl-data-table__cell--non-numeric">'+result.constraints[i].possibleIntervals[j].days+'</td><td class="mdl-data-table__cell--non-numeric">'+result.constraints[i].possibleIntervals[j].intervals+'</td></tr>');
        }
      }
    }
  });
};

$(document).ready(function() {
  getSubjectsShow();
//  getRoomsShow();
  getGroupsShow();
  getUnlinkedConstraints();
  addListeners();
});     

function getRows(){
    var table = document.getElementById("tabl");
    for (var i = 0, row; row = table.rows[i]; i++){
      if(row.className=="is-selected"){
          rows.push(row.cells[1].innerHTML);
      }
  }
};

function getDays(){
  mon = document.getElementById("luni").checked;
    tue = document.getElementById("marti").checked;
    wed = document.getElementById("miercuri").checked;
    thu = document.getElementById("joi").checked;
    fri = document.getElementById("vineri").checked;
    sat = document.getElementById("sambata").checked;
    sun = document.getElementById("duminica").checked;
  if(mon)
    days.push(1);
  if(tue)
    days.push(2);
  if(wed)
    days.push(3);
  if(thu)
    days.push(4);
  if(fri)
    days.push(5);
  if(sat)
    days.push(6);
  if(sun)
    days.push(0);
};

function getWindow(){
  var checkbox = document.getElementById("switch1");
  windows = checkbox.checked;
};

function start(){
  getRows();
  getDays();
  getWindow(); 
  var object = {};
  object["ids"] = rows;
  object["days"] = days;
  object["window"] = windows;
  var json = JSON.stringify(object);
  
  postThisShit(json, function(response){
      alert(response);
      if(response === true)
        alert("Optiune adaugata!");
      else alert("Optiunea nu s-a adaugat. Va rugam reincercati.");
    });
    
   location.reload();
};

function addListeners(){

  var sendButton = document.getElementById("sendData2");
  sendButton.addEventListener('click', start);
}