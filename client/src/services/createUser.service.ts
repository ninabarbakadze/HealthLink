import iPatient from '../interfaces/patient.interface.ts';

interface iUser {
  name: string,
  age: number,
  email: string,
  password: string
}

function createUser(user:iUser) : Promise<iPatient>{
  fetch(`${process.env.REACT_APP_HOST}/patient`,{
    method: "POST",
    credentials: 'include',
    mode: 'cors',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({user})
  })
    .then( patient => {patient.json()})
    .catch(console.error)
}

export default createUser