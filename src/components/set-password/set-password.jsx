import React, {useState} from "react";
import eye from '../../eye.svg'
import {sendFetchRequest} from "../../api";

export default function SetPassword({returnedValue}) {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [confirm, setConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault()
        const data = {
            password,
            confirm_password: confirm
        }

        sendFetchRequest('/v1/auth/password-set', 'POST', data, localStorage.getItem('token'))
            .then(r => {
                console.log(r)
                if (r.error) {
                    setError(true)
                } else {
                    returnedValue(1)
                }
            })
            .catch((err) => {
                console.error(err)
                setError(true)
            })
    }

    return <form onSubmit={sendEmail} className="login__form">

        <h4 className="login__form-title">Create new Password?</h4>

        <div className="login__form-inputs">
            {error && <div className="login__form-error">Something gone wrong...</div>}
            <label className="login__form-input">
                <img src={eye} alt="" onClick={() => setShow2(prevState => !prevState)}/>
                <input value={password} onChange={e => setPassword(e.target.value)} type={show2 ? "text" : "password"}
                       placeholder="Password" className="input"/>
            </label>

            <label className="login__form-input">
                <img src={eye} alt="" onClick={() => setShow(prevState => !prevState)}/>
                <input value={confirm} onChange={e => setConfirm(e.target.value)} type={show ? "text" : "password"} placeholder="Confirm Password" className="input"/>
            </label>
        </div>

        <div className="login__form-button-wrapper">
            <button type="submit" className="login__form-button button">Reset Password</button>
            <div onClick={() => returnedValue(0)} className="login__form-button button button--transparent">Cancel</div>
        </div>

    </form>
}