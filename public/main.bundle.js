(()=>{"use strict";const t=document.getElementById("my-button");let e=new class{constructor(t){this.position=0,this.rAF_id=0,this.elapsedTime=0,this.fps=0,this.myText=document.getElementById("my-text"),this.canvas=document.getElementById("my-object"),this.startTime=t}loop(t){this.elapsedTime=t-this.startTime,this.startTime=t,console.log("elapsedTime :>> ",this.elapsedTime),this.fps=Math.round(1e3/this.elapsedTime),this.update(),this.render(),60==this.position?cancelAnimationFrame(this.rAF_id):this.rAF_id=requestAnimationFrame(this.loop)}update(){this.position++}render(){this.canvas.getContext("2d").fillStyle="black",this.myText.innerText=this.fps.toString()}}(performance.now());t.addEventListener("click",(()=>{requestAnimationFrame(e.loop)}))})();