import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './student.css';
import './apply.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function Apply() {
  const { username } = useParams();
  
  
  const [rollno, setRollno] = useState('');
  
  const [applicationType, setApplicationType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [UsertableData, setUserTableData] = useState([]); 

  const handleLogout= async () => {
    navigate('/login', { replace: true });
  }


  useEffect(() => {
    setRollno(localStorage.getItem('username') || '');
    fetchUserTableData();
  }, [localStorage.getItem('username')]);

  const fetchUserTableData = async () => {
    try {
      let url = 'http://127.0.0.1:8000/UsertableData';
  
      // Use the username from local storage to fetch only the specific user's data
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        url += `?username=${storedUsername}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
      setUserTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  
  

  const handleApplication = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/apply', {
    rollno: rollno,
    applicationType: applicationType,
    fromDate: fromDate,
    toDate:toDate,
    reason: reason,
    applicationStatus:0,

    });
    const {status} = response.data;
    if(status==="success")
    {
      alert('Request applied successfully');
      setShowModal(false);
      fetchUserTableData();

    }
    else
    {
    alert('Application failed');
    }
  }
  return (
    <div>
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, textAlign:'center' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header headbg">
              
                <h5 className="modal-title">Apply for leave / Onduty</h5>
                <button type="button" className="close clsbtn" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body txt">
                <form onSubmit={handleApplication}>
                <div className="row g-3" style={{ width: '342px' }}>
                <label htmlFor="rollno" style={{ fontSize: '20px' }}>Registeration Number</label>
               
  <input
    type="text"
    className="form-control"
    id="rollno"
    value={localStorage.getItem('username') || ''}
    disabled
    onChange={(e) => setRollno(e.target.value)} 
  />
                  </div>
                  <div className="form-group py-4">
                    <label htmlFor="applicationType" style={{ fontSize: '20px' }}>Type of Application</label>
                    <select className="form-control" id="applicationType" style={{ width: '342px' }} value={applicationType} onChange={(e) => setApplicationType(e.target.value) } required>
                      <option value="">select </option>
                      <option value="onduty">On Duty</option>
                      <option value="leave">Leave</option>
                    </select>
                  </div>
                  <div className="row">
                  <div className="col">
                    <label htmlFor="fromDate" style={{ fontSize: '19px' }}>From Date</label>
                    <input type="date" className="form-control" id="fromDate" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                  </div>
                  
                  <div className="col">
                    <label htmlFor="toDate" style={{ fontSize: '19px' }}>To Date</label>
                    <input type="date" className="form-control" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} required/>
                  </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reason" style={{ fontSize: '19px' }}>Reason</label>
                    <input type="text" className="form-control" id="reason" placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)}
                    style={{ width: '342px' }} required/>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>
        
        </div>
      )}
    
      <div>
        <div className='bghead newbg'>
          <h2 className='head newbg'>Leave and On-duty Applying Portal</h2><br/>
        </div>
        <button type="button" className="btn btn-success BBtn " onClick={() => setShowModal(true)}>Apply new request</button> 
        <button type="button" className='button  btn btn-danger Btn' onClick={() => handleLogout()}>Logout</button>
        <div>
        <h2 className='dashboard1'>Welcome, {localStorage.getItem('username') || ''}!</h2>
          
          
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sno</th>
              <th scope="col">Application Type</th>
              <th scope="col">From Date</th>
              <th scope="col">To Date</th>
              <th scope='col'>Reason</th>
              <th scope='col'>Application Status</th>
            </tr>
          </thead>
          <tbody>
         {UsertableData.slice().reverse().map((row, index) => (

                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.applicationType}</td>
                    <td>{formatDate(row.fromDate)}</td>
                    <td>{formatDate(row.toDate)}</td>
                    <td>{row.reason}</td> 
                    <td>
                    {row.applicationStatus === 0 && <span className="text-warning">Pending</span>}
                    {row.applicationStatus === 1 && <span className="text-success">Approved</span>}
              {row.applicationStatus === 2 && <span className="text-danger">Declined</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
        </table>
      </div>
    </div>
  );
}

export default Apply;
