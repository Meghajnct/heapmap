document.onmousemove = handler;
setInterval(getMousePosition, 100);
//setInterval(trackMousePos,1000);
var coordinates = [];
var mousePos;
var mousePosCor = [];
var heatMap=function(){

}

function getGroupedData() {
    var positions = JSON.parse(localStorage.getItem('coordinates'));
    localStorage.removeItem('coordinates');
    var grouped = [];
    positions.map(function(pos, index) {
      var filtered = positions.filter(function(obj) {
        return (obj.x == pos.x && obj.y == pos.y)
      })

      var group = Object.assign({}, pos,
         {
             value: filtered.length
    });

      if (grouped.indexOf({x:group.x,y:group.y})==-1) {
        grouped.push(group);
      }
    });
    // var heatMapData = localStorage.getItem('heatMap');
   // console.log("heatMapData :"+heatMapData);
    // if(heatMapData && heatMapData !=''){
    //   grouped.push(heatMapData);
    // }

    localStorage.setItem('heatMap', JSON.stringify(grouped));

  }

  function getMousePosition() {
    var pos = mousePos;
    if (pos){
      coordinates.push({x: pos.x, y: pos.y});
    }
    localStorage.setItem('coordinates', JSON.stringify(coordinates));
    getGroupedData();
  }
  function trackMousePos(){
    //var src = "undefined" !== typeof PHENOMTRACK_URL ? PHENOMTRACK_URL : "file:" === document.location.protocol && "//"+phApp.phenomTrackURL.match(/^\/\//) ? "https://"+phApp.phenomTrackURL : "//"+phApp.phenomTrackURL;
    //console.log("trackMousePos : "+PHENOMTRACK_URL);

    if(localStorage.getItem('heatMap').length > 5){
        var data =JSON.stringify(localStorage.getItem('heatMap'));

        data = data.replace(/\\/g, '\\');
        data = JSON.parse(data);
        //console.log("data : "+data);
        var jsonData={
        "event":"MouseTracker",
        "clientToken":phApp.refNum,
        "data":data
        }
       localStorage.removeItem('heatMap');
       // console.log("Localstorage ::"+localStorage.getItem('heatMap'))
       // console.log("trackMousePos : "+data);

        phenomevent.track('MouseTracker',data);
    }

    // var HTTP_PROTOCOL = (("https:" == document.location.protocol) ? "https://" : "http://");
    ///var API_URL = "dev-trackapi.phenompro.com";
    //var api = HTTP_PROTOCOL + API_URL+"/track";
   // phenomevent.send_request(api,jsonData);
  //  console.log("heatMap :"+localStorage.getItem('heatMap'));
  }
  function handler(event) {
    var dot,
      eventDoc,
      doc,
      body,
      pageX,
      pageY;

    event = event || window.event; // IE-ism

    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }

    mousePos = {
      x: event.pageX,
      y: event.pageY
    };
    //mousePosCor.push(mousePos);
  }

  PhenomTrack.prototype.generteHeatMap= function() {

  var heatmap = h337.create({
      container: document.getElementById('root')
    });

    heatmap.setData({
      data: JSON.parse(localStorage.getItem('heatMap'))
    });
  }