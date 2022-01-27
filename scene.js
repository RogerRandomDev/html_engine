let in_editor=true;
let object_list = {}
let scene_objects={}
let collision_objects=[]
let update_object = []
let cur_mouse_position = Vector(0,0)
let Gravity = 128;
let delta_time = 50;
let screen_size = Vector(window.innerWidth,window.innerHeight)
function scene_loaded_scene(){
    document.addEventListener('mousemove',function(ev){
        cur_mouse_position=Vector(ev.clientX,ev.clientY)
        if(selected_object!=null){selected_object.move_to_global(cur_mouse_position.sub(mouse_offset))}})
    window.setInterval(update_objects, delta_time);
    delta_time = delta_time/1000
}


function update_objects(){
    for(const object of update_object){object.update()}
}