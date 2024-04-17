import Jumbotron from "./Jumbotron";
import { useState } from 'react';

function Ex02() {
    
    //state
    const [toys, setToys] = useState([
        {toySerial:1, toyName:"뽀로로", toyPrice:15000},
        {toySerial:2, toyName:"크롱", toyPrice:12000},
        {toySerial:3, toyName:"루피", toyPrice:18000},
        {toySerial:4, toyName:"패티", toyPrice:16000},
        {toySerial:5, toyName:"포비", toyPrice:22000},
        {toySerial:6, toyName:"루디", toyPrice:21000},
        {toySerial:7, toyName:"에디", toyPrice:12000},
        {toySerial:8, toyName:"똘똘이", toyPrice:11500},
        {toySerial:9, toyName:"앵두", toyPrice:10000},
        {toySerial:10, toyName:"신형우", toyPrice:225},
    ]);

    return (
        <>
            <Jumbotron title="예제2번" content="두번째 예제"/>
            
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>일련번호</th>
                                <th>장난감 이름</th>
                                <th>가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toys.map((toy,index)=>(
                                <tr key={toy.toySerial}>
                                    <td>{toy.toySerial}</td>
                                    <td>{toy.toyName}</td>
                                    <td>{toy.toyPrice}원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Ex02;