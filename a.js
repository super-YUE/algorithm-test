import { useState, useRef }from 'react';

function useFPS(){
    const fps = useRef(null);
    useEffect(()=>{
        setInterval(()=>{
            // 获取帧率
        fps.current = getFps();
        },2000)
    },[])
    return fps.current;
}

const fps = useFPS()

const obj ={
    test:'name'
}

new Proxy(obj,{
    set:(key,value)=>{
        Reflect.set()

    },
    get:()=>{}
})

const r = range(0, 5)
for(let i of r) {
  console.log(i)  // 0, 1,2,3,4
}

function range(start, end){
    const array=[];
    for (let i = start;i < end;i++){
        array.push(i)
    }
    return array;
}

const obj={
    test:start
};

 new Proxy(obj,{
    set:(key,value)=>{
        Reflect.set()
    },
    get:(key)=>{
        Reflect.get(value ++ )
    }
})




return obj;

    
