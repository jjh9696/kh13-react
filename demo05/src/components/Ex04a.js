import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";

function Ex04a() {

    //state
    const [nations, setNations] = useState([
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
    const [input, setInput] = useState({
        no : "", 
        name : "", 
        capital : ""
    });

    //function(callback)
    // - const 함수명 = useCallback(함수, [연관항목]);
    // - 연관항목이 변했을 경우만 함수를 재설정하게 되어 최적화 가능
    // - 연관항목이 없으면 비어있는 배열로 설정
    
    //function deleteNation(target){}
    //const deleteNation = (target)=>{};
    const deleteNation = useCallback((target)=>{
        const searchResult = nations.filter((nation)=>nation.no !== target.no);
        setNations(searchResult);
    }, [nations]);

    const clearNations = useCallback(()=>{
        setNations([]);
    }, [nations]);
    
    //등록화면에 입력이 발생하면 state를 갱신하기 위한 함수
    //function changeInput(e){}
    //const changeInput = (e)=>{};
    const changeInput = useCallback((e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,//나머지 input 값은 유지하고
            [name] : value //name에 해당하는 필드만 value로 교체하세요!
        });
    }, [input]);
    const clearInput = useCallback(()=>{
        //입력창을 지워라 === 값이 없는 객체로 바꿔라
        const choice = window.confirm("정말 지워?");
        if(choice == false) return;

        setInput({
            no : "", 
            name : "", 
            capital : ""
        });
    }, [input]);
    //저장 === input의 데이터를 nations에 추가하고 input은 초기화
    const saveInput = useCallback(()=>{
        //input은 입력창과 연결된 데이터이기 때문에 추가할 때는 복제하여 사용
        
        //input을 모두 복사해서 copyInput을 만들고
        const copyInput = {...input};
        //nations를 모두 복사하고 마지막에 copyInput을 추가해서 새로운 배열을 만든다
        const copyNations = [...nations, copyInput];//전개연산(spread op)
        //const copyNations = nations.concat(copyInput);//연결명령
        setNations(copyNations);//nations 덮어쓰기!
        clearInput();//입력창 지워!
    }, [input, nations]);

    return (
        <>
            <Jumbotron title="국가 정보" content="등록, 목록, 전체삭제, 삭제까지 구현"/>

            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-danger"
                        onClick={e=>clearNations()}>전체삭제</button>
                </div>
            </div>

            <div className="row mt-4 text-center">
                <div className="col-3">번호</div>
                <div className="col-3">국가</div>
                <div className="col-3">수도</div>
                <div className="col-3">메뉴</div>
            </div>
            <hr/>
            {nations.map((nation)=>(
            <div className="row mt-2 text-center align-items-center" key={nation.no}>
                <div className="col-3">{nation.no}</div>
                <div className="col-3">{nation.name}</div>
                <div className="col-3">{nation.capital}</div>
                <div className="col-3">
                    <button className="btn btn-danger"
                            onClick={e=>deleteNation(nation)}>삭제</button>
                </div>
            </div>
            ))}

            {/* 등록하기 위한 화면을 구현 */}
            <div className="row mt-4">
                <div className="col text-center">
                    <h2>국가 등록</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>번호</label>
                    <input type="text" className="form-control" name="no"
                            value={input.no} onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>국가</label>
                    <input type="text" className="form-control" name="name"
                            value={input.name} onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>수도</label>
                    <input type="text" className="form-control" name="capital"
                            value={input.capital} onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-success"
                                    onClick={e=>saveInput()}>저장</button>
                    <button className="btn btn-danger ms-2"
                                    onClick={e=>clearInput()}>취소</button>
                </div>
            </div>
        </>
    );
}

export default Ex04a;