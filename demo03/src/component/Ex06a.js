//import
import { useMemo, useState } from "react";

//function
function Ex06a() {

    //state - 자바,리액트,DB,디자인 점수
    const [javaScore, setJavaScore] = useState(0);
    const [reactScore, setReactScore] = useState(0);
    const [dbScore, setDbScore] = useState(0);
    const [designScore, setDesignScore] = useState(0);

    //memo - 총점,평균
    const total = useMemo(()=>{
        return javaScore + reactScore + dbScore + designScore;
    }, [javaScore, reactScore, dbScore, designScore]);
    const average = useMemo(()=>{
        return total / 4;
    }, [total]);

    return (
        <>
            <h1>6번화면 - 성적계산기</h1>

            자바 <input type="text" value={javaScore} 
                            onChange={e=>setJavaScore(parseInt(e.target.value))}/>
            <br/><br/>
            리액트 <input type="text" value={reactScore} 
                            onChange={e=>setReactScore(parseInt(e.target.value))}/>
            <br/><br/>
            DB <input type="text" value={dbScore} 
                            onChange={e=>setDbScore(parseInt(e.target.value))}/>
            <br/><br/>
            디자인 <input type="text" value={designScore} 
                            onChange={e=>setDesignScore(parseInt(e.target.value))}/>
            <hr/>

            총점 : {total} 점
            <br/><br/>
            평균 : {average} 점
        </>
    );
}

//export
export default Ex06a;