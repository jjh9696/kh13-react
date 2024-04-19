import Jumbotron from "./Jumbotron";
import { useCallback, useState } from 'react';


function Ex04() {
    //state
    const [countrys, setCountrys] = useState([
        {no:1, name:"한국", capital:"서울"},
        {no:2, name:"미국", capital:"워싱턴"},
        {no:3, name:"일본", capital:"도쿄"},
        {no:4, name:"중국", capital:"베이징"},
        {no:5, name:"영국", capital:"런던"},
        {no:6, name:"프랑스", capital:"파리"},
        {no:7, name:"독일", capital:"베를린"},
        {no:8, name:"인도", capital:"뉴델리"},
        {no:9, name:"호주", capital:"캔버라"},
        {no:10, name:"스페인", capital:"마드리드"},
    ]);

    //function(callback)
    //-const 함수명 = useCallback(함수,[연관항목]);
    //-연관항목이 변했을 경우만 함수를 재설정하게 되어 최적화 가능
    //-연관항목이 없으면 비어있는 배열로 설정
    
    // const clearCountrys = (e)=> {setCountrys([]);}; //e를 만들어서 보관

    // const deleteCountry = (target)=> {
    //     const searchCountrys = countrys.filter((country)=>country.no !== target.no);

    //     setCountrys(searchCountrys);//검색 결과로 state를 덮어쓰기
    // }

    const clearCountrys = useCallback(()=> {setCountrys([]);}, [countrys]);

    //function deleteItem(target){}
    //const deleteItem = (target)=>{};
    const deleteCountry = useCallback((target)=>{
        const searchResult = countrys.filter((country)=>country.no !== target.no);
        setCountrys(searchResult);
    }, [countrys])



    return (
        <> 
            <Jumbotron title="수도 출력 예제"/>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-danger" onClick={clearCountrys}>전체삭제</button>
                    {/* 같은 코드 */}
                    {/* <button className="btn btn-danger" onClick={e=>clearCountrys(e)}>전체삭제</button> */}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-bordered table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>나라번호</th>
                                <th>나라이름</th>
                                <th>수도</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {/* 
                                map을 이용한 반복을 할 때
                                생성하는 태그에 제어가 가능한 고유 식별자를 추가(key)

                                안해도 구동은 되지만 지속적인 오류 + 순서 변환 안됨
                            */}
                            {countrys.map((country,index)=>(
                                <tr key={country.no}>
                                    <td>{country.no}</td>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>
                                        <button className="btn btn-danger"
                                            onClick={e=>deleteCountry(country)}> &minus; </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Ex04;