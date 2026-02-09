import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [employees, setEmployees] = useState([]);
  const [viewName,setViewName]=useState("");
  const [history,setHistory]=useState([]);
  const [showViewDropdown, setShowViewDropdown]=useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });




  const [empForm, setEmpForm] = useState({
    emp_id: "",
    name: "",
    email: "",
    department: ""
  });

  const [attForm, setAttForm] = useState({
    emp_id: "",
    date: "",
    status: "",
    search: "",
    other_reason: ""
  });

  const API = "https://hrms-lite-2mfo.onrender.com/api";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const loadEmployees = () => {
    fetch(`${API}/employees/`)
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

const addEmployee = () => {
  // Validation checks
  if(!empForm.emp_id || !empForm.name || !empForm.email || !empForm.department) {
    showToast("Please fill all fields", "error");
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(empForm.email)) {
    showToast("Invalid email format", "error");
    return;
  }

fetch(`${API}/add_employee/`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(empForm)
})
.then(res=>res.json())
.then((data)=>{
  if(data.error) {
    showToast(data.error, "error");
  } else {
    showToast("Employee added successfully!");
    setEmpForm({emp_id:"",name:"",email:"",department:""});
    loadEmployees();
  }
})
.catch(()=>{
  showToast("Error adding employee", "error");
});

};





  const deleteEmployee = (id) => {
  fetch(`${API}/delete_employee/${id}/`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(()=>{
    showToast("Employee deleted successfully!");
    loadEmployees();
  });
};




const markAttendance = () => {
  if(!attForm.emp_id || !attForm.date || !attForm.status) {
    showToast("Please fill all fields", "error");
    return;
  }

  const payload = {
    emp_id: attForm.emp_id,
    date: attForm.date,
    status: attForm.status === "Other" ? attForm.other_reason : attForm.status
  };

  fetch(`${API}/attendance/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  .then(res=>res.json())
  .then(()=>{
    showToast("Attendance marked successfully!");
    setAttForm({emp_id:"", date:"", status:"", search:"", other_reason:""});
  })
  .catch((err)=>{
    console.error(err);
    showToast("Error marking attendance", "error");
  });
};


const th = {
  border:"1px solid #ccc",
  padding:"12px",
  textAlign:"left"
};

const td = {
  border:"1px solid #ccc",
  padding:"10px"
};



return (
  <div>
 {/* Toast Notification */}
 {toast.show && (
  <div style={{
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "15px 25px",
    background: toast.type === "error" ? "#f8d7da" : "#d4edda",
    color: toast.type === "error" ? "#721c24" : "#155724",
    borderLeft: toast.type === "error" ? "4px solid #f5c6cb" : "4px solid #28a745",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 9999,
    fontSize: "16px",
    fontWeight: "500",
    animation: "slideDown 0.3s ease-out"
  }}>
    {toast.message}
  </div>
 )}

 {/* header */}
  <div style={{
  background:"#1D546D",
  padding:"30px",
  textAlign:"center",
  color:"#F3F4F4",
  borderBottom:"4px solid #5F9598"
}}>
  <h1 style={{margin:0,fontSize:"36px",letterSpacing:"1px"}}>
    HRMS Lite
  </h1>
  <p style={{
    marginTop:"10px",
    fontSize:"16px",
    color:"#F3F4F4"
  }}>
    Human Resource Management System - Employee & Attendance Tracking
  </p>
</div>

    
    <div className="container" style={{marginTop:"20px"}}>


      <h2 id="register" style={{
        fontSize:"28px",
        color:"#1D546D",
        borderBottom:"3px solid #5F9598",
        paddingBottom:"10px",
        marginBottom:"20px"
      }}>Register Employee</h2>
      <input placeholder="ID"
      value={empForm.emp_id}
      onChange={e=>setEmpForm({...empForm,emp_id:e.target.value})}/>

      <input placeholder="Name"
      value={empForm.name}
      onChange={e=>setEmpForm({...empForm,name:e.target.value})}/>

      <input placeholder="Email"
      value={empForm.email}
      onChange={e=>setEmpForm({...empForm,email:e.target.value})}/>

      <input placeholder="Department"
      value={empForm.department}    
      onChange={e=>setEmpForm({...empForm,department:e.target.value})}/>

      <br/>
      <button onClick={addEmployee}>Add Employee</button>


      <hr/>

      <h2 id="attendance" style={{
        fontSize:"28px",
        color:"#1D546D",
        borderBottom:"3px solid #5F9598",
        paddingBottom:"10px",
        marginBottom:"20px",
        marginTop:"40px"
      }}>Attendance</h2>
      <input
      placeholder="Type employee ID or name..."
      value={attForm.search || ""}
      onChange={(e)=>{
        const value = e.target.value;
        setAttForm({...attForm, search:value});
      }}
      />
      {attForm.search && (
        <div style={{
          background:"#fff",
          border:"1px solid #ccc",
          maxHeight:"120px",
          overflowY:"auto",
          width:"260px",
          position:"absolute",
          zIndex:10
      }}>
        {employees
          .filter(emp =>
            emp.name.toLowerCase().includes(attForm.search.toLowerCase()) ||
            emp.emp_id.toLowerCase().includes(attForm.search.toLowerCase())
        )
        .map(emp=>(
          <div key={emp.id}
          style={{padding:"6px", cursor:"pointer"}}
          onClick={()=>{
            setAttForm({
              ...attForm,
              emp_id:emp.id,
              search:`${emp.emp_id} - ${emp.name}`
          });
        }}>
          {emp.emp_id} - {emp.name}
        </div>
      ))}
  </div>

)}




      <input type="date"
      value={attForm.date}
      onChange={e=>setAttForm({...attForm,date:e.target.value})}/>

      <select
      style={{width:"260px", padding:"10px", margin:"6px"}}
      value={attForm.status || "Other"}
      onChange={e=>setAttForm({...attForm,status:e.target.value})}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Other">Other</option>
      </select>

      {(attForm.status === "Other" || !attForm.status) && (
        <input
        placeholder="Enter reason..."
        style={{width:"260px"}}
        value={attForm.other_reason || ""}
        onChange={e=>setAttForm({...attForm,other_reason:e.target.value})}
        />
      )}

      <button onClick={markAttendance}>Mark Attendance</button>

      <hr/>

      <h2 id="emplist" style={{
        fontSize:"28px",
        color:"#1D546D",
        borderBottom:"3px solid #5F9598",
        paddingBottom:"10px",
        marginBottom:"20px",
        marginTop:"40px"
      }}>Employee List</h2>

      <table style={{width:"100%", borderCollapse:"collapse", marginTop:"15px"}}>
      <thead>
      <tr style={{background:"#f2f2f2"}}>
        <th style={th}>EmployeeID</th>
        <th style={th}>Name</th>
        <th style={th}>Dept</th>
        <th style={th}>Email</th>
        <th style={th}>Action</th>
      </tr>
      </thead>

      <tbody>
      {employees.map(emp=>( 
      <tr key={emp.id}>
        <td style={td}>{emp.emp_id}</td>
        <td style={td}>{emp.name}</td>
        <td style={td}>{emp.department}</td>
        <td style={td}>{emp.email}</td>

        <td style={td}>
          <button
          onClick={()=>deleteEmployee(emp.id)}
          style={{
            background:"#e74c3c",
            color:"white",
            border:"none",
            padding:"6px 14px",
            borderRadius:"6px",
            cursor:"pointer"
          }}>
          Delete
          </button>
        </td>
      </tr>
      ))}
      </tbody>
      </table>

      <br/>
      


    <hr/>

<h2 style={{
  fontSize:"28px",
  color:"#1D546D",
  borderBottom:"3px solid #5F9598",
  paddingBottom:"10px",
  marginBottom:"20px",
  marginTop:"40px"
}}>View Attendance History</h2>

<div style={{position:"relative"}}>
<input
placeholder="Type employee ID or name..."
value={viewName || ""}
onChange={(e)=>{
  const value = e.target.value;
  setViewName(value);
  setShowViewDropdown(true);
  
  // Clear history when input changes
  if(!value) {
    setHistory([]);
    setShowViewDropdown(false);
  }
}}
onFocus={()=>setShowViewDropdown(true)}
style={{
width:"80%",
padding:"12px",
marginTop:"10px"
}}
/>

{viewName && showViewDropdown && employees.filter(emp=>
  emp.name.toLowerCase().includes(viewName.toLowerCase()) ||
  emp.emp_id.toLowerCase().includes(viewName.toLowerCase())
).length > 0 && (
<div style={{
background:"#fff",
border:"1px solid #ccc",
width:"80%",
maxHeight:"150px",
overflowY:"auto",
position:"absolute",
zIndex:10,
boxShadow:"0 2px 8px rgba(0,0,0,0.15)"
}}>
{employees
.filter(emp=>
  emp.name.toLowerCase().includes(viewName.toLowerCase()) ||
  emp.emp_id.toLowerCase().includes(viewName.toLowerCase())
)
.map(emp=>(
<div key={emp.id}
style={{
  padding:"10px",
  cursor:"pointer",
  borderBottom:"1px solid #eee",
  background:"white"
}}
onMouseEnter={(e)=>e.currentTarget.style.background="#f5f5f5"}
onMouseLeave={(e)=>e.currentTarget.style.background="white"}
onClick={()=>{
  setViewName(`${emp.emp_id} - ${emp.name}`);
  setShowViewDropdown(false);

  fetch(`${API}/attendance/${emp.id}`)
  .then(res=>res.json())
  .then(data=>{
    setHistory(data);
    console.log("Attendance data:", data);
  })
  .catch(err=>{
    console.error("Error fetching attendance:", err);
    alert("Error loading attendance history");
  });
}}>
{emp.emp_id} - {emp.name}
</div>
))}
</div>
)}
</div>

{history.length > 0 && (
<table style={{width:"80%",marginTop:"20px",borderCollapse:"collapse"}}>
<thead>
<tr style={{background:"#eee"}}>
<th style={th}>Date</th>
<th style={th}>Status</th>
</tr>
</thead>

<tbody>
{history.map((h,i)=>(
<tr key={i}>
<td style={td}>{h.date}</td>
<td style={td}>
<span style={{
padding:"6px 12px",
borderRadius:"6px",
color:"white",
background:
h.status==="Present" ? "green" :
h.status==="Absent" ? "red" : "#444"
}}>
{h.status}
</span>
</td>
</tr>
))}
</tbody>
</table>
)}

{viewName && history.length === 0 && !showViewDropdown && (
<p style={{marginTop:"15px", color:"#666"}}>No attendance records found for this employee.</p>
)}



    </div>
  </div>
  );
}

export default App;
