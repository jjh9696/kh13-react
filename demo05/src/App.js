import logo from './logo.svg';
import './App.css';
import Menu from './components/menu';
import { Route, Routes } from 'react-router';
import Home from './components/Home';
import Ex01 from './components/Ex01';
import Ex02 from './components/Ex02';
import Ex03 from './components/Ex03';

function App() {
  return (
    <>
      {/* 메뉴 배치 */}
      <Menu/>

      <div className='container-fluid my-5'>
        <div className='row'>
          <div className='col-sm-10 offset-sm-1'>

          {/* 
            메뉴를 눌렀을 때 나올 화면 배치
            -paht를 통해 주소를 설정 
            -element를 통해 연결될 화면을 설정
          */}
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/ex01" element={<Ex01/>} />
            <Route path="/ex02" element={<Ex02/>} />
            <Route path="/ex03" element={<Ex03/>} />
          </Routes>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
