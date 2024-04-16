//import
import { useState } from "react";

//function
function Ex03a() {

    //const [변수명, 세터함수명] = useState(초기값);
    const [size, setSize] = useState(300);

    return (
        <>
            <h2>3번화면 - 이미지 크기조절</h2>
            
            <button onClick={e=>setSize(150)}>작게</button>
            <button onClick={e=>setSize(300)}>보통</button>
            <button onClick={e=>setSize(450)}>크게</button>

            <hr/>

            <input type="range" min={150} max={450} value={size}
                        onChange={e=>setSize(parseInt(e.target.value))}/>
            {size}

            <hr/>

            <input type="text" value={size} onChange={e=>setSize(parseInt(e.target.value))}/>

            <hr/>

            <img width={size} height={size} src="https://picsum.photos/1000/1000"/>
        </>
    );
}

//export
export default Ex03a;