import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";



const Book = () => {

    //state
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size, setSize] = useState(2000);//가져올 데이터 개수
    const [books, setBooks] = useState([]);//초기에는 없다고 쳐야지
    const [count, setCount] = useState(0);
    const [last, setLast] = useState(false);

    //effect
    // useEffect(()=>{},[books]);//books가 변경될 때마다 실행
    useEffect(() => {//여기(useEffect)에 async 붙이면 에러나기때문에 useLoadData 함수를 만들어서 불러오기
        loadData();
    }, []);//최초 1회만 실행

    //callback
    const loadData = useCallback(async () => {
        // const resp = await axios.get("/book/");
        const resp = await axios.get(`/book/page/${page}/size/${size}`);
        setBooks(resp.data.list);
        setCount(resp.data.count);
        setLast(resp.data.last);
    }, [books]);
    const loadMoreData = useCallback(async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const resp = await axios.get(`/book/page/${nextPage}/size/${size}`);
        //setBooks(resp.data.list);//덮어쓰기
        setBooks([...books, ...resp.data.list]);//이어붙이기 //원래있던 배열 펼치고 새로 만든 배열 펼쳐서 하나로 합쳐 덮어쓰기
        setCount(resp.data.count);
        setLast(resp.data.last);
    }, [books]);

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
                                <tr>
                                    <td>{book.bookId}</td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.bookAuthor}</td>
                                    <td>{book.bookPublicationDate}</td>
                                    <td>{book.bookPrice}</td>
                                    <td>{book.bookPublisher}</td>
                                    <td>{book.bookPageCount}</td>
                                    <td>{book.bookGenre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 더보기 버튼 */}
            <div className="row mt-2">
                <div className="col">
                    {last === false &&
                        <button className="btn btn-primary btn-lg w-100"
                            onClick={e => loadMoreData()}>
                            더보기
                        </button>
                    }
                </div>
            </div>
        </>
    );
};

export default Book;