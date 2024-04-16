//import
import { useState } from 'react';

//function
function Ex03() {
    const [size, setSize] = useState(300);

    return (
        <>
            <h2>3번 화면</h2>

            <div>
                <button onClick={() => setSize(150)}>작게</button>
                <button onClick={() => setSize(300)}>보통</button>
                <button onClick={() => setSize(450)}>크게</button>
            </div>
            <div>
                <img src={`https://picsum.photos/${size}/${size}/?random=`} width={size} height={size}/>
            </div>
        </>
    )
}

//export
export default Ex03;

