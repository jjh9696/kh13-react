//실제 로그인을 처리하기 위한 정보 입력 페이지

import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";
import { useRecoilState } from "recoil";
import { loginIdState, loginLevelState } from "./utils/RecoilData";
//import axios from "axios";//기본 라이브러리
import axios from "./utils/CustomAxios";//개조 라이브러리
import { useNavigate } from "react-router";

const RealLogin = ()=>{

    //state
    const [member, setMember] = useState({
        memberId : "" , memberPw : ""
    });

    //recoil
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

    //callback
    const changeMember = useCallback(e=>{
        setMember({
            ...member,
            [e.target.name] : e.target.value
        });
    }, [member]);

    //navigator
    const navigator = useNavigate();

    const login = useCallback(async ()=>{
        if(member.memberId.length === 0) return;
        if(member.memberPw.length === 0) return;

        const resp = await axios.post("/member/login", member);
        console.log(resp.data);//memberId, memberLevel이 있음
        setLoginId(resp.data.memberId);
        setLoginLevel(resp.data.memberLevel);
        //accessToken은 이후의 axios 요청에 포함시켜서 서버로 가져가야 한다
        //-> 이 순간 이후로 모든 요청의 header에 Authorization이라는 이름으로 토큰을 첨부하겠다
        axios.defaults.headers.common['Authorization'] = resp.data.accessToken;

        //(+추가) refreshToken을 localStroage에 저장
        window.localStorage.setItem("refreshToken", resp.data.refreshToken);

        //강제 페이지 이동 - useNavigate()
        navigator("/");
    }, [member]);

    return (
        <>
            <Jumbotron title="진짜 로그인"/>

            <div className="row mt-4">
                <div className="col">
                    <label>아이디</label>
                    <input type="text" name="memberId" className="form-control"
                            value={member.memberId} onChange={e=>changeMember(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>비밀번호</label>
                    <input type="password" name="memberPw" className="form-control"
                            value={member.memberPw} onChange={e=>changeMember(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-success w-100"
                        onClick={e=>login()}>로그인</button>
                </div>
            </div>
        </>
    );
};

export default RealLogin;