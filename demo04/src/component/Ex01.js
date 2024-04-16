import { useMemo, useState } from "react";

function Ex01() {
    // 각 입력 필드의 상태를 추적하는 상태 변수
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwRe, setMemberPwRe] = useState("");

    // 아이디 길이 및 형식 검사 결과를 계산하는 useMemo 훅 사용
    const count = useMemo(() => memberId.length, [memberId]);
    const isIdValid = useMemo(() => /^[a-z][a-z0-9]{7,19}$/.test(memberId), [memberId]);

    // 비밀번호와 비밀번호 확인이 일치하는지 확인하는 함수
    const isPasswordMatch = useMemo(() => memberPw === memberPwRe, [memberPw, memberPwRe]);

    return (
        <>
            <h2>화면 5번 - 입력이벤트</h2>

            아이디를 입력하세요<br />
            <input type="text" value={memberId} onChange={e => setMemberId(e.target.value)} /><br />
            입력 글자 수: {count}<br />
            형식 검사 결과: {isIdValid ? '합격' : '불합격'}<br /><br />

            비밀번호를 입력하세요<br />
            <input type="password" value={memberPw} onChange={e => setMemberPw(e.target.value)} /><br /><br />

            비밀번호 확인을 입력하세요<br />
            <input type="password" value={memberPwRe} onChange={e => setMemberPwRe(e.target.value)} /><br /><br />
            비밀번호 확인 결과: {isPasswordMatch ? '일치' : '불일치'}
        </>
    );
}

export default Ex01;