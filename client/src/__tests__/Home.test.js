import  Home  from '../components/Home.jsx';
import { render } from '@testing-library/react';
// import {useUser} from '../context/UserContext';

// const mockUser = {
//   id:'string',
//   isdoctor:false,
//   name:'string',
//   age:10,
//   email:'string',
//   username:'string',
//   password:'string',
//   stripeid:'string',
//   peerid: 'string'
// }

//test if it loads
describe('home component', () => {
  test('should match the snapshot', () => {
    //  const { setUser } = useUser();
    //  setUser(mockUser);
     const { container } = render(
         <Home authorization={true} />
     );
     expect(container.firstChild).toMatchSnapshot();
   })
});


//test for visualize and create
//test logout
