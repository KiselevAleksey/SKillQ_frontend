(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{836:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(837),o=a(843),c=a(723),s=a(724),i=a(722),h=a(755),d=a(438),u=a(759),m=a(858),b=a(873),p=a(893),y=a(757),g=a(883),w=a(760),E=a(87),f=a(306),k=a.n(f);function M(e){return Object(d.a)(new Date(1e3*e),"MMMM d, p yyyy")}function S(e,t,a){let n=Number.POSITIVE_INFINITY;return e.forEach(e=>{n>e[t]&&(n=e[t])}),Math.round(n-n*a)}const C=216,j=["1 Week","1 Month","6 Months"];t.default=Object(E.a)(e=>({cardContentInner:{marginTop:e.spacing(-4)}}),{withTheme:!0})(function(e){const{color:t,data:a,title:d,classes:E,theme:f,height:O}=e,[v,x]=Object(n.useState)(null),[I,N]=Object(n.useState)("1 Month"),T=Object(n.useCallback)(e=>{x(e.currentTarget)},[x]),W=Object(n.useCallback)(e=>[e,d],[d]),F=Object(n.useCallback)(()=>{switch(I){case"1 Week":return"Last week";case"1 Month":return"Last month";case"6 Months":return"Last 6 months";default:throw new Error("No branch selected in switch-statement")}},[I]),L=Object(n.useCallback)(()=>{let e;switch(I){case"1 Week":e=604800;break;case"1 Month":e=2678400;break;case"6 Months":e=16070400;break;default:throw new Error("No branch selected in switch-statement")}const t=new Date/1e3-e,n=[];for(let r=0;r<a.length;r+=1)t<a[r].timestamp&&n.unshift(a[r]);return n},[a,I]),z=Object(n.useCallback)(()=>{x(null)},[x]),H=Object(n.useCallback)(e=>{N(e),z()},[N,z]),P=Boolean(v);return r.a.createElement(u.a,null,r.a.createElement(m.a,{pt:2,px:2,pb:4},r.a.createElement(m.a,{display:"flex",justifyContent:"space-between"},r.a.createElement("div",null,r.a.createElement(b.a,{variant:"subtitle1"},d),r.a.createElement(b.a,{variant:"body2",color:"textSecondary"},F())),r.a.createElement("div",null,r.a.createElement(p.a,{"aria-label":"More","aria-owns":P?"long-menu":void 0,"aria-haspopup":"true",onClick:T,size:"large"},r.a.createElement(k.a,null)),r.a.createElement(y.a,{id:"long-menu",anchorEl:v,open:P,onClose:z,PaperProps:{style:{maxHeight:C,width:200}},disableScrollLock:!0},j.map(e=>r.a.createElement(g.a,{key:e,selected:e===I,onClick:()=>{H(e)},name:e},e)))))),r.a.createElement(w.a,null,r.a.createElement(m.a,{className:E.cardContentInner,height:O},r.a.createElement(l.a,{width:"100%",height:"100%"},r.a.createElement(o.a,{data:L(),type:"number"},r.a.createElement(c.a,{dataKey:"timestamp",type:"number",domain:["dataMin","dataMax"],hide:!0}),r.a.createElement(s.a,{domain:[S(a,"value",.05),"dataMax"],hide:!0}),r.a.createElement(i.a,{type:"monotone",dataKey:"value",stroke:t,fill:t}),r.a.createElement(h.a,{labelFormatter:M,formatter:W,cursor:!1,contentStyle:{border:"none",padding:f.spacing(1),borderRadius:f.shape.borderRadius,boxShadow:f.shadows[1]},labelStyle:f.typography.body1,itemStyle:{fontSize:f.typography.body1.fontSize,letterSpacing:f.typography.body1.letterSpacing,fontFamily:f.typography.body1.fontFamily,lineHeight:f.typography.body1.lineHeight,fontWeight:f.typography.body1.fontWeight}}))))))})}}]);
//# sourceMappingURL=32.439ef458.chunk.js.map