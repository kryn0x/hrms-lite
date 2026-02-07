import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [empForm, setEmpForm] = useState({
    emp_id: "",
    name: "",
    email: "",
    department: ""
  });

  const [attForm, setAttForm] = useState({
    emp_id: "",
    date: "",
    status: ""
  });

  const API = "http://127.0.0.1:8000/api";

  const loadEmployees = () => {
    fetch(`${API}/employees/`)
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  const loadAttendance = () => {
    fetch(`${API}/attendance/`)
      .then(res => res.json())
      .then(data => setAttendance(data));
  };

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, []);

  const addEmployee = () => {
    fetch(`${API}/add_employee/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(empForm)
    })
      .then(res => res.json())
      .then(() => {
        alert("Employee added");
        loadEmployees();
      });
  };

  const markAttendance = () => {
    fetch(`${API}/add_attendance/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(attForm)
    })
      .then(res => res.json())
      .then(() => {
        alert("Attendance marked");
        loadAttendance();
      });
  };

return (
  <div className="container">
      <h2>HRMS System</h2>

      <h3>Add Employee</h3>
      <input placeholder="ID" onChange={e=>setEmpForm({...empForm,emp_id:e.target.value})}/><br/>
      <input placeholder="Name" onChange={e=>setEmpForm({...empForm,name:e.target.value})}/><br/>
      <input placeholder="Email" onChange={e=>setEmpForm({...empForm,email:e.target.value})}/><br/>
      <input placeholder="Department" onChange={e=>setEmpForm({...empForm,department:e.target.value})}/><br/><br/>
      <button onClick={addEmployee}>Add Employee</button>

      <hr/>

      <h3>Mark Attendance</h3>
      <input placeholder="Employee ID (database id)" onChange={e=>setAttForm({...attForm,emp_id:e.target.value})}/><br/>
      <input type="date" onChange={e=>setAttForm({...attForm,date:e.target.value})}/><br/>
      <input placeholder="Status (Present/Absent)" onChange={e=>setAttForm({...attForm,status:e.target.value})}/><br/><br/>
      <button onClick={markAttendance}>Mark Attendance</button>

      <hr/>

      <h3>Employee List</h3>
      {employees.map(emp=>(
        <div className="card" key={emp.id}>
          {emp.name} ({emp.department}) - {emp.email}
        </div>
      ))}

      <hr/>

      <h3>Attendance List</h3>
      {attendance.map((a,i)=>(
        <div className="card" key={i}>
          {a.name} - {a.date} - {a.status}
        </div>
      ))}
    </div>
  );
}

export default App;
