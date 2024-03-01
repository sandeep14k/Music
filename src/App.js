import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Paper,
   Grid,
   TextField
} from "@mui/material";
const batch = [
  'Y8',
  'Y9',
  'Y10',
  'Y11',
  'Y12',
  'Y13',
  'Y14',
  'Y15',
  'Y16',
  'Y17',
  'Y18',
  'Y19',
  'Y20',
  'Y21',
  'Y22',
  'Y23',
  'Other'
];
const Hall=[
  'HALL1',
  'HALL2',
  'HALL3',
  'HALL4',
  'HALL5',
  'HALL6',
  'HALL7',
  'HALL8',
  'HALL9',
  'HALL10',
  'HALL11',
  'HALL12',
  'HALL13',
  'HALL14',
  'ACES',
  'CPWD',
  'DAY',
  'GH',
  'NRA',
  'NOT AVAILABLE',
  'RA',
  'SBRA',
  'TYPE 1',
  'TYPE 1B',
  'TYPE 5',
  'UNKN'
];
const Gender=[
  'Any',
  'Male',
  'Female'
];
const Programme=[
  'BS',
  'BS-MBA',
  'BS-MS',
  'BS-MT',
  'BTech',
  'BT-M.Des',
  'BT-MBA',
  'BT-MS',
  'DIIT',
  'Exchng Prog.',
  'MBA',
  'MDes',
  'MS-Research',
  'MSc(2 yr)',
  'MSc(Int)',
  'MSc-PhD(Dual)',
  'MT(Dual)',
  'MTech',
  'MTech-PhD',
  'PGPEX-VLM',
  'PhD',
  'SURGE',
  'Prep.',
  'eMasters'
];
const Department=[
  "Aerospace Engineering",
  "Biological Sciences and Bioengineering",
  'Chemical Engineering',
  'Chemistry',
  'Civil Engineering',
  'Cognitive Science',
  'Computer Science and Engineering',
  'Dean Of Academic Affairs',
  'Dean Of Research & Development',
  'Dean Of Resource & Alumni',
  'Design',
  'Earth Science',
  'Economics',
  'Electrical Engineering',
  'Environmental Engineering and Management',
  'Humanities and Social Sciences',
  'Industrial and Management Engineering',
  'Laser Technology',
  'Materials Science Programme',
  'Materials Science and Engineering',
  'Mathematics',
  'Mathematics and Scientific Computing',
  'Mathematics and Statistics',
  'Mechanical Engineering',
  'Nuclear Engineering and Technology Programme',
  'Photonics Science and Engineering',
  'Physics',
  'Space Science and Astronomy',
  'Statistics',
  'Statistics and Data Science',
  'Sustainable Energy Engineering'
];
const Bloodgroup=[
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-'
];
const Wing=[
  'A-1',
  'A-2',
  'A-3',
  'A-4',
  'A-5',
  'A-6',
  'B-1',
  'B-2',
  'B-3',
  'B-4',
  'B-5',
  'B-6',
  'C-1',
  'C-2',
  'C-3',
  'C-4',
  'C-5',
  'C-6',
  'D-1',
  'D-2',
  'D-3',
  'D-4',
  'D-5',
  'D-6',
  'E-1',
  'E-2',
  'E-3',
  'E-4',
  'E-5',
  'E-6',
  'F-1',
  'F-2',
  'F-3',
  'F-4',
  'F-5',
  'F-6'

];
export default function App() {
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [selectedHall, setSelectedHall] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedProgramme, setSelectedProgramme] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedBloodgroup, setSelectedBloodgroup] = useState([]);
  const [selectedWing, setSelectedWing] = useState([]);
  const [SearchNameRoll, setSearchNameRoll]=useState();
  const [SearchHome, setSearchHome]=useState();
  const [accessToken, setAccessToken] = useState('');
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/data-yubip/auth/providers/api-key/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: "XvhvZNBWObiDyf651zDE8LsSx59zssBKVMlTHSftn566l7rXoVrbQxnW0L2p6L5A"
          })
        });

        const data = await response.json();
        const accessToken = data.access_token;
        setAccessToken(accessToken);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []); 
  useEffect(() => {
    const apiUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/data-yubip/endpoint/data/v1/action/find';
    const requestData = {
      dataSource: 'Cluster0',
      database: 'student_data',
      collection: 'student_data',
      filter: {},
      limit: 3e4
    };

    // Authorization token
    const authToken = accessToken;

    // Fetch data from  API endpoint using POST method
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => setJsonData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [accessToken]);
  function handleSearchInputChange(event) {
    setSearchNameRoll(event.target.value);
  }
  function handleHomeInputChange(event) {
    setSearchHome(event.target.value);
  }
  useEffect(() => {
    // Check if jsonData is defined before filtering
    if (jsonData && jsonData.documents) {
        const filtered = jsonData.documents.filter(item =>
          item.a.toLowerCase().includes(SearchHome)&&
        (selectedBloodgroup.length === 0 || selectedBloodgroup.includes(item.b)) &&
        (selectedDepartment.length === 0 || selectedDepartment.includes(item.d)) &&
        (selectedHall.length === 0 || selectedHall.includes(item.h)) &&
        (selectedGender.length === 0 || selectedGender.includes(item.g)) &&
        (selectedProgramme.length === 0 || selectedProgramme.includes(item.p)) &&
        (selectedWing.length === 0 || item.r.includes(selectedWing)) &&
        (selectedBatch.length === 0 || selectedBatch.includes(item.i.substring(0,2)))&&
        (!SearchNameRoll || item.n.toLowerCase().includes(SearchNameRoll))
 
      );
      setFilteredData(filtered);
    }
  }, [SearchNameRoll, selectedBloodgroup, selectedDepartment,selectedHall,selectedGender,selectedProgramme,selectedWing,selectedBatch,SearchHome, jsonData]);
  return (
    <>
    <div className="search">
    <FormControl sx={{ m: 2, minWidth:200,maxWidth:300,
          flexDirection: "column"}} variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Batch</InputLabel>
      <Select
      labelId="demo-customized-select-label"
      id="demo-customized-select"
        multiple
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {batch.map((batch) => (
          <MenuItem key={batch} value={batch}>
            {batch}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"}} variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Gender</InputLabel>
      <Select
        multiple
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Gender.map((Gender) => (
          <MenuItem key={Gender} value={Gender}>
            {Gender}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"}}  variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Hall</InputLabel>
      <Select
        multiple
        value={selectedHall}
        onChange={(e) => setSelectedHall(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Hall.map((Hall) => (
          <MenuItem key={Hall} value={Hall}>
            {Hall}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"}}  variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Programme</InputLabel>
      <Select
        multiple
        value={selectedProgramme}
        onChange={(e) => setSelectedProgramme(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Programme.map((Programme) => (
          <MenuItem key={Programme} value={Programme}>
            {Programme}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"}} variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Department</InputLabel>
      <Select
        multiple
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Department.map((Department) => (
          <MenuItem key={Department} value={Department}>
            {Department}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"}}  variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Blood group</InputLabel>
      <Select
        multiple
        value={selectedBloodgroup}
        onChange={(e) => setSelectedBloodgroup(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Bloodgroup.map((Bloodgroup) => (
          <MenuItem key={Bloodgroup} value={Bloodgroup}>
            {Bloodgroup}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth:200 ,
           maxWidth:300,
          //  display: "flex",
          flexDirection: "column"
        }}  variant="standard">
      <InputLabel id="demo-customized-select-label" sx={{marginLeft:1}}>Wing</InputLabel>
      <Select
        multiple
        value={selectedWing}
        onChange={(e) => setSelectedWing(e.target.value)}
        input={<OutlinedInput label="Multiple Select" />}
      >
        {Wing.map((Wing) => (
          <MenuItem key={Wing} value={Wing}>
            {Wing}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField id="outlined-basic" 
           onChange={handleHomeInputChange}
           label="Hometown" 
           variant="outlined" 
           sx={{ m: 2, minWidth:200 ,
           maxWidth:300,
          flexDirection: "column"
        }}/>
    <TextField onChange={handleSearchInputChange}
           id="outlined-basic" 
           label="Enter name, username or roll no" 
           variant="outlined" 
           sx={{ m: 2, minWidth:200 ,
           display: "flex",
          flexDirection: "column"
          
        }}/>
            </div>
            <div className="result">
            <h2>Conditional Search Results</h2>
      <ul>
        {filteredData.map(item => (
          <li key={item._id}>
            <img src={`https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${item.i}_0.jpg`} alt={item.n} />
            <p>Name: {item.n}</p>
            <p>Location: {item.a}</p>
            <p>Blood Type: {item.b}</p>
            <p>Gender: {item.g}</p>
             <p>Roll no :{item.r}</p>
          </li>
        ))}
      </ul>
            </div>
            </>
  );
}
