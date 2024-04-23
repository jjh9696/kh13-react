import { FaMinus } from "react-icons/fa";
import { countState } from "../utils/RecoilData";
import { useRecoilState } from "recoil";

const CountMinus = ()=>{
    const [count, setCount] = useRecoilState(countState);//Recoil에서 불러와서 사용

    return(
        <>
            <h1>CountMinus.js</h1>
            <button className="btn btn-lgn btn-primary"
                    onClick={e=>setCount(count-1)}>
                <FaMinus />
            </button>
        </>
    )
}

export default CountMinus;