import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";

function Ex05() {

    //state
    const [people, setPeople] = useState([
        { id: 1, name: "John Doe", age: 25 },
        { id: 2, name: "Jane Smith", age: 30 },
        { id: 3, name: "Emily Brown", age: 22 },
        { id: 4, name: "Michael Johnson", age: 28 },
        { id: 5, name: "Sarah Williams", age: 35 },
        { id: 6, name: "James Wilson", age: 40 },
        { id: 7, name: "Emma Jones", age: 27 },
        { id: 8, name: "William Davis", age: 32 },
        { id: 9, name: "Olivia Miller", age: 29 },
        { id: 10, name: "Daniel Taylor", age: 26 }
      ]);
    const [input, setInput] = useState({
        id : "", 
        name : "", 
        age : ""
    });

    
    const deletePeople = useCallback((target)=>{
        const searchResult = people.filter((people)=>people.id !== target.id);
        setPeople(searchResult);
    }, [people]);

    const clearPeople = useCallback(()=>{
        setPeople([]);
    }, [people]);
    
    
    const changeInput = useCallback((e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,//나머지 input 값은 유지하고
            [name] : value //name에 해당하는 필드만 value로 교체하세요!
        });
    }, [input]);
    const clearInput = useCallback(()=>{

        setInput({
            id : "", 
            name : "", 
            age : ""
        });
    }, [input]);
    
    const saveInput = useCallback(()=>{
        
        const copyInput = {...input};
        
        const copyPeople = [...people, copyInput];//전개연산(spread op)
        
        setPeople(copyPeople);//people 덮어쓰기!
        clearInput();//입력창 지워!
    }, [input, people]);

    return (
        <>
            <Jumbotron title="인물 정보" content="등록, 목록, 전체삭제, 삭제까지 구현"/>

            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-danger"
                        onClick={e=>clearPeople()}>전체삭제</button>
                </div>
            </div>

            <div className="row mt-4 text-center">
                <div className="col-3">번호</div>
                <div className="col-3">이름</div>
                <div className="col-3">나이</div>
                <div className="col-3">메뉴</div>
            </div>
            <hr/>
            {people.map((people)=>(
            <div className="row mt-2 text-center align-items-center" key={people.id}>
                <div className="col-3">{people.id}</div>
                <div className="col-3">{people.name}</div>
                <div className="col-3">{people.age}</div>
                <div className="col-3">
                    <button className="btn btn-danger"
                            onClick={e=>deletePeople(people)}>삭제</button>
                </div>
            </div>
            ))}

            {/* 등록하기 위한 화면을 구현 */}
            <div className="row mt-4">
                <div className="col text-center">
                    <h2>인물 등록</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>번호</label>
                    <input type="text" className="form-control" name="id"
                            value={input.id} onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>이름</label>
                    <input type="text" className="form-control" name="name"
                            value={input.name} onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>나이</label>
                    <input type="text" className="form-control" name="age"
                            value={input.age} onChange={e=>changeInput(e)}/>
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

export default Ex05;