import Jumbotron from "./Jumbotron";
import { useState } from 'react';


function Ex01() {
    //state
    const [students, setStudents] = useState([
        {studentNo:1, studentName:"방정은장도", studentScore:70},
        {studentNo:2, studentName:"이예나선정이딸이에요림", studentScore:55},
        {studentNo:3, studentName:"권동서남북영", studentScore:83},
        {studentNo:4, studentName:"권유난떨지마정말", studentScore:94},
        {studentNo:5, studentName:"형소연구원", studentScore:67},
        {studentNo:6, studentName:"신형우♥남강현", studentScore:32}
    ]);

    return (
        <> 
            <Jumbotron title="예제1번" content="첫번째 예제"/>

                {/* <c:forEach var="student" items="${students">
                    <div>
                        <span>{student.studentNo}</span>
                        <span>{student.studentName}</span>
                        <span>{student.studentScore}</span>
                    </div>
                </c:forEach> */}
            {/* ES6에서 배열을 변환할 때는 map 함수를 사용한다 */}
            {students.map((student,index)=>(
                <div key={student.studentNo}> {/* key 속성 추가 */}
                    <span>{student.studentNo}.</span>&nbsp;
                    <span>{student.studentName}</span>&nbsp;
                    <span>-&nbsp;{student.studentScore}점</span>
                </div>
            ))}

        </>
    )
}

export default Ex01;