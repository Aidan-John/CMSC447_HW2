import React, {useState, useEffect} from "react";

import {Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu} from '@mui/material'

import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"



function ActionMenu(){
  const [option, setOption] = useState(0);


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
    const [user, setUser] = useState({})

    const handleSubmit = (e) => {
      e.preventDefault()
      if (id){
        console.log(id)
      }
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

          <Button sx={{maxWidth: '50%'}} variant="contained" color="warning" endIcon={<DeleteIcon />} type="submit">Delete</Button>
        </Stack>
      </Box>
      
    )


  };
  
  function SearchUser(){
  
    const [id, setID] = useState(0)
    const [user, setUser] = useState({})


    const handleSubmit = (e) => {
      e.preventDefault()
      if (id){
        console.log(id)
      }
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

          <Button sx={{maxWidth: '50%'}} variant="contained" endIcon={<SearchIcon />} type="submit">Search</Button>
        </Stack>
        
      </Box>
      
    )


  };

  function AddUser(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setID] = useState(0)
    const [points, setPoints] = useState(0)

    const handleSubmit = (e) => {
      e.preventDefault()
      if (firstName){
        console.log(firstName)
      }
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
          <Button sx={{maxWidth: '50%'}} variant="contained" endIcon={<AddIcon />} type="submit">Create</Button>


            


          
          
        </Stack>
        
      </Box>
      
    )


  };

  function PointsUser(){
  
    const [id, setID] = useState(0)
    const [points, setPoints] = useState(0)


    const handleSubmit = (e) => {
      e.preventDefault()
      if (id){
        console.log(id)
      }
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

          <Button sx={{maxWidth: '50%'}} variant="contained" endIcon={<SearchIcon />} type="submit">Get Points</Button>
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



function UserTable() {
  const [userData, setUserData] = useState([{}])
  useEffect(() => {
    fetch("http://localhost:5000/api/users").then(res => res.json()).then(
      users => {
        setUserData(users)
      }
    )
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="userTable">
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



function App(){
  return (
    <div className="App">  
      <UserTable />
      <ActionMenu />
    </div>
  )
}

export default App;
