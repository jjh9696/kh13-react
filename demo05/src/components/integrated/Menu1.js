import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import { FaSquareXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { TbPencilCancel } from "react-icons/tb";
import axios from "../utils/CustomAxios";
import { Modal } from "bootstrap";

const Menu1 = () => {

    //state
    const [menus, setMenus] = useState([]);
    const [input, setInput] = useState({
        menuNameKor:"",
        menuNameEng:"",
        menuType:"",
        menuPrice:""
    });
    const [backup, setBackup] = useState(null);//수정 시 복원을 위한 백업

    //effect
    useEffect(() => {
        loadData();
    }, []);


    //- 자바스크립트는 너무나도 많은 비동기 코드를 가지고 있다(특히 ajax)
    //- 필요 이상으로 코드가 중첩되는 것을 막기 위해 ES6에서 Promise 패턴이 나온다
    //- async 함수를 만들고 내부에서 await 키워드를 사용하면 비동기 코드를 동기처럼 사용 가능
    const loadData = useCallback(async ()=>{
        const resp = await axios.get("/menu1/"); 
        setMenus(resp.data);
    }, [menus]);

    const deleteMenu = useCallback(async (target)=>{
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        //target에 있는 내용을 서버에 지워달라고 요청하고 목록을 다시 불러온다
        const resp = await axios.delete("/menu1/"+target.menuNo);
        loadData();
    }, [menus]);

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
        const resp = await axios.post("/menu1/", input);
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
            menuNameKor:"", menuNameEng:"", menuType: "", menuPrice:""
        });
    }, [input]);

    //해당 줄을 수정상태(edit===true)로 만드는 함수
    //target은 수정을 누른 줄의 메뉴 정보
    const editMenu = useCallback((target)=>{
        //1. students를 복제한다
        const copy = [...menus];

        //(+추가) 이미 수정중인 항목이 있을 수 있으므로 해당 항목은 취소 처리가 필요
        const recover = copy.map(menu1=>{
            if(menu1.edit === true) {//수정중인 항목을 발견하면
                return {...backup, edit:false};//백업으로 갱신 + 수정모드 취소
            }
            else {
                return {...menu1};//그대로
            }
        });

        //(+추가) 나중을 위해 target를 백업해둔다 (target은 수정버튼 누른항목)
        setBackup({...target});

        //2. recover를 고친다
        //- recover 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환시켜야 하므로 map 함수를 사용한다
        const copy2 = recover.map(menu1=>{
            //target : 수정버튼을 누른 메뉴정보, student : 현재 회차의 메뉴정보
            if(target.menuNo === menu1.menuNo) {//원하는 정보일 경우
                return {
                    ...menu1,//나머지 정보는 유지하되
                    edit:true,//edit 관련된 처리를 추가하여 반환
                };
            }
            else {//원하는 정보가 아닐 경우
                return {...menu1};//데이터를 그대로 복제하여 반환
            }
        });


        //3. copy2를 students에 덮어쓰기한다
        setMenus(copy2);
    }, [menus]);

    const cancelEditMenu = useCallback((target)=>{
        //1. students를 복제한다
        const copy = [...menus];

        //2. copy를 고친다
        //- copy 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환시켜야 하므로 map 함수를 사용한다
        const copy2 = copy.map(menu1=>{
            //target : 수정버튼을 누른 메뉴정보, student : 현재 회차의 메뉴정보
            if(target.menuNo === menu1.menuNo) {//원하는 정보일 경우
                return {
                    ...backup,//백업 정보를 전달
                    edit:false,//edit 관련된 처리를 추가하여 반환
                };
            }
            else {//원하는 정보가 아닐 경우
                return {...menu1};//데이터를 그대로 복제하여 반환
            }
        });

        //3. copy2를 students에 덮어쓰기한다
        setMenus(copy2);
    }, [menus]);

    //수정 입력창에서 입력이 발생할 경우 실행할 함수
    //- students 중에서 대상을 찾아 해당 필드를 교체하여 재설정
    //- e는 입력이 발생한 창의 이벤트 정보
    //- target은 입력이 발생한 창이 있는 줄의 메뉴정보
    const changeMenu = useCallback((e, target)=>{
        const copy = [...menus];
        const copy2 = copy.map(menu1=>{
            if(target.menuNo === menu1.menuNo) {//이벤트 발생한 메뉴이라면
                return {
                    ...menu1,//나머지 정보는 유지
                    [e.target.name] : e.target.value//단, 입력항목만 교체
                };
            }
            else {//다른 메뉴이라면
                return {...menu1};//현상유지
            }
        });
        setMenus(copy2);
    }, [menus]);

    //수정된 결과를 저장 + 목록갱신 + 수정모드 해제
    const saveEditMenu = useCallback(async (target)=>{
        //서버에 target을 전달하여 수정 처리
        const resp = await axios.patch("/menu1/", target);
        //목록 갱신
        loadData();
    }, [menus]);

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
            <Jumbotron title="메뉴 관리" content="메뉴 관련 C.R.U.D" />

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
                                <th>한글메뉴명</th>
                                <th>영문메뉴명</th>
                                <th>종류</th>
                                <th>가격</th>
                                <th width="100">메뉴</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {menus.map(menu1 => (
                                <tr key={menu1.menuNo}>
                                    { menu1.edit === true ? (
                                        <>
                                            <td>{menu1.menuNo}</td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={menu1.menuNameKor} name="menuNameKor"
                                                    onChange={e=>changeMenu(e, menu1)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={menu1.menuNameEng} name="menuNameEng"
                                                    onChange={e=>changeMenu(e, menu1)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={menu1.menuType} name="menuType"
                                                    onChange={e=>changeMenu(e, menu1)}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control"
                                                    value={menu1.menuPrice} name="menuPrice"
                                                    onChange={e=>changeMenu(e, menu1)}/>
                                            </td>
                                            <td>
                                                <FaCheck className="text-success me-2"
                                                        onClick={e=>saveEditMenu(menu1)}/>
                                                <TbPencilCancel className="text-danger"
                                                        onClick={e=>cancelEditMenu(menu1)}/>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{menu1.menuNo}</td>
                                            <td>{menu1.menuNameKor}</td>
                                            <td>{menu1.menuNameEng}</td>
                                            <td>{menu1.menuType}</td>
                                            <td>{menu1.menuPrice}</td>
                                            <td>
                                                <FaEdit className="text-warning me-2"
                                                    onClick={e=>editMenu(menu1)}/>
                                                <FaSquareXmark className="text-danger" 
                                                    onClick={e=>deleteMenu(menu1)}/>
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
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 메뉴 등록</h1>
                        <button type="button" className="btn-close" aria-label="Close"
                                onClick={e=>cancelInput()}></button>
                    </div>
                    <div className="modal-body">
                        {/* 등록 화면 */}
                        
                        <div className="row">
                            <div className="col">
                                <label>메뉴명</label>
                                <input type="text" name="menuNameKor" 
                                    value={input.menuNameKor} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>국어점수</label>
                                <input type="text" name="menuNameEng" 
                                    value={input.menuNameEng} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>영어점수</label>
                                <input type="text" name="menuType" 
                                    value={input.menuType} 
                                    onChange={e=>changeInput(e)}
                                    className="form-control"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label>수학점수</label>
                                <input type="text" name="menuPrice" 
                                    value={input.menuPrice} 
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

export default Menu1;