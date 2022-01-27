let scale_rate = 1.0
const require_object = ["e",'=','-',']','[']
document.addEventListener('wheel',function(ev){scale_rate-=Math.sign(ev.deltaY);scale_rate=Math.max(Math.min(scale_rate,16),1)})
document.addEventListener('keydown',function(ev){
    if(selected_object==null&&require_object.includes(ev.key)){return}
    switch(ev.key){
        case("q"):create_object("Node2D");break
        case('t'):create_object("Text2D");break
        case('f'):create_object('Physics2D');break
        case("e"):if(selected_object.self!=null){selected_object.self.remove();delete scene_objects[selected_object.name]};break
        case("="):selected_object.size.x+=scale_rate;selected_object.update_size();break
        case("-"):selected_object.size.x-=scale_rate;selected_object.update_size();break
        case("]"):selected_object.size.y+=scale_rate;selected_object.update_size();break
        case("["):selected_object.size.y-=scale_rate;selected_object.update_size();break
    }})