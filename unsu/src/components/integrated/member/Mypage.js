import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from "../../utils/CustomAxios";
import { Link } from "react-router-dom";

const Mypage = () => {
    const loginId = useRecoilValue(loginIdState);
    const [mypage, setMypage] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get(`/member/${loginId}`);
            setMypage(resp.data);
        } catch (error) {
            console.error("데이터읽기실패:", error);
        }
    }, [loginId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (!mypage) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card mb-3">
                <h3 className="card-header">마이페이지</h3>
                <div className="card-body pt-4 ps-4">
                    <h6 className="card-subtitle text-muted"> </h6>
                    <p className="card-text">
                       이름: {mypage.memberName}<br />
                    </p>
                    <p className="card-text">
                       생년월일: {mypage.memberBirth}<br />
                    </p>
                    <p className="card-text">
                       전화번호: {mypage.memberPhone}<br />
                    </p>
                    <p className="card-text">
                        포인트: {mypage.memberPoint }<br />
                    </p>
                    <p className="card-text">
                        이메일: {mypage.memberEmail }<br />
                    </p>
                    <p className="card-text">
                        <label>우편번호: </label>{mypage.memberZip }<br />
                        <label>기본주소: </label>{mypage.memberAddr1 }<br />
                        <label>상세주소: </label>{mypage.memberAddr2 }<br />
                    </p>
                    <div className="card-body text-end">
                        <button className="btn btn-outline-success">회원정보변경</button>
                    </div>
                </div>
                {/* <div className="card-body">
                </div> */}
                {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul> */}
                <div className="card-body">
                    <Link to="#" className="card-link">예매확인</Link>
                    <Link to="#" className="card-link">탑승내역</Link>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
