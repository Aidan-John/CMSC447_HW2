import React, {useState, useEffect} from "react";


import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Grid from '@mui/material/Grid';
import axios from "axios"



function ActionMenu({ updateHandler, updateLogs, logArray }){
  const [option, setOption] = useState(0);
  const [buttonState, setButtonState] = useState(0);

  function getLogs(newLogs){
    let logs = logArray.map((x) => x);
    newLogs.map((log) => logs.push(log))
    
    return logs
  }

  function ButtonConstructor( {icon, submitHandler, buttonText}){
    if (buttonState === 0){
      return(
        <Button 
        sx={{maxWidth: '50%', position: "relative", bottom: "10px"}} 
        variant="contained" 
        color="primary" 
        endIcon={icon} 
        onClick={submitHandler}>{buttonText}</Button>

      )
    } else if (buttonState === 1){
      return(
        <LoadingButton 
        sx={{maxWidth: '50%', position: "relative", bottom: "10px"}}
        variant="contained" 
        color="secondary" 
        endIcon={icon} 
        ><span>Loading...</span></LoadingButton>
      )

    } else if (buttonState === 2){
      return(
        <Button
        sx={{maxWidth: '25%', position: "relative", bottom: "10px"}}
        variant="contained"
        color="success"
        >Success</Button>
      )
    } else if (buttonState === 3){

      return(
        <Button
        sx={{maxWidth: '25%', position: "relative", bottom: "10px"}}
        variant="contained"
        color="warning"
        >Failed</Button>
      )

    

  }
}

  function MenuChoices(){
    return(
      <Box className="ActionMenu" sx={{ '& > :not(style)': { m: 1 } }} textAlign="center">
        <Fab size="small" color="primary" aria-label="create" onClick={(e) => {e.preventDefault(); setOption(1);}}>
          <AddIcon />
        </Fab>
        <Fab size="small" color="info" aria-label="search" onClick={(e) => {e.preventDefault(); setOption(2);}}>
          <SearchIcon />
        </Fab>
        <Fab size="small" color="warning" aria-label="delete" onClick={(e) => {e.preventDefault(); setOption(3);}}>
          <DeleteIcon />
        </Fab>
        <Fab size="small" color="secondary" aria-label="points" onClick={(e) => {e.preventDefault(); setOption(4);}}>
          <LoyaltyIcon />
        </Fab>
      </Box>
      
    );
  }

  function DeleteUser(){
  
    const [id, setID] = useState(0)
   
    const handleSubmit = (e) => {
      e.preventDefault()
      setButtonState(1)
      
      
      axios.get("http://localhost:5000/api/users/delete/" + String(id)).then( res => res.data).then(msg => {
        setTimeout(() => {setButtonState(2)}, 1000);
        updateLogs(getLogs([msg]))        
        setTimeout(() => {setButtonState(0)}, 3000);
      }).then(() => updateHandler(true));
    }

    return(
      <Box className="ResultMenu" component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
        <Stack spacing={2} direction="column" align="center">
          <TextField
            label="User ID"
            size="small"
            onChange={(input) => setID(input.target.value)}
            fullWidth
            required
          />
          <ButtonConstructor icon={<DeleteIcon />} submitHandler={handleSubmit} buttonText="Delete" />
        </Stack>
      </Box>
      
    )
  };
  
  function SearchUser(){
  
    const [id, setID] = useState(0)
  


    const handleSubmit = (e) => {
      e.preventDefault()
      setButtonState(1)
      
      axios.get("http://localhost:5000/api/users/" + String(id)).then( res => res.data).then(msg => {
        setTimeout(() => {setButtonState(2)}, 1000);
        const multiLine = msg.split('\n')
        updateLogs(getLogs(multiLine))
              
        setTimeout(() => {setButtonState(0)}, 3000);
      });
    }

    return(
      <Box className="ResultMenu" component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column" align="center">
          <TextField
            label="User ID"
            size="small"
            onChange={(input) => setID(input.target.value)}
            fullWidth
            required
          />

          <ButtonConstructor icon={<SearchIcon />} submitHandler={handleSubmit} buttonText="Search" />
        </Stack>
        
      </Box>
      
    )

  };

  function AddUser(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setID] = useState(0)
    const [points, setPoints] = useState(0)

    const newUser = {"name_first": firstName, "name_last": lastName, "user_id": id, "points": points};

    const handleSubmit = (e) => {
         
      e.preventDefault();
      setButtonState(1);
      
      axios.post("http://localhost:5000/api/users/add", newUser).then( res => { 
        const ret = res.data
        setTimeout(() => {setButtonState(2)}, 1000);
        updateLogs(getLogs([ret]));
        updateHandler(true);
        setTimeout(() => {setButtonState(0)}, 3000);

      });
    }

    return(
      <Box className="ResultMenu" component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
        <Stack spacing={2} direction="column" align="center">
          <TextField
            label="User ID"
            size="small"
            onChange={(input) => setID(input.target.value)}
            fullWidth
            required
          />
          <TextField
            label="First Name"
            size="small"
            onChange={(input) => setFirstName(input.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            size="small"
            onChange={(input) => setLastName(input.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Points"
            size="small"
            onChange={(input) => setPoints(input.target.value)}
            fullWidth
            required
          />
          <ButtonConstructor icon={<AddIcon />} submitHandler={handleSubmit} buttonText="Create" />

        </Stack>
        
      </Box>
      
    )


  };

  function PointsUser(){
    const regex = /([a-z .'-]+), ([a-z .'-]+)/i
  
    const [name, setName] = useState('')


    const handleSubmit = (e) => {
         
      e.preventDefault();
      setButtonState(1);
      let result = name.match(regex)
      let ret = {}
      ret['last'] = result[1]
      ret['first'] = result[2]

      
      axios.post("http://localhost:5000/api/points", ret).then( res => { 
        const ret = res.data
        setTimeout(() => {setButtonState(2)}, 1000);
        updateLogs(getLogs([ret]));
        updateHandler(true);
        setTimeout(() => {setButtonState(0)}, 3000);

      });
    }

    return(
      <Box className="ResultMenu" component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column" align="center">
          <TextField
            label="lastName, firstName"
            size="small"
            onChange={(input) => setName(input.target.value)}
            fullWidth
            required
          />
          

          <ButtonConstructor icon={<LoyaltyIcon />} submitHandler={handleSubmit} buttonText="Get Points" />
        </Stack>
        
      </Box>
      
    )


  };

 

  if (option === 1){
    return (
      <div>
        <MenuChoices />
        <AddUser />
       
      </div>
    )
  } else if (option === 2){
    return (
      <div>
        <MenuChoices />
        <SearchUser />
      </div>
    )
  } else if (option === 3){
    return (
      <div>
        <MenuChoices />
        <DeleteUser />
      </div>
    )
  } else if (option === 4){
    return (
      <div>
        <MenuChoices />
        <PointsUser />
      </div>
    )
  } else {
    return (
      <div>
        <MenuChoices />
      </div>
    )
  }

}


function UserTable({ updateBool, updateHandler }) {
  const [userData, setUserData] =  useState([{}])
  useEffect(() => {
    if(updateBool === true){
      fetch("http://localhost:5000/api/users").then(res => res.json()).then(users => setUserData(users) );
      updateHandler(false);

    }
  }, [updateHandler, updateBool]);

  return (
    <TableContainer>
      <Table sx={{ width: 500, margin: "auto" }} size="small" aria-label="userTable">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((val,key) => {
            return(
              <TableRow key={key}>
                <TableCell component="th" scope="row">{val.user_id}</TableCell>
                <TableCell align="right">{val.name_first} {val.name_last}</TableCell>
                <TableCell align="right">{val.points}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ConsoleLog({ logMessages }){

  return(
    <Box sx={{ width: '100%' }}>
      <List>
        {logMessages.map((val) => {
          return(
            <ListItem disablePadding key={val}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoDevIcon />
                </ListItemIcon>
                <ListItemText primary={val} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
    

  )

}




function App(){
 
  const [updateTable, setUpdateTable] = useState(true)
  const [logs , setLogs] = useState([])

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <UserTable updateBool={updateTable} updateHandler={setUpdateTable}/>
            <ActionMenu updateHandler={setUpdateTable} updateLogs={setLogs} logArray={logs}/>

          </Grid>
          <Grid item xs={5}>
            <ConsoleLog logMessages={logs} />

          </Grid>
        </Grid>

      </Box>
      
    </div>
  )
}

export default App;
