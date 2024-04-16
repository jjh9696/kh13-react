//import
import { useMemo, useState } from 'react';

//function
function Ex05() {

    const [memberId, setMemberId] = useState("");
    
    //(+추가) memberId가 변하면 그에 따른 글자수와 형식검사를 진행하고 싶다
    //const count = memberId.length;
    const count = useMemo(()=>{
        return memberId.length;
    }, [memberId]);
    
    //const regex = /^[a-z][a-z0-9]{7,19}$/;
    //const isValid = regex.test(memberId);
    const isValid = useMemo(()=>{
        const regex = /^[a-z][a-z0-9]{7,19}$/;
        return regex.test(memberId);
    }, [memberId]);



    return (
        <>
            <h2>화면 5번 - 입력이벤트</h2>

            아이디를 입력하세요
            <br/>

            {/* 
                입력창은 표시와 변경이 동시에 일어나는 컴포넌트이다
                -표시만 하면 변경이 일어나지 않는다
                -value로 표시하고 onChange로 변경하도록 만들거나
                -value로 표시하고 readOnly로 변경이 불가능하도록 만들어야 한다

                React에서는 this를 쓰지 않는다
                -이벤트에서 this 대신 e.target 키워드를 사용한다
                -입력값은 this.value가 아니라 e.target.value가 된다
            */}
            <input type="text" value={memberId} onChange={e=>setMemberId(e.target.value)}/>
            
            <br/>
            입력 글자 수 : {count}
            <br/>
            형식 검사 결과 : {isValid ? '합격' : '불합격'}
            
        </>
    )
}

//export
export default Ex05; 