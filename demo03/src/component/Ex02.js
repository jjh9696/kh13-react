//import
//react 라이버러리 중에서 userState라는 기능을 쓰겠다
//Naming import (전체 다 안쓰고 골라서 사용)
import { useState } from 'react';

//function
function Ex02() {

    //화면에서 변화하는 값을 state로 선언
    //-const는 불변값을 생성할 때 사용
    //-React는 데이터 변화에 따라 화면을 자동갱신
    //-자동갱신 구조 구현을 위해 반드시 const필요
    //-만들 때 변수명, setter 메소드명을 순차적으로 작성
    //-사용할 때는 변수를 쓰고, 변경할 때는 setter 메소드 사용
    const [count, setCount] = useState(16);

    //state를 화면에 출력할 수 있다
    //-{이름} 형식으로 화면에 출력(표현식), EL과 유사
    //-state가 변하면 해당 자리의 값이 자동으로 변함
    //이벤트를 설정할 수 있다
    //-onClick과 같이 반드시 이벤트 첫글자가 대문자여야한다
    //-onClick 안에는 함수를 배치하여야 한다
    //-람다 형식으로 사용(화살표 함수, Arrow function)

    return (
        <>
            <h2>2번 화면</h2>

            {/* <button onClick={e=>setCount(count-1)}>-</button> */}
            <button onClick={function(e){setCount(count-1)}}>-</button>
            &nbsp;&nbsp;
            <span>{count}</span>
            &nbsp;&nbsp;
            <button onClick={e=>setCount(count+1)}>+</button>
            
        </>
    )
}

//export
export default Ex02; //접근을 허용하겠습니다