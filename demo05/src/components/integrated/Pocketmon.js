import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Jumbotron from '../Jumbotron';
// import axios from "axios";
import axios from "../utils/CustomAxios";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { Modal } from 'bootstrap';

//function Pocketmon() {}
const Pocketmon = ()=>{
    //state
    const [pocketmons, setPocketmons] = useState([]);
    const [input, setInput] = useState({
        pocketmonNo:"",
        pocketmonName:"",
        pocketmonType:""
    });

    //effect
    // - 시작시점 또는 state가 변경되는 시점에 자동으로 실행되는 코드
    // - 가급적이면 안쓰거나 적게 쓰는게 좋다(성능에 무리가 간다)
    // - index.js에 있는 <React.StrictMode> 태그의 영향을 받는다 (x2)
    // - useEffect(함수, [연관항목]);
    
    //시작하자마자 서버와 통신해서 pocketmons에 데이터를 넣는다
    useEffect(()=>{
        loadData();
    }, []);//최초1회만

    //callback
    const changeInput = useCallback((e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,//원래input을 유지시키되
            [name]:value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [input]);

    const saveInput = useCallback(()=>{
        axios({
            url:"/pocketmon/",
            method:"post",
            data: input
        })
        .then(resp=>{
            //등록이 완료되면? 목록 갱신
            loadData();

            setInput({
                pocketmonNo:"",
                pocketmonName:"",
                pocketmonType:""
            });

            closeModal();
        });
    }, [input]);

    const cancelInput = useCallback(()=>{
        //필요하다면 확인창 추가

        setInput({
            pocketmonNo:"",
            pocketmonName:"",
            pocketmonType:""
        });

        closeModal();
    }, [input]);

    //목록 불러오기
    const loadData = useCallback(()=>{
        /*
        $.ajax({
            url:"http://localhost:8080/pocketmon/",
            method:"get",
            success:function(resp){
                setPocketmons(resp);
            }
        });
        */

        axios({
            url:"/pocketmon/",
            method:"get"
        })
        .then(resp=>{
            setPocketmons(resp.data);
        });
    }, [pocketmons]);

    //항목 삭제
    const deletePocketmon = useCallback((target)=>{
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if(choice === false) return;

        axios({
            url:"/pocketmon/"+target.pocketmonNo,
            //url:`http://localhost:8080/pocketmon/${target.pocketmonNo}`,
            method:"delete"
        })
        .then(resp=>{
            loadData();
        });
    }, [pocketmons]);


    //ref(참조)
    //- 리액트에서 태그를 선택하는 대신 사용하는 도구(그 외의 용도도 가능)
    //- 변수명.current 를 이용하여 현재 참조하고 있는 대상 태그를 호출할 수 있음
    const bsModal = useRef();//리모컨
    const openModal = useCallback(()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(()=>{
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    return (
        <>
            <Jumbotron title="포켓몬스터 관리"/>

            {/* 신규등록버튼(모달띄우기) */}
            <div className='row mt-4'>
                <div className='col text-end'>
                    <button className='btn btn-primary' 
                                                    onClick={e=>openModal()}>
                        <FaPlus/>
                        신규등록
                    </button>
                </div>
            </div>

            {/* 목록 출력 */}
            <div className='row mt-4'>
                <div className='col'>
                    <table className='table'>
                        <thead className='text-center'>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>속성</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {pocketmons.map(pocketmon=>(
                            <tr key={pocketmon.pocketmonNo}>
                                <td>{pocketmon.pocketmonNo}</td>
                                <td>{pocketmon.pocketmonName}</td>
                                <td>{pocketmon.pocketmonType}</td>
                                <td>
                                    <button className='btn btn-danger'
                                        onClick={e=>deletePocketmon(pocketmon)}>
                                            <MdDelete />
                                            &nbsp;
                                            삭제
                                    </button>
                                </td>
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
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 몬스터 등록</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={e=>cancelInput()}></button>
                    </div>
                    <div className="modal-body">
                        {/* 등록 화면 */}
                        <div className='row mt-4'>
                            <div className='col'>
                                <label>번호</label>  
                                <input type="text" name="pocketmonNo" 
                                        value={input.pocketmonNo} 
                                        onChange={e=>changeInput(e)}
                                        className='form-control'/>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col'>
                                <label>이름</label>  
                                <input type="text" name="pocketmonName" 
                                        value={input.pocketmonName} 
                                        onChange={e=>changeInput(e)}
                                        className='form-control'/>
                            </div>
                        </div>

                        <div className='row mt-4'>
                            <div className='col'>
                                <label>속성</label>  
                                <input type="text" name="pocketmonType" 
                                        value={input.pocketmonType} 
                                        onChange={e=>changeInput(e)}
                                        className='form-control'/>
                            </div>
                        </div>
                    
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-success me-2'
                                    onClick={e=>saveInput()}>
                            <IoIosSave />
                            &nbsp;
                            등록
                        </button>
                        <button className='btn btn-danger'
                                    onClick={e=>cancelInput()}>
                            <GiCancel />
                            &nbsp;
                            취소
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pocketmon;