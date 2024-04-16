//import
import { useMemo, useState } from 'react';

//function
function Ex06() {

    const [javaScore, setJavaScore] = useState(0);
    const [reactScore, setReactScore] = useState(0);
    const [dbScore, setDBScore] = useState(0);
    const [designScore, setDesignScore] = useState(0);
    
    const total = useMemo(() => {
        return parseFloat(javaScore) + parseFloat(reactScore) + parseFloat(dbScore) + parseFloat(designScore);
    }, [javaScore, reactScore, dbScore, designScore]);



    return (
        <>
            <h2>성적 계산기</h2>

            아이디를 입력하세요
            <br/>

            자바 <input type="number" value={javaScore} onChange={e=>setJavaScore(e.target.value)}/><br/>
            리액트 <input type="number" value={reactScore} onChange={e=>setReactScore(e.target.value)}/><br/>
            DB <input type="number" value={dbScore} onChange={e=>setDBScore(e.target.value)}/><br/>
            디자인 <input type="number" value={designScore} onChange={e=>setDesignScore(e.target.value)}/><br/>
            <hr/>
            총점 : {total}
            <br/>
            평균 : {total/4}
            
        </>
    )
}

//export
export default Ex06; 