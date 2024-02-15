import React, { useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';
import { useNavigate } from 'react-router-dom';




function Admin(){
  const navigate = useNavigate(); 
  const [tableData, setTableData] = useState([]); 
  const [filter, setFilter] = useState([]); 
  useEffect(() => {
    fetchTableData();
  }, [filter]);

  const fetchTableData = async () => {
    try {
      let url = 'http://127.0.0.1:8000/tableData';
  
      // If a filter date is selected, append it to the URL
      if (filter) {
        url += `?filter=${filter}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };


  


const handleApprove = async (applicationId) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/approveApplication', {
      applicationId,
    });

    const { status, message } = response.data;

    if (status === 'success') {
      alert(message);
      // Refresh the table data or update the state as needed
      fetchTableData();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};


const handleLogout= async () => {
  navigate('/login', { replace: true });
}

const handleDecline = async (applicationId) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/declineApplication', {
      applicationId,
    });

    const { status, message } = response.data;

    if (status === 'success') {
      alert(message);
      // Refresh the table data or update the state as needed
      fetchTableData();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error(error);
  }
};
return(
<div>
    <div className='bghead'>
    <h2 className='head'>Leave and On-duty Applying Portal</h2><br/>
    </div>
    
    <button type="button" className='button  btn btn-danger Btn' onClick={() => handleLogout(true)} >Logout</button>
    <div>
    <h2 className='dashboard'>Welcome Admin!</h2>
    <div>
   
    <div className="col-md-2">
                    <h6 >Choose date to filter</h6>
        
                    <input type="date" className="form-control" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}  />
                  </div>
   
    </div>
   
    </div>
    
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Sno</th>
      <th scope="col">Registration number</th>
      <th scope='col'>Type</th>
      <th scope="col">From Date</th>
      <th scope="col">To Date</th>
      <th scope='col'>Reason</th>
      <th scope='col' colspan="2">Status</th>
    </tr>
  </thead>
  <tbody>
  {tableData.slice().reverse().map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{row.rollno}</td>
                    <td>{row.applicationType}</td>
                    <td>{formatDate(row.fromDate)}</td>
                    <td>{formatDate(row.toDate)}</td>
                    <td>{row.reason}</td> 
                    <td>
              {row.applicationStatus === 0 && (
                <>
                  <button type="button" className="btn btn-success" onClick={() => handleApprove(row._id)}>
                    Accept
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => handleDecline(row._id)}>
                    Decline
                  </button>
                </>
              )}
              {row.applicationStatus === 1 && <span className="text-success">Approved</span>}
              {row.applicationStatus === 2 && <span className="text-danger">Declined</span>}
            </td>
                  </tr>
                ))}
              </tbody>
</table>
    </div>

)}

export default Admin;