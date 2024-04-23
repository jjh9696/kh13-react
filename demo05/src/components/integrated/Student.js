import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import { FaSquareXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import axios from "../utils/CustomAxios";
import { Modal } from "bootstrap";

const Student = () => {

    //state
    const [students, setStudents] = useState([]);
    const [input, setInput] = useState({
        name:"",
        koreanScore:"",
        englishScore:"",
        mathScore:""
    });
    const [backup, setBackup] = useState(null);//수정 시 복원을 위한 백업

    //effect
    useEffect(() => {
        loadData();
    }, []);

    //callback
    // const loadData = useCallback(()=>{
    //     axios.get("/student/")
    //     .then(resp=>{
    //         setStudents(resp.data);
    //     });
    // }, [students]);

    //- 자바스크립트는 너무나도 많은 비동기 코드를 가지고 있다(특히 ajax)
    //- 필요 이상으로 코드가 중첩되는 것을 막기 위해 ES6에서 Promise 패턴이 나온다
    //- async 함수를 만들고 내부에서 await 키워드를 사용하면 비동기 코드를 동기처럼 사용 가능
    const loadData = useCallback(async ()=>{
        const resp = await axios.get("/student/"); 
        setStudents(resp.data);
    }, [students]);

    const deleteStudent = useCallback(async (target)=>{
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        //target에 있는 내용을 서버에 지워달라고 요청하고 목록을 다시 불러온다
        const resp = await axios.delete("/student/"+target.studentId);
        loadData();
    }, [students]);

    //신규 등록 화면 입력값 변경
    const changeInput = useCallback((e)=>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }, [input]);
    //등록
    const saveInput = useCallback(async ()=>{
        //입력값에 대한 검사 코드가 필요하다면 이자리에 추가하고 차단!
        //if(검사결과 이상한 데이터가 입력되어 있다면) return;

        //input에 들어있는 내용을 서버로 전송하여 등록한 뒤 목록 갱신 + 모달 닫기
        const resp = await axios.post("/student/", input);
        loadData();
        clearInput();
        closeModal();
    }, [input]);
    //등록 취소
    const cancelInput = useCallback(()=>{
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if(choice === false) return;
        clearInput();
        closeModal();
    }, [input]);
    //입력값 초기화
    const clearInput = useCallback(()=>{
        setInput({
            name:"", koreanScore:"", englishScore: "", mathScore:""
        });
    }, [input]);

    //해당 줄을 수정상태(edit===true)로 만드는 함수
    //target은 수정을 누른 줄의 학생 정보
    const editStudent = useCallback((target)=>{
        //1. students를 복제한다
        const copy = [...students];

        //(+추가) 이미 수정중인 항목이 있을 수 있으므로 해당 항목은 취소 처리가 필요
        const recover = copy.map(student=>{
            if(student.edit === true) {//수정중인 항목을 발견하면
                return {...backup, edit:false};//백업으로 갱신 + 수정모드 취소
            }
            else {
                return {...student};//그대로
            }
        });

        //(+추가) 나중을 위해 target를 백업해둔다 (target은 수정버튼 누른항목)
        setBackup({...target});

        //2. recover를 고친다
        //- recover 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환시켜야 하므로 map 함수를 사용한다
        const copy2 = recover.map(student=>{
            //target : 수정버튼을 누른 학생정보, student : 현재 회차의 학생정보
            if(target.studentId === student.studentId) {//원하는 정보일 경우
                return {
                    ...student,//나머지 정보는 유지하되
                    edit:true,//edit 관련된 처리를 추가하여 반환
                };
            }
            else {//원하는 정보가 아닐 경우
                return {...student};//데이터를 그대로 복제하여 반환
            }
        });


        //3. copy2를 students에 덮어쓰기한다
        setStudents(copy2);
    }, [students]);

    const cancelEditStudent = useCallback((target)=>{
        //1. students를 복제한다
        const copy = [...students];

        //2. copy를 고친다
        //- copy 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환시켜야 하므로 map 함수를 사용한다
        const copy2 = copy.map(student=>{
            //target : 수정버튼을 누른 학생정보, student : 현재 회차의 학생정보
            if(target.studentId === student.studentId) {//원하는 정보일 경우
                return {
                    ...backup,//백업 정보를 전달
                    edit:false,//edit 관련된 처리를 추가하여 반환
                };
            }
            else {//원하는 정보가 아닐 경우
                return {...student};//데이터를 그대로 복제하여 반환
            }
        });

        //3. copy2를 students에 덮어쓰기한다
        setStudents(copy2);
    }, [students]);

    //수정 입력창에서 입력이 발생할 경우 실행할 함수
    //- students 중에서 대상을 찾아 해당 필드를 교체하여 재설정
    //- e는 입력이 발생한 창의 이벤트 정보
    //- target은 입력이 발생한 창이 있는 줄의 학생정보
    const changeStudent = useCallback((e, target)=>{
        const copy = [...students];
        const copy2 = copy.map(student=>{
            if(target.studentId === student.studentId) {//이벤트 발생한 학생이라면
                return {
                    ...student,//나머지 정보는 유지
                    [e.target.name] : e.target.value//단, 입력항목만 교체
                };
            }
            else {//다른 학생이라면
                return {...student};//현상유지
            }
        });
        setStudents(copy2);
    }, [students]);

    //수정된 결과를 저장 + 목록갱신 + 수정모드 해제
    const saveEditStudent = useCallback(async (target)=>{
        //서버에 target을 전달하여 수정 처리
        const resp = await axios.patch("/student/", target);
        //목록 갱신
        loadData();
    }, [students]);

    //ref + modal
    const bsModal = useRef();
    const openModal = useCallback(()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    //view
    return (
        <>
            {/* 제목 */}
            <Jumbotron title="학생 관리" content="학생 관련 C.R.U.D" />

            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary" 
                            onClick={e=>openModal()}>
                        <IoMdAdd/>
                        신규 등록
                    </button>
                </div>
            </div>

            {/* 데이터 출력(표) */}
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th width="100">번호</th>
                                <th>이름</th>
                                <th>국어</th>
                                <th>영어</th>
                                <th>수학</th>
                                <th width="100">메뉴</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {students.map(student => (
                                <tr key={student.studentId}>
                                    { student.edit === true ? (
                                        <>
                                            <td>{student.studentId}</td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={student.name} name="name"
                                                    onChange={e=>changeStudent(e, student)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={student.koreanScore} name="koreanScore"
                                                    onChange={e=>changeStudent(e, student)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={student.englishScore} name="englishScore"
                                                    onChange={e=>changeStudent(e, student)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={student.mathScore} name="mathScore"
                                                    onChange={e=>changeStudent(e, student)}/>
                                            </td>
                                            <td>
                                                <FaCheck className="text-success me-2"
                                                        onClick={e=>saveEditStudent(student)}/>
                                                <TbPencilCancel className="text-danger"
                                                        onClick={e=>cancelEditStudent(student)}/>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{student.studentId}</td>
                                            <td>{student.name}</td>
                                            <td>{student.koreanScore}</td>
                                            <td>{student.englishScore}</td>
                                            <td>{student.mathScore}</td>
                                            <td>
                                                <FaEdit className="text-warning me-2"
                                                    onClick={e=>editStudent(student)}/>
                                                <FaSquareXmark className="text-danger" 
                                                    onClick={e=>deleteStudent(student)}/>
                                            </td>
                                        </>
                                    ) }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 학생 등록</h1>
                        <button type="button" className="btn-close" aria-label="Close"
                                onClick={e=>cancelInput()}></button>
                    </div>
                    <div className="modal-body">
                        {/* 등록 화면 */}
                        
                        <div className="row">
                            <div className="col">
                                <label>학생명</label>
                                <input type="text" name="name" 
                                    value={input.name} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>국어점수</label>
                                <input type="text" name="koreanScore" 
                                    value={input.koreanScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>영어점수</label>
                                <input type="text" name="englishScore" 
                                    value={input.englishScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>수학점수</label>
                                <input type="text" name="mathScore" 
                                    value={input.mathScore} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-success me-2' onClick={e=>saveInput()}>
                            등록
                        </button>
                        <button className='btn btn-danger' onClick={e=>cancelInput()}>
                            취소
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Student;