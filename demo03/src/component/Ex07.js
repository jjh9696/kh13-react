import { useMemo, useState } from "react";


function Ex07() {

    //Ex06에서 사용한 네개의 state를 하나의 객체로 관리할 수 있는가?
    //state
    const [score, setScore] = useState({
        java:0, react:0, db:0, design:0
    });

    //function(함수) - 코드가 길어질 때 쉽게 사용할 수 있도록 함수를 생성
    //function 이름(매개변수) { 코드 }
    //const 이름 = (매개변수) => {코드}
    
    //function changeScore(e) {} //람다는 this가 안생김
    const changeScore = (e)=>{
        //다른건 건드리지 않고 이벤트가 발생한 항목의 점수만 변경
        //- 입력창에 반드시 state 객체와 동일한 이름이 있어야 함(e.target.name)
        //- 입력값을 알아야 한다(e.target.value)
        const name = e.target.name;
        //const value = parseInt(e.target.value);
        //const value = e.target.value !== "" ? parseInt(e.target.value) : 0;
        const value = parseInt(e.target.value || 0);

        setScore({
            ...score,//score의 나머지는 유지하세요
            [name] : value //객체의 항목 중 name에 해당하는 항목을 value로 변경
        });
    };

    //memo
    const total = useMemo(()=>{
        return score.java + score.react + score.db + score.design;
    }, [score]);
    const average = useMemo(()=>{
        return total / 4;
    }, [total]);

    return (
        <>
            <h1>화면7번 - 객체 state</h1>

            자바 <input type="text" name="java" 
                            value={score.java} onChange={changeScore}/>
            <br/><br/>
            리액트 <input type="text" name="react" 
                            value={score.react} onChange={changeScore}/>
            <br/><br/>
            DB <input type="text" name="db" 
                            value={score.db} onChange={changeScore}/>
            <br/><br/>
            디자인 <input type="text" name="design" 
                            value={score.design} onChange={changeScore}/>

            <hr/>

            총점 : {total} 점
            <br/><br/>
            평균 : {average} 점

        </>
    );
};

export default Ex07;