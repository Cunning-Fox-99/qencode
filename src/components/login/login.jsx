import React, {useState} from "react";
import './login.scss'
import google from '../../google.svg'
import git from '../../git.svg'
import eye from '../../eye.svg'
import {sendFetchRequest} from "../../api";

export default function Login({returnedValue}) {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault()
        const data = {
            email,
            password
        }

        sendFetchRequest('/v1/auth/login', 'POST', data)
            .then(r => {
                console.log(r)
                if (r.error) {
                    setError(true)
                } else {
                    localStorage.setItem('token', r.access_token)
                    returnedValue(1)
                }
            })
            .catch((err) => {
                console.error(err)
                setError(true)
            })
    }

    return <form onSubmit={sendEmail} className="login__form">

        <h4 className="login__form-title">Log in to your account</h4>

        <div className="login__form-top">
            <div className="login__form-social">
                <img src={google} alt=""/> Google
            </div>
            <div className="login__form-social">
                <img src={git} alt=""/> GitHub
            </div>
        </div>

        <div className="login__form-seperator">
            OR
        </div>

        <div className="login__form-inputs">
            {error && <div className="login__form-error">Something gone wrong...</div>}
            <label className="login__form-input">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="input"/>
            </label>

            <label className="login__form-input">
                <img src={eye} alt="" onClick={() => setShow(prevState => !prevState)}/>
                <input value={password} onChange={e => setPassword(e.target.value)} type={show ? "text" : "password"} placeholder="Password" className="input"/>
            </label>
        </div>

        <div className="login__form-bottom">
            <div className="login__forget-password" onClick={() => returnedValue(2)}>Forgot your password?</div>
        </div>

        <div className="login__form-button-wrapper">
            <button type="submit" className="login__form-button button">Log in to Qencode</button>
        </div>

        <div className="login__form-sign-up">Is your company new to Qencode? <span>Sign up</span></div>
    </form>
}