import logo from './logo.svg';
import './App.css';
import {useState, useMemo} from "react";

function App() {

  //state - 입력창의 name과 이름이 같아야 편하게 객체 state를 이용할 수 있다
  const [member, setMember] = useState({//입력값
    memberId : "" , 
    memberPw : "" , 
    memberPwRe : ""
  });
  const [result, setResult] = useState({//판정결과(true:통과/false:거절)
    memberId : null , 
    memberPw : null, 
    memberPwRe : null
  });

  //function
  //function changeMember(e) {}
  const changeMember = e=> {
    //e는 이벤트 정보이며, e.target은 이벤트 발생 대상 태그이다
    //태그의 name과 value를 추출해서 member를 변경 (setMember 호출)
    setMember({
      ...member,//member의 나머지 항목은 유지를 시키고
      [e.target.name] : e.target.value //입력된 창의 이름에 대한 값만 변경
    });
  };
  const changeResult = e=> {
    //입력이 발생한 항목에 따라 검사를 다르게 한 뒤 결과를 설정
    const name = e.target.name;//입력창의 name 속성
    //const value = e.target.value;//입력창의 value 속성
    //const value = member[name];//member 객체의 name 필드값

    if(name == "memberId") {
      const regex = /^[a-z][a-z0-9]{7,19}$/;
      setResult({
        ...result,//나머지 result 항목은 유지시키고
        memberId : regex.test(member.memberId)//아이디 판정결과 갱신
      });
    }
    else if(name == "memberPw") {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
      setResult({
        ...result,//나머지 result 항목은 유지시키고
        memberPw: regex.test(member.memberPw)//비밀번호 판정결과 갱신
      });
    }
    else if(name == "memberPwRe") {
      const isValid = member.memberPw.length > 0 &&
                                  member.memberPw == member.memberPwRe;
      setResult({
        ...result,//나머지 result 항목은 유지시키고
        memberPwRe : isValid//비밀번호 확인 판정결과 갱신
      });
    }
  };

  //memo - 하나의 결론을 낼 수 있는 값을 계산할 때 사용
  const ok = useMemo(()=>{
    return result.memberId && result.memberPw && result.memberPwRe;
  }, [member, result]);

  return (
    <div className="container-fluid">

      {/* 기본 폭 설정 */}
      <div className='row'>
        <div className='col-md-8 offset-md-2'>

          {/* 점보트론 */}
          <div className='row mt-5'>
            <div className='col'>
              <div className='p-4 bg-dark text-light rounded text-center'>
                <h1>회원가입</h1>
              </div>
            </div>
          </div>

          {/* 각종 입력창(아이디, 비밀번호, 비밀번호 확인) */}
          <div className='row mt-4'>
            <div className='col'>
              <label>아이디</label>
              <input type="text" name="memberId" 
                    // className={'form-control' + ' ' + (result.memberId ? 'is-valid' : 'is-invalid')} //방법 1 + ' ' + 으로 공백 추가
                    className={`
                      form-control 
                      ${result.memberId === true ? 'is-valid' : ''} 
                      ${result.memberId === false ? 'is-invalid' : ''}
                    `}
                    //is-valid, is-invalid는 가변클래스(붙을지 안붙을지 모름)
                    value={member.memberId} onChange={changeMember}
                    onBlur={changeResult}/>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <label>비밀번호</label>
              <input type="password" name="memberPw" 
                    // className={'form-control ' + (result.memberPw ? 'is-valid' : 'is-invalid')} //방법 2 '클래스 '안에 공백
                    className={`
                      form-control 
                      ${result.memberPw === true ? 'is-valid' : ''} 
                      ${result.memberPw === false ? 'is-invalid' : ''}
                    `}
                    value={member.memberPw} onChange={changeMember}
                    onBlur={changeResult}/>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <label>비밀번호 확인</label>
              <input type="password" name="memberPwRe" 
                    //방법 3 백틱 (``안에 넣음)
                    className={` 
                      form-control 
                      ${result.memberPwRe === true ? 'is-valid' : ''}
                      ${result.memberPwRe === false ? 'is-invalid' : ''}
                    `} //${}백틱 구문에 삽입하는 변수
                    value={member.memberPwRe} onChange={changeMember}
                    onBlur={changeResult}/>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <button type="button" className='btn btn-success w-100'
                disabled={ok !== true}>
                회원가입
              </button>  
            </div>            
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;