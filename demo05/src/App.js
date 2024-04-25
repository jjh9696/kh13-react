import { Route, Routes } from 'react-router';
import './App.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoginState, loginIdState, loginLevelState } from './components/utils/RecoilData';
import { Suspense, lazy, useCallback, useEffect } from 'react';
import axios from "./components/utils/CustomAxios";
import LoadingScreen from './LoadingScreen';

//Suspense를 적용하기 위해서는 화면을 Lazy loadin 해야 한다
// import Home from './components/Home';
const Home = lazy(() => import("./components/Home"));
// import Menu from './components/Menu';
const Menu = lazy(() => import("./components/Menu"));
// import Ex01 from './components/Ex01';
const Ex01 = lazy(() => import("./components/Ex01"));
// import Ex02 from './components/Ex02';
const Ex02 = lazy(() => import("./components/Ex02"));
// import Ex03 from './components/Ex03';
const Ex03 = lazy(() => import("./components/Ex03"));
// import Ex04 from './components/Ex04';
const Ex04 = lazy(() => import("./components/Ex04"));
// import Ex04a from './components/Ex04a';
const Ex04a = lazy(() => import("./components/Ex04a"));
// import Ex05 from './components/Ex05';
const Ex05 = lazy(() => import("./components/Ex05"));
// import Pocketmon from './components/integrated/Pocketmon';
const Pocketmon = lazy(() => import("./components/integrated/Pocketmon"));
// import Student from './components/integrated/Student';
const Student = lazy(() => import("./components/integrated/Student"));
// import CountEx from './components/integrated/CountEx';
const CountEx = lazy(() => import("./components/integrated/CountEx"));
// import DummyLogin from './components/DummyLogin';
const DummyLogin = lazy(() => import("./components/DummyLogin"));
// import RealLogin from './components/RealLogin';
const RealLogin = lazy(() => import("./components/RealLogin"));
// import Emp from './components/integrated/Emp';
const Emp = lazy(() => import("./components/integrated/Emp"));
const Book = lazy(() => import("./components/integrated/Book"));

function App() {

  //recoil state
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

  //recoil value
  const isLogin = useRecoilValue(isLoginState);

  //effect
  useEffect(() => {
    refreshLogin();
  }, []);//최초 1회

  //callback
  const refreshLogin = useCallback(async () => {
    //localStorage에 있는 refreshToken의 유무에 따라 로그인 처리를 수행
    const refreshToken = window.localStorage.getItem("refreshToken");
    //console.log(refreshToken);
    if (refreshToken !== null) {//refreshToken 항목이 존재한다면
      //리프레시 토큰으로 Authorization을 변경하고
      axios.defaults.headers.common["Authorization"] = refreshToken;
      //재로그인 요청을 보낸다
      const resp = await axios.post("/member/refresh");
      //결과를 적절한 위치에 설정한다
      setLoginId(resp.data.memberId);
      setLoginLevel(resp.data.memberLevel);
      axios.defaults.headers.common["Authorization"] = resp.data.accessToken;
      window.localStorage.setItem("refreshToken", resp.data.refreshToken);
    }
  }, []);

  return (
    <>
      {/* 메뉴 배치 */}
      <Menu />

      <div className='container-fluid my-5'>
        <div className='row'>
          <div className='col-sm-10 offset-sm-1'>

            {/* 
                메뉴를 눌렀을 때 나올 화면 배치 
                - path를 통해 주소를 설정
                - element를 통해 연결될 화면을 설정
              */}
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ex01" element={<Ex01 />} />
                <Route path="/ex02" element={<Ex02 />} />
                <Route path="/ex03" element={<Ex03 />} />
                <Route path="/ex04" element={<Ex04 />} />
                <Route path="/ex04a" element={<Ex04a />} />
                <Route path="/ex05" element={<Ex05 />} />
                <Route path="/pocketmon" element={<Pocketmon />} />
                <Route path="/emp" element={<Emp />} />
                <Route path="/count" element={<CountEx />} />
                <Route path="/dummy" element={<DummyLogin />} />
                <Route path="/login" element={<RealLogin />} />
                <Route path="/book" element={<Book />} />

                {isLogin &&
                  <Route path="/student" element={<Student />} />
                }
              </Routes>
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;