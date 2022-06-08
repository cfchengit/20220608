var capture
var cacheGraphics
var bk,ay
var mode=1
var colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
class Ball_1{
	constructor(args){ //預設值(工廠)
		this.r=args.r || 20
		// this.p={x:random(width),y:random(height)}
		this.p=args.p || {x:width/2,y:height/2}
		this.v=this.v || {x:random(-2,2),y:random(-2,2)}
		this.a = args.a || {x:0,y:0}
		this.color = args.color || random(colors)
		this.mode = random(["happy","bad"])
		this.rid = random(10000)
	}
	draw(){
		
		push()
			translate(this.p.x, this.p.y)
			fill(this.color)
			noStroke()
			ellipse( 0,0, this.r);
		if(this.mode=="bad"){
			fill(255)
			arc(0,0,this.r/2,this.r/2,0,PI)
		fill(0)
			arc(0,0,this.r/3,this.r/3,0,PI)
		}
		else
		{
			fill(255)
			ellipse(0,0,this.r/2,this.r/2)
		fill(0)
			ellipse(0,0,this.r/3,this.r/3)
		}
			stroke(this.color)
			strokeWeight(4)
			
		noFill()
		for(var j=0;j<8;j++){
			beginShape()
				rotate(PI/4)
				for(var i=0;i<30;i+=5){
					vertex(this.r/2+i*2,sin(i/5+frameCount/10+this.rid)*10) 
				}
			endShape()
		}
		
		pop()
		}
	update(){
		this.p.x=this.p.x+this.v.x
		this.p.y+=this.v.y
		this.v.x+=this.a.x
		this.v.y+=this.a.y
		// ball.p.x=ball.p.x+ball.v.x
		// ball.p.y+=ball.v.y
		if(this.mode=="happy"){
			this.p.y+=sin(frameCount/(10+this.rid/100))*5
		}
		if(this.mode=="crazy"){			
			this.v.x+=random(-5,5)
			this.v.y+=random(-5,5)
		}
		this.v.x*=0.99
		this.v.y*=0.99
		if(this.p.y>height){
			this.v.y=-abs(this.v.y)
		}
	}
	escape(){
		this.v.x=random(-10,10)
	}
	setHappy(){
		this.mode="happy"
	}
	isBallInRange(){
		let d=dist(mouseX,mouseY,this.p.x,this.p.y)
		if(d<this.r){
			return true
		}else{
			return false
		}
	}
	setMode(mode){
		this.mode=mode
	}
}
class Ball{
	constructor(args){ //   參數預設值(工廠)
		this.r= args.r || 30 //random(200)  //  ||符號主要設定優先使用args.r，如果沒有傳args.r參數，採用下一個值
		this.p= args.p || {x:random(width),y:random(height)}  
		this.v=args.v || {x:random(-1,1),y:random(-1,1)}
		this.a = args.a || {x:0,y:0.01}
		this.color = args.color || random(colors)
	}	
	
	draw(){  //  繪製函數
		push()
			translate(this.p.x, this.p.y)
			fill(this.color)
			ellipse(0, 0 , this.r);
			ellipse(-this.r/2, -this.r/2 , this.r/2);
			ellipse(this.r/2, -this.r/2 , this.r/2);
			fill("#ffff00")
			ellipse(this.r/4, -this.r/4 , this.r/8);
			ellipse(-this.r/4, -this.r/4 , this.r/8);
			fill(255)
			// arc(0,0,this.r/2,this.r/2,0,PI)			
			ellipse(0, 0 , this.r/2);
			fill(0)
			// arc(0,0,this.r/3,this.r/2,0,PI)
			ellipse(0, 0 , this.r/3);
			noFill()
			arc(0,this.r/15,this.r*2/3,this.r*2/3,0,PI)
		pop()
	}
	
	update(){  // 動作(移動)
		this.p.x=this.p.x+this.v.x
		this.p.y+=this.v.y
		this.v.x=this.v.x+this.a.x
		this.v.y=this.v.y+this.a.y
		this.v.x = this.v.x*0.999
		this.v.y = this.v.y*0.999
		if(this.p.y>height){
			this.v.y = -abs(this.v.y)
		}
	}
	
}
var ball
var balls=[]  //宣告一個陣列
function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(800, 600);
	background(100);
	capture = createCapture(VIDEO)
	capture.size(640,480);//設定顯示畫面大小
	cacheGraphics = createGraphics(640,480)	
	cacheGraphics.translate(640,0) // 先往右邊移動一倍的距離
	cacheGraphics.scale(-1,1) // 翻轉畫布
	capture.hide();
	sliderElement= createSlider(30,50,30,3)//最小值，最大值，預設值，間距
	sliderElement.position(750,590)
	sliderElement.input(setGravity)
	mic = new p5.AudioIn() 
	mic.start()
}
function setGravity(){
	ay = sliderElement.value()
}
function draw() {
	// circle(mouseX, mouseY, 20);
	// image(capture,mouseX, mouseY)
	background(0);
	balls=[]
cacheGraphics.image(capture, 0,0)
	
noStroke();
	// scale(2)
if(mode<5){
var span=20+max(mouseX,0)/20 //上次會當機的問題，mouseX會負值，造成當機
for(var x=0 ; x<cacheGraphics.width; x+=span){
	for(var y=0;y<cacheGraphics.height; y+=span){
    var pixel = cacheGraphics.get(x,y);

		bk = (pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值

		fill(255)//都變成白色

		if(mode=="1"){
		ellipse(x,y,span*map(bk,0,255,0,1))
		}
		if(mode=="2")
		{
			fill(pixel);
			push()
			colorMode(HSB)
			fill(pixel[0],100,90)//色相，明亮，飽和度
				translate(x,y)
				rotate(pixel[0]/100)//會依照有紅色像素的方塊做旋轉
				rectMode(CENTER) //以方塊中間做旋轉
				rect(0,0,span*0.3+pixel[2]/10); //藍色系列方塊會越大
				fill(0)
				ellipse(0,0,10)//加一個圓在方塊中間
			pop()
		}
		if(mode=="3")
		{
			let txt = "一二三四五田雷電龕龘";
			let bkId=int(map(bk,0,255,9,0))
			fill(pixel)
			// fill(pixel[0]+50,pixel[1]+50,pixel[2]+50)//可以更亮
			textSize(span)
			textStyle(BOLD)
			text(txt[bkId],x,y)
		}
		if(mode=="4")
		{
			var micLevel=mic.getLevel();
			
			if(micLevel>0.01){
			ball = new Ball_1({p:{x:x,y:y},r:ay,color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}
			else
			{
			ball = new Ball({p:{x:x,y:y},r:ay,color: color(pixel[0],pixel[1],pixel[2]) }) //產生一個新的物件
			}
				balls.push(ball)
		}
	}
	}
	
	if(mode=="4")
		{
			for(let ball of balls){
			ball.draw()	 //繪製		
		// ball.update()  //動作(移動)
	}
		}
}
	else
	{
		image(capture,0, 0)
	}
}
function keyPressed(){
	if(key=="1"){
		mode=1
	}
	else if(key=="2"){
		mode=2
	}
	else if(key=="3"){
		mode=3
	}
	else if(key=="4"){
		mode=4
	}
	else {
		mode=5
	}

}