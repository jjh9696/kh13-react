import Jumbotron from "./Jumbotron";
import { useState } from 'react';


function Ex03() {
    //state
    const [items, setItems] = useState([
        {itemNo:1, itemName:"참이슬", itemPrice:1200},
        {itemNo:2, itemName:"처음처럼", itemPrice:1500},
        {itemNo:3, itemName:"새로", itemPrice:1700},
        {itemNo:4, itemName:"좋은데이", itemPrice:1000},
        {itemNo:5, itemName:"청하", itemPrice:2200}
    ]);

    //전체 삭제란 비어있는 배열로 state를 덮어쓰기 한다는 것을 의미한다
    //(중요) React는 절대로 state를 고치면 안된다(새로 만들어 덮어쓰기 해야함)

    //function clearItems(e){}
    const clearItems = (e)=> {
        setItems([]);
    }; //e를 만들어서 보관

    const deleteItem = (targer)=> {
        //items에서 item이 아닌 항목만 검색해서 재설정한다 (삭제효과)
        // const searchitems = item.filter(function(item){
        //     return item.itemNo !== targer.itemNo;
        // });
        const searchItems = items.filter((item)=>item.No !== EventTarget.itemNo);

        setItems(searchItems);//검색 결과로 state를 덮어쓰기
    }

    return (
        <> 
            <Jumbotron title="아이템 출력 예제"/>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-danger" onClick={clearItems}>전체삭제</button>
                    {/* 같은 코드 */}
                    {/* <button className="btn btn-danger" onClick={e=>clearItems(e)}>전체삭제</button> */}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-bordered table-hover">
                        <thead className="text-center">
                            <tr>
                                <th>상품번호</th>
                                <th>상품이름</th>
                                <th>판매가격</th>
                                <th>메뉴</th>
                                
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {items.map((item,index)=>(
                                <tr key={item.itemNo}>
                                    <td>{item.itemNo}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemPrice}원</td>
                                    <td> 
                                     <button className="btn btn-danger" onClick={deleteItem}>-</button>
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

export default Ex03;