//화면 상단에 배치할 메뉴(예전 navigator.jsp)

//import
import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, loginIdState, loginLevelState } from "./utils/RecoilData";
import { useCallback, useMemo } from "react";
import axios from "./utils/CustomAxios";

//function
function Menu() {

    //recoil state
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

    //recoil value
    const isLogin = useRecoilValue(isLoginState);

    //callback
    const logout = useCallback(() => {
        //recoil 저장소에 대한 정리 + axios의 헤더 제거 + localStorage 청소
        setLoginId('');
        setLoginLevel('');
        delete axios.defaults.headers.common['Authorization'];
        window.localStorage.removeItem("refreshToken");
    }, [loginId, loginLevel]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    {/* React에서는 페이지간 이동을 NavLink 태그로 한다 */}
                    <NavLink className="navbar-brand" to="/">KH정보교육원</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">State예제</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ex01">예제1번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex02">예제2번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex03">예제3번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex04">예제4번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex04a">예제4a번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex05">예제5번</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">통합예제</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/pocketmon">포켓몬스터</NavLink>
                                    <NavLink className="dropdown-item" to="/emp">사원</NavLink>
                                    <NavLink className="dropdown-item" to="/book">도서(무한스크롤)</NavLink>
                                    {/* 
                                        화면을 조건부로 보여줄 때...
                                        [1] 삼항연산자 - { 조건 ? (참일때화면) : (거짓일때화면) } - <c:choose>와 유사
                                        [2] AND연산자 - { 조건 && (참일때화면) } - <c:if>와 유사
                                    */}
                                    {isLogin && (
                                        <NavLink className="dropdown-item" to="/student">학생정보</NavLink>
                                    )}
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                    href="#" role="button" aria-haspopup="true"
                                    aria-expanded="false">Recoil</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/count">카운트예제</NavLink>
                                    <NavLink className="dropdown-item" to="/dummy">더미로그인</NavLink>
                                    {isLogin ? (
                                        <NavLink className="dropdown-item" to="#"
                                            onClick={e => logout()}>진짜로그아웃</NavLink>
                                    ) : (
                                        <NavLink className="dropdown-item" to="/login">진짜로그인</NavLink>
                                    )}
                                </div>
                            </li>
                        </ul>

                        {/* 이 부분을 로그인 여부에 따라 다르게 표시 */}
                        <div className="d-flex text-light">
                            {isLogin ? (
                                <>
                                    현재 로그인 중
                                </>
                            ) : (
                                <>
                                    현재 로그아웃 중
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;