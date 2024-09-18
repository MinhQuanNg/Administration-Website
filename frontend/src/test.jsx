
import { useDispatch } from 'react-redux'
import { registerUser } from './app/features/auth/authActions';


export const Test = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        let data = {id: '2', username: 'conan', password: 'ran', admin: true};
        console.log(data);
        dispatch(registerUser(data))
    }

    return <button onClick={handleClick}>Test</button>
}