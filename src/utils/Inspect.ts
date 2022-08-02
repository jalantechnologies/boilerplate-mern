export {};

declare global {
  interface Window {
    __insp: any,
    __inspld: Number
  }
}

const InspectLet = () => {
    window.__insp = window.__insp || [];
    let __insp: Array<Array<string | number>> = []
    __insp.push(['wid', 433167548]);
    var ldinsp = function() {
        if (typeof window.__inspld != "undefined") return;
        window.__inspld = 1;
        var insp = document.createElement('script');
        insp.type = 'text/javascript';
        insp.async = true;
        insp.id = "inspsync";
        insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=433167548&r=' + Math.floor(new Date().getTime() / 3600000);
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(insp, x);
    };
    setTimeout(ldinsp, 0);
}

export default InspectLet;