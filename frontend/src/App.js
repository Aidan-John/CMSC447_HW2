import React, {useState, useEffect} from "react";



function AddUser(){
  return (
    <div className='Create-User'>
      <form>
        <label>User ID<input type='text'/></label>
        <label>First Name<input type='text'/></label>
        <label>Last Name<input type='text'/></label>
        <label>Points<input type='text'/></label>
      </form>
    </div>
  );
}

function SearchUser(){
  return(
    <div className="Search-User">
      <form>
        <label>First Name<input type='text' /></label>
        <label>Last Name<input type='text' /></label>
      </form>
    </div>
  )
}





function InteractionMenu(){
  const [menuOption, setMenuOption] = useState(0);

  function Dropdown(){
    return(
      <div class="dropdown">
        <button class="dropbtn">Options</button>
        <div class="dropdown-content">
          <a onClick={ setMenuOption(1) }> Add User</a>
          <a onClick={ setMenuOption(2) }> Search User</a>
        </div>
      </div>
    )
  }

  if (menuOption === 0){
    return(
      <div className="Menu">
        <Dropdown />
      </div>
    )
  }
  if (menuOption === 1){
    return (
      <div className="Menu">
        <Dropdown />
        <AddUser />
      </div>
    )
  }else if (menuOption === 2){
    return (
      <div className="Menu">
        <Dropdown />
        <SearchUser />
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
    <div className="UserTable">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
          {userData.map((val,key) => {
            return(
              <tr key={key}>
                <td>{val.user_id}</td>
                <td>{val.name_first} {val.name_last}</td>
                <td>{val.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

function App(){
  return (
    <div className="App">  
      <UserTable />
      <InteractionMenu />
    </div>
  )
}

export default App;
