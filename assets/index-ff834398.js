import{d as l,a as c,c as d,e as h,y as v,z as u,l as p,_ as P}from"./index-bf65c2b3.js";const f={id:"canvas"},m=l({__name:"Clock",setup(a){function r(){var o=new Date;const e=document.getElementById("canvas").getContext("2d");if(e){e.save(),e.clearRect(0,0,150,150),e.translate(75,75),e.scale(.4,.4),e.rotate(-Math.PI/2),e.strokeStyle="black",e.fillStyle="white",e.lineWidth=8,e.lineCap="round",e.save();for(var t=0;t<12;t++)e.beginPath(),e.rotate(Math.PI/6),e.moveTo(100,0),e.lineTo(120,0),e.stroke();for(e.restore(),e.save(),e.lineWidth=5,t=0;t<60;t++)t%5!=0&&(e.beginPath(),e.moveTo(117,0),e.lineTo(120,0),e.stroke()),e.rotate(Math.PI/30);e.restore();var s=o.getSeconds(),i=o.getMinutes(),n=o.getHours();n=n>=12?n-12:n,e.fillStyle="black",e.save(),e.rotate(n*(Math.PI/6)+Math.PI/360*i+Math.PI/21600*s),e.lineWidth=14,e.beginPath(),e.moveTo(-20,0),e.lineTo(80,0),e.stroke(),e.restore(),e.save(),e.rotate(Math.PI/30*i+Math.PI/1800*s),e.lineWidth=10,e.beginPath(),e.moveTo(-28,0),e.lineTo(112,0),e.stroke(),e.restore(),e.save(),e.rotate(s*Math.PI/30),e.strokeStyle="#D40000",e.fillStyle="#D40000",e.lineWidth=6,e.beginPath(),e.moveTo(-30,0),e.lineTo(83,0),e.stroke(),e.beginPath(),e.arc(0,0,10,0,Math.PI*2,!0),e.fill(),e.beginPath(),e.arc(95,0,10,0,Math.PI*2,!0),e.stroke(),e.fillStyle="rgba(0,0,0,0)",e.arc(0,0,3,0,Math.PI*2,!0),e.fill(),e.restore(),e.beginPath(),e.lineWidth=14,e.strokeStyle="#325FA2",e.arc(0,0,142,0,Math.PI*2,!0),e.stroke(),e.restore(),window.requestAnimationFrame(r)}}return window.requestAnimationFrame(r),(o,_)=>(c(),d("canvas",f))}}),I=a=>(v("data-v-e6fd9435"),a=a(),u(),a),k=I(()=>p("div",null,"一寸光阴一寸金，寸金难买寸光阴",-1)),g=l({__name:"index",setup(a){return(r,o)=>(c(),d("header",null,[h(m),k]))}});const b=P(g,[["__scopeId","data-v-e6fd9435"]]);export{b as default};