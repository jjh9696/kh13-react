import { useCallback, useEffect, useState, useRef } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

const Book = () => {

    //state
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size, setSize] = useState(100);//가져올 데이터 개수
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0);
    const [last, setLast] = useState(false);

    //ref의 변형된 사용법
    //- ref는 주로 화면을 제어할 때 사용
    //- ref는 state와 다르게 블로킹(blocking)이 된다는 특징이 있어서 state 대신도 사용한다
    const loading = useRef(false);//목록을 불러오는 중이면 true, 아니면 false

    //callback
    const loadData = useCallback(async () => {
        // const resp = await axios.get("/book/");
        const resp = await axios.get(`/book/page/${page}/size/${size}`);
        setBooks([...books, ...resp.data.list]);//이어붙이기
        setCount(resp.data.count);
        setLast(resp.data.last);
    }, [books, page]);

    //effect
    //-페이지 번호가 증가하면 loadData를 부르도록 연결
    // useEffect(()=>{}, [books]);//books가 변경될 때마다 실행
    // useEffect(() => {}, []);//최초 1번 실행
    useEffect(() => {
        loading.current = true;//로딩이 시작했음을 기록
        loadData();
        loading.current = false;// 로딩이 종료했음을 기록 //flag 패턴
    }, [page]);

    //////////////////////////////////////////////////////////////////////////////////////
    // 스크롤 이벤트(Scroll Event)
    // - 최초 화면 로드 시 윈도우에 스크롤 이벤트를 설정
    // - 스크롤 이벤트는 너무 민감하기 때문에 (1회 굴리면 약 12번 실행) 억제
    // - lodash 라이브러리를 사용하여 억제
    //      - throttle : 지정한 시간 간격으로만 이벤트가 실행(250ms 마다 실행)
    //                      throttle(함수, 간격)
    //      - debounce : 지정한 시간동안 작업이 이어지지 않으면 이벤트가 발생
    //                      debounce(함수, 간격)
    //////////////////////////////////////////////////////////////////////////////////////
    const listener = useCallback(throttle((e)=>{

        //console.log("우와 스크롤이 굴러가요!!!!! 끼얏호!!!!!!!!!");
        // 문서의 전체 높이
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 현재 스크롤 위치
        const scrollTop = window.scrollY;

        // 스크롤 위치를 퍼센트로 계산
        const scrollPercent = (scrollTop / scrollableHeight) * 100;

        console.log(`
            last = ${last},
            loading = ${loading.current},
            퍼센트 = ${scrollPercent.toFixed(2)}%
        `)

        //조건
        //- 마지막 데이터가 아닐 것
        //- 스크롤이 75% 이상 내려갔을 것
        //- 목록을 불러오는 중이 아닐 것
        if(last === false && scrollPercent >= 75) {
            console.log("더보기 작업을 시작합니다");
            setPage(page+1);//페이지 1증가 --> effect 발생 --> loadData 실행
        }

        // // 결과를 콘솔에 출력
        // console.log('스크롤 퍼센트:', scrollPercent.toFixed(2) + '%');
    }, 350), [page]);

    //useEffect를 사용해서 필요한 순간에 이벤트를 설정 또는 제거
    //-loading에 저장된 값을 활용
    //-useEffect에 항목을 제거하면 화면이 갱신될 때마다 실행된다(모든 state 변화에)
    useEffect(()=>{
        if(loading.current === true) {//로딩이 진행중이면
            return;//이벤트 설정이고 뭐고 때려쳐!
        }

        //로딩중이 아니라면
        window.addEventListener("scroll", listener);//미리 준비한 이벤트 설정
        console.log("스크롤 이벤트 설정 완료");

        //화면 해제 시 진행할 작업
        return()=>{
            window.removeEventListener("scroll", listener);//이벤트 제거
            console.log("스크롤 이벤트 제거 완료");
        };
    });

    return (
        <>
            <Jumbotron title="무한 스크롤 예제(도서)" />

            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead className="text-center">
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>출판사</th>
                                <th>저자</th>
                                <th>출간일</th>
                                <th>가격</th>
                                <th>페이지수</th>
                                <th>장르</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {books.map(book => (
                                <tr key={book.bookId}>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 더보기 버튼 */}
                <div className="row mt-2">
                    <div className="col">
                        {last === false &&
                            <button className="btn btn-primary btn-lg w-100" onClick={e => setPage(page + 1)}>
                                더보기
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Book;