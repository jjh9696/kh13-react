//import
import { useState } from 'react';

//function
function Ex04() {

    const [count, setCount] = useState(0);

    return (
        <>
            <h2>은행 이체 화면 문제</h2>

            <input type="number" value={count} readOnly />원
            <br/><br/>
            <button onClick={() => setCount(count+1000000)}>100만</button>&nbsp;
            <button onClick={() => setCount(count+500000)}>50만</button>&nbsp;
            <button onClick={() => setCount(count+100000)}>10만</button>&nbsp;
            <button onClick={() => setCount(count+50000)}>5만</button>&nbsp;
            <button onClick={() => setCount(count+10000)}>1만</button>&nbsp;
            <button onClick={() => setCount(0)}>정정</button>
            <br/><br/>
        </>
    )
}

//export
export default Ex04; 