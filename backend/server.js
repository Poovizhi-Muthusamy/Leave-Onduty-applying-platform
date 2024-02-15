const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyparser.json());
const mongoose = require('mongoose');

const db = require('./db');
db();

const User = mongoose.model('users', {
    username: String,
    password: String,
  });

  const Application = mongoose.model('applications', {
    rollno: String,
    applicationType: String,
    fromDate: String,
    toDate:String,
    reason: String,
    applicationStatus:Number,
  });
  
//node code//
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
      const user = await User.findOne({ username,password });
      if (user) {
        res.json({ status: 'success', message: 'Login successfully' });
      } else {
        res.json({ status: 'failure', message: 'Login failed' });
      }
  });

  app.post('/apply', async (req, res) => {
    const {rollno, applicationType,fromDate,toDate,reason ,applicationStatus} = req.body;
      const application = await Application.insertMany({rollno,applicationType,fromDate,toDate,reason,applicationStatus });
      if (application) {
        res.json({ status: 'success', message: 'Request submitted successfully' });
      } else {
        res.json({ status: 'failure', message: 'Request submissin Failed' });
      }
  });

  app.get('/tableData', async (req, res) => {
    try {
      let query = {};
  
      // If a filter date is provided in the query parameters, use it to filter data
      if (req.query.filter) {
        const filterDate = req.query.filter;
        query = {
          fromDate: { $lte: filterDate }, // Assuming fromDate is less than or equal to filterDate
          toDate: { $gte: filterDate },   // Assuming toDate is greater than or equal to filterDate
        };
      }
  
      const applications = await Application.find(query);
      res.json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failure', message: 'Internal server error' });
    }
  });

  app.get('/UsertableData', async (req, res) => {
    try {
      let query = {};
  
      // If a filter username is provided in the query parameters, use it to filter data
      if (req.query.username) {
        const filterUser = req.query.username;
        query = {
          rollno:  { $eq: filterUser },
        };
      }
  
      const userApplications = await Application.find(query);
      res.json(userApplications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'failure', message: 'Internal server error' });
    }
  });
  
  

/*app.post('/usertableData', async (req, res) => {
  const { username } = req.body; 
  const applications = await Application.find({username});
  res.json(applications);
});*/
// ...

app.post('/approveApplication', async (req, res) => {
  const { applicationId } = req.body;

  try {
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: applicationId},
      { $set: { applicationStatus: 1 } },
      { new: true }
    );

    if (updatedApplication) {
      res.json({ status: 'success', message: 'Application approved successfully' });
    } else {
      res.json({ status: 'failure', message: 'Application approval failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failure', message: 'Internal server error' });
  }
});

app.post('/declineApplication', async (req, res) => {
  const { applicationId } = req.body;

  try {
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: applicationId },
      { $set: { applicationStatus: 2 } },
      { new: true }
    );

    if (updatedApplication) {
      res.json({ status: 'success', message: 'Application declined successfully' });
    } else {
      res.json({ status: 'failure', message: 'Application decline failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'failure', message: 'Internal server error' });
  }
});

// ...

  app.listen(8000,()=>{console.log("Node running at 8000");})