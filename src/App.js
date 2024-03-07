import logo from './logo.svg'
import Login from "./components/login/login";
import {useState} from "react";
import ForgetPass from "./components/forget-pass/forget-pass";
import SetPassword from "./components/set-password/set-password";

function App() {

    const [page, setPage] = useState(0)

    return (
        <div className="login">
            <img className="login__logo" src={logo} alt=""/>
            {page === 0 && <Login returnedValue={(val) => setPage(val)}/>}
            {page === 1 && <div>You are in system!</div>}
            {page === 2 && <ForgetPass returnedValue={(val) => setPage(val)} /> }
            {page === 3 && <SetPassword returnedValue={(val) => setPage(val)} /> }
        </div>
    );
}

export default App;
