(()=>{"use strict";class t{constructor(t){this.context=t.context,this.x=t.x,this.y=t.y,this.vx=t.vx,this.vy=t.vy,this.colliding=!1}update(t){}render(){}}class e extends t{constructor(t){super(t),this.height=0,this.width=0}update(t){this.x+=this.vx*t}render(){}}class i extends e{constructor(t){super(t),this.height=25,this.width=25}render(){this.context.fillStyle="red",this.context.fillRect(this.x,this.y,this.width,this.height)}}class s extends e{constructor(t){super(t),this.height=75,this.width=25}render(){this.context.fillStyle="green",this.context.fillRect(this.x,this.y,this.width,this.height)}}class h extends t{constructor(t){super(t),this.height=0,this.width=750}update(t){}render(){this.context.fillStyle="black",this.context.fillRect(this.x,this.y,this.width,this.height)}}class n extends t{constructor(t){super(t),this.height=50,this.width=25,this.isJumping=!1,this.jumpLimit=225}update(t){this.isJumping&&(this.y+=this.vy*t),this.y<this.jumpLimit&&(this.vy=-this.vy),this.y>350&&(this.isJumping=!1,this.vy=-this.vy),this.y=this.y>350?350:this.y}render(){this.context.fillStyle="black",this.context.fillRect(this.x,this.y,this.width,this.height)}}const c=document.getElementById("my-button");(new class{constructor(){this.position=0,this.rAF_id=0,this.startTime=0,this.elapsedTime=0,this.fps=0,this.rectX=0,this.rectY=0,this.gameTimePassed=0,this.enemies=[],this.myText=document.getElementById("my-text"),this.canvas=document.getElementById("my-canvas"),this.context=this.canvas.getContext("2d"),this.myObject=document.getElementById("my-object"),this.canvas.tabIndex=1,this.canvas.focus(),this.player=new n({context:this.context,x:50,y:350,vx:0,vy:-200}),this.ground=new h({context:this.context,x:0,y:400,vx:0,vy:0})}initialize(){this.createWorld(),this.startTime=performance.now(),requestAnimationFrame(this.loop.bind(this))}createWorld(){this.enemies=[new s({context:this.context,x:500,y:325,vx:-200,vy:0}),new i({context:this.context,x:1e3,y:350,vx:-200,vy:0}),new s({context:this.context,x:1500,y:325,vx:-200,vy:0}),new i({context:this.context,x:2e3,y:350,vx:-200,vy:0}),new s({context:this.context,x:2500,y:325,vx:-200,vy:0}),new i({context:this.context,x:3e3,y:350,vx:-200,vy:0})]}loop(t){this.elapsedTime=(t-this.startTime)/1e3,this.startTime=t,this.fps=Math.round(1/this.elapsedTime),this.elapsedTime=Math.min(this.elapsedTime,.1);for(let t=0;t<this.enemies.length;t++)this.enemies[t].update(this.elapsedTime);if(this.handleInput(),this.detectCollision())return cancelAnimationFrame(this.rAF_id),confirm("You lose! Play again?")&&(this.player=new n({context:this.context,x:50,y:350,vx:0,vy:-200}),this.initialize()),!1;this.player.update(this.elapsedTime),this.clearCanvas();for(let t=0;t<this.enemies.length;t++)this.enemies[t].render();this.player.render(),this.ground.render(),this.rAF_id=requestAnimationFrame(this.loop.bind(this))}clearCanvas(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}handleInput(){this.canvas.addEventListener("keypress",this.keyPressEventHandler.bind(this),!1)}keyPressEventHandler(t){return console.log(t),"Space"==t.code&&(this.player.isJumping=!0),!1}detectCollision(){let t;for(let e=0;e<this.enemies.length;e++)if(t=this.enemies[e],this.rectIntersect(this.player.x,this.player.y,this.player.width,this.player.height,t.x,t.y,t.width,t.height))return!0}rectIntersect(t,e,i,s,h,n,c,r){return!(h>i+t||t>c+h||n>s+e||e>r+n)}}).initialize(),c.addEventListener("click",(()=>{}))})();