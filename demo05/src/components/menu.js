//화면 상단에 배치할 메뉴(navigator.jsp)

//import
import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";

//function
function Menu() {
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
                            <li className="nav-item">
                                <a className="nav-link active" href="#">햄버거
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">배고프다</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu">
                                    {/* NavLink가 내부적으로 a태그처럼 바뀌기 때문에 className은 그대로 맞춰준다 */}
                                    <NavLink className="dropdown-item" to="/ex01">예제1번</NavLink>
                                    <NavLink className="dropdown-item" to="/ex02">예제2번</NavLink>
                                    {/* <a className="dropdown-item" href="#">예제1번</a>
                                    <a className="dropdown-item" href="#">예제2번</a> */}
                                  
                                </div>
                            </li>
                        </ul>
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