//화면 상단에 배치할 메뉴(예전 navigator.jsp)

//import
import {NavLink} from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginIdState, loginLevelState } from "./utils/RecoilData";
import { useCallback, useMemo } from "react";

//function
function Menu() {

    //state
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

    //memo
    const isLogin = useMemo(()=>{
        return loginId.length > 0 && loginLevel.length > 0;
    }, [loginId, loginLevel]);

    //callback
    const logout = useCallback(()=>{
        setLoginId('');
        setLoginLevel('');
    }, [loginId, loginLevel]);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    {/* React에서는 페이지간 이동을 NavLink 태그로 한다 */}
                    <NavLink className="navbar-brand" to="/">왕햄버거의 교실</NavLink>
                    {/* a태그 안씀 */}
                    {/* <a className="navbar-brand" href="/">왕햄버거의 교실</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">State 예제</a>
                                <div className="dropdown-menu">
                                    {/* NavLink가 내부적으로 a태그처럼 바뀌기 때문에 className은 그대로 맞춰준다 */}
                                    <NavLink className="dropdown-item" to="/ex01">예제1번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex02">예제2번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex03">예제3번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex04">예제4번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex04a">예제4a번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex05">예제5번</NavLink>
                                    {/* <a className="dropdown-item" href="#">예제1번</a>
                                    <a className="dropdown-item" href="#">예제2번</a> */}
                                  
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">통합예제</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/pocketmon">포켓몬스터</NavLink>
                                    <NavLink className="dropdown-item" to="/emp">사원</NavLink>
                                    <NavLink className="dropdown-item" to="/student">학생</NavLink>
                                    <NavLink className="dropdown-item" to="/menu1">메뉴</NavLink>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" 
                                    href="#" role="button" aria-haspopup="true" 
                                    aria-expanded="false">Recoil</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/count">카운트예제</NavLink>
                                    <NavLink className="dropdown-item" to="/dummy">더미로그인</NavLink>
                                    { isLogin ? (
                                        <NavLink className="dropdown-item" to="#" 
                                                    onClick={e=>logout()}>진짜로그아웃</NavLink>
                                    ) : (
                                        <NavLink className="dropdown-item" to="/login">진짜로그인</NavLink>
                                    ) }
                                </div>
                            </li>
                        </ul>

                        {/* 이 부분을 로그인 여부에 따라서 다르게 표시 */}
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
                        <form className="d-flex">
                            <input className="form-control me-sm-2" type="search" placeholder="Search" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

//export
export default Menu;