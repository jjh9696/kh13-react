// Recoil을 이용해서 전체 애플리케이션에서 사용할 데이터 선언
// 기존의 Spring Boot 에서 사용하는 HttpSession 을 대체할 예정
import {atom, selector} from "recoil";


const countState = atom({
    key : 'countState',
    default : 0
});
// 로그인과 관련된 저장소 설정
const loginIdState = atom({
    key : 'loginIdState',
    default: ''
});

const loginLevelState = atom({
    key : 'loginLevelState',
    default : ''
});

// atom 으로 생성한 데이터를 조합하여 무언가를 계산 할 수 있다.
// -> 외부에서는 useRecoilValue로 부른다
const isLoginState = selector({
    key : 'isLoginState',
    get : (state)=>{// state를 불러와서 새로운 값을 계산해서 반환하는 함수
        // 미리만든 state중에 loginIdState 에 해당하는 값을 주세용
        const loginId = state.get(loginIdState);
        // 미리만든 state중에 loginLevelState 에 해당하는 값을 주세용
        const loginLevel = state.get(loginLevelState);

        return loginId && loginId.length >0 &&
                  loginLevel && loginLevel.length >0;
    }
});

const isAdminState = selector({
    key : 'isAdminState',
    get : (state)=>{
        const loginLevel = state.get(loginLevelState);
        return loginLevel === '관리자';
    }
});

// default export는 하나밖에 할 수 없다
// export default countState;

// naming export 는 여러개 할 수 있다. {} 로 해야함
export {countState, loginIdState, loginLevelState,isLoginState, isAdminState}; 