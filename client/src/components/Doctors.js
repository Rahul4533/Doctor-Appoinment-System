
import { useNavigate } from "react-router-dom"


export default function Doctors({doctor}) {
  const navigate=useNavigate();
  return (<>  

    <div className="card m-2 rounded-top">
        <div className="card-header" onClick={()=>navigate(`/doctor/booking/${doctor._id}`)} style={{cursor:'pointer'}} >
         <h4 className="mb-1 text-center ">  Dr.{doctor.firstname}{doctor.lastname}</h4>
        </div>
        <div className="card-body">
           <p>
            <b>Specialazition </b>
            <span style={{color:'Red'}}>{doctor.specializations}</span>
           </p>

           <p>
            <b>Experiance::</b>
            {doctor.experiance}
           </p>

           <p>
            <b>Fee::</b>
            {doctor.fees}
           </p>

           <p>
            <b>Timing:{doctor.timing[0]}-{doctor.timing[1]}</b>
           </p>

           
           


        </div>
    </div>
  
  </>
  )
}
