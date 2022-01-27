class Node{
    constructor(Name="Node"){
        let add_num=''
        let n_name = Name
        while(scene_objects[n_name]!=undefined){add_num++;n_name=Name+add_num}
        this.name = n_name;
    }
}
class color{
    constructor(r=255,g=255,b=255,a=255){this.r=r;this.g=g;this.b=b;this.a=a;}
    get_color(){return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")"}
}
class Vector2{
    constructor(x,y){this.x=parseFloat(x);this.y=parseFloat(y);}
    normalize(){
        let division_val = this.x+this.y
        if(division_val==0.0){division_val=1.0}
        return Vector(this.x/division_val,this.y/division_val)
    }
    multiply(val){return Vector(this.x*val,this.y*val)}
    multiplyV(val){return Vector(this.x*val.y,this.y*val.y)}
    divide(val){return Vector(this.x/val,this.y/val)}
    divideV(val){return Vector(this.x/val.x,this.y/val.y)}
    add(val){return Vector(this.x+val.x,this.y+val.y)}
    sub(val){return Vector(this.x-val.x,this.y-val.y)}
    smallest(){return Math.min(this.x,this.y)}
    length(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}
    is_negative(){return Math.sign(this.x)==1||Math.sign(this.y)==1}
}
class Node2D extends Node{
    constructor(position=Vector(0,0),Size=Vector(16,16),Name="Node2D",olor=new color(),sprite=null,collide=true){
        super(Name)
        if(collide){collision_objects.push(this)}
        this.position=position;this.size=Size;;this.color=olor;this.sprite=sprite;
        this.visible=true;
        this.self=document.createElement('div')
        this.self.className="default_object"
        let n_pos = true_pos(position)
        this.self.style.left=n_pos.x+'px';
        this.self.style.top=n_pos.y+'px';
        this.self.style.backgroundColor=olor.get_color();
        let n_size = true_pos(this.size);
        this.self.style.minWidth=n_size.x+'px';
        this.self.style.minHeight=n_size.y+'px';
        document.body.appendChild(this.self)
        scene_objects[this.name]=this
        this.active=false
        this.me = this
        this.type='Node2D'
        this.set_as_editor_object()
    }
    hide(){this.visible=false;update_visible()}
    show(){this.visible=true;update_visible()}
    update_visible(){this.self.style.visibility=(this.visible?'show':'hidden')}
    set_as_editor_object(){
        if(!in_editor){return}
        let me = this.me
        this.self.addEventListener('mousedown',function(ev){this.active=true;mouse_offset=Vector(ev.offsetX,ev.offsetY);;selected_object=me})
        this.self.addEventListener('mouseup',function(){this.active=false;selected_object=null})
        this.self.addEventListener('mouseleave',function(ev){if(!this.active){selected_object=null}})
    }
    update_size(){
        this.size.y = Math.max(this.size.y,2)
        this.size.x = Math.max(this.size.x,2)
        let n_size = true_pos(this.size)
        this.self.style.minHeight=n_size.y+'px'
        this.self.style.minWidth=n_size.x+'px'
    }
    move_to(pos){
        this.position=pos;this.update_position()
    }
    move_to_global(val){
        this.position=val;
        let n_pos = this.position;
        this.self.style.top = n_pos.y+"px";
        this.self.style.left = n_pos.x+"px";
        this.position=anti_pos(this.position);
    }
    move_by(val){
        this.position.x+=val.x;this.position.y+=val.y;
        this.update_position();
    }
    update_position(){
        let n_pos = true_pos(this.position)
        this.self.style.top = n_pos.y+"px";
        this.self.style.left = n_pos.x+"px";
    }
    get_data(){
        return {"type":"Node2D","position":this.position,"Size":this.size,"Name":this.name,"color":this.color,"sprite":this.sprite}
    }
}
class Physics2D extends Node2D{
    constructor(position=Vector(0,0),Size=Vector(16,16),Name="Node2D",olor=new color(),sprite=null){
        super(position,Size,Name,olor,sprite)
        this.type='Physics2D'
        this.velocity = Vector(0.0,0.0)
        update_object.push(this)
    }
    update(){
        this.velocity.y += Gravity*delta_time
        this.velocity.y = Math.min(this.velocity.y,128)
        let collisions = collide(this)
        if(collisions[1]<0&&this.velocity.y>0){this.velocity.y=0.05;}
        this.move_by(this.velocity.multiply(delta_time).add(Vector(collisions[0],collisions[1])))
    }
}
class Text2D extends Node2D{
    constructor(position=Vector(0,0),Size=Vector(16,16),Name="Text2D",olor=new color(),text="empty text"){
        super(position,Size,Name,olor,null,false)
        this.type="Text2D"
        this.text = text;
        this.self.innerText=text;
        this.update_size()
    }
    update_size(){
        super.update_size()
        let n_Size = true_pos(this.size)
        let text_size = Math.min(n_Size.x*2.75/this.text.length,n_Size.y*0.85/this.text.split("\n").length)
        this.self.style.fontSize=text_size+"px"
    }
    get_data(){
        let data = super.get_data()
        data['text']=this.text
        return data
    }
}
let selected_object = null
let mouse_offset=Vector(0,0)
//for ease of use//
function Vector(x,y){return new Vector2(x,y);}
function Color(r=255,g=255,b=255,a=255){return new color(r,g,b,a)}
function true_pos(a){return (Vector(a.x/screen_size.x*1024.0,a.y/screen_size.y*600.0))}
function anti_pos(a){return (Vector(a.x*screen_size.x/1024.0,a.y*screen_size.y/600.0))}