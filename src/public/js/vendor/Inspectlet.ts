export {};
const wid = 812310448;

declare global {
  interface Window {
    __insp: Array<Array<string | number>>,
    __inspld: Number
  }
}

const InspectLet = () => {
    window.__insp = window.__insp || [];
    window.__insp.push(['wid', wid]);
    var ldinsp = function() {
      if (typeof window.__inspld != "undefined") return;
      window.__inspld = 1;
      var insp = document.createElement('script');
      insp.type = 'text/javascript';
      insp.async = true;
      insp.id = "inspsync";
      insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + `://cdn.inspectlet.com/inspectlet.js?wid=${wid}&r=` + Math.floor(new Date().getTime() / 3600000);
      var x = document.getElementsByTagName('script')[0];
      if(x===undefined){
        document.getElementsByTagName('head')[0].appendChild(insp);
      }
      else{
        x.parentNode.insertBefore(insp, x);
      }
    };
    setTimeout(ldinsp, 0);
}

export default InspectLet;
