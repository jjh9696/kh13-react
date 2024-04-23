// Recoil을 이용해서 전체 애플리케이션에서 사용할 데이터를 선언
//-기존의 Spring Boot에서 사용하는 HttpSession을 대체할 예정

import {atom} from "recoil";

//atom은 recoil 저장소에 변수를 생성하는 역할
const countState = atom({
    key : 'countState', //식별자(ID)
    default : 0 //초기값
});

//로그인과 관련된 저장소 설정
const loginIdState = atom({
    key : 'loginIdState',
    default : ''
});

const loginLevelState = atom({
    key : 'loginLevelState',
    default : ''
});

//default export는 하나밖에 할 수 없다
//export default countState;

//naming export는 여러 개 할 수 있다.
export {countState};
export {loginIdState};
export {loginLevelState};