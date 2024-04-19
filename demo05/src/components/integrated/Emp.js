import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { Modal } from 'bootstrap';

//function Emp() {}
const Emp = () => {
    //state
    const [emps, setEmps] = useState([]);
    const [input, setInput] = useState({
        empName: "",
        empDept: "",
        empDate: "",
        empSal: ""
    });

    //effect
    useEffect(() => {
        loadData();
    }, []);

    //callback
    const changeInput = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,
            [name]: value
        });
    }, [input]);

    const saveInput = useCallback(() => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "post",
            data: input
        })
            .then(resp => {
                loadData();

                setInput({
                    empName: "",
                    empDept: "",
                    empDate: "",
                    empSal: ""
                });
                closeModal();
            });
    }, [input]);

    const cancelInput = useCallback(() => {
        const choice = window.confirm("정말 취소하시겠습니까?");
        if (choice === false) return;

        setInput({
            empName: "",
            empDept: "",
            empDate: "",
            empSal: ""
        })

        closeModal();
    }, [input])

    //목록 불러오기
    const loadData = useCallback(() => {
        axios({
            url: "http://localhost:8080/emp/",
            method: "get"
        })
            .then(resp => {
                setEmps(resp.data);
            });
    }, [emps]);

    //항목 삭제
    const deleteEmp = useCallback((target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        axios({
            url: "http://localhost:8080/emp/" + target.empNo,
            //url:"http//localhost:8080/emp/${target.empNo}",
            method: "delete"
        })
            .then(resp => {
                loadData();
            });
    }, [emps]);

    //ref(참조)
    //- 리액트에서 태그를 선택하는 대신 사용하는 도구(그 외의 용도도 가능)
    //- 변수명.current 를 이용하여 현재 참조하고 있는 대상 태그를 호출할 수 있음
    const bsModal = useRef();//리모컨
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    return (
        <>
            <Jumbotron title="사원 관리" />

            {/* 신규등록버튼(모달띄우기) */}
            <div className='row mt-4'>
                <div className='col text-end'>
                    <button className='btn btn-primary'
                        onClick={e => openModal()}>
                        <FaPlus />
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
                                <th>부서</th>
                                <th>입사일</th>
                                <th>급여</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {emps.map(emp => (
                                <tr key={emp.empNo}>
                                    <td>{emp.empNo}</td>
                                    <td>{emp.empName}</td>
                                    <td>{emp.empDept}</td>
                                    <td>{emp.empDate}</td>
                                    <td>{emp.empSal}</td>
                                    <td>
                                        <button className='btn btn-danger'
                                            onClick={e => deleteEmp(emp)}>
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">신규 사원 등록</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={e => cancelInput()}></button>
                        </div>
                        <div className="modal-body">

                            {/* 등록 화면 */}

                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>이름</label>
                                    <input type="text" name="empName"
                                        value={input.empName}
                                        onChange={e => changeInput(e)}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>부서</label>
                                    <input type="text" name="empDept"
                                        value={input.empDept}
                                        onChange={e => changeInput(e)}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>입사일</label>
                                    <input type="text" name="empDate"
                                        value={input.empDate}
                                        onChange={e => changeInput(e)}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>급여</label>
                                    <input type="text" name="empSal"
                                        value={input.empSal}
                                        onChange={e => changeInput(e)}
                                        className='form-control' />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success me-2'
                                onClick={e => saveInput()}>
                                <IoIosSave />
                                &nbsp;
                                등록
                            </button>
                            <button className='btn btn-danger'
                                onClick={e => cancelInput()}>
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

export default Emp;