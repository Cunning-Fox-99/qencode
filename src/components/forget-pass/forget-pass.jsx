import React, {useState} from "react";
import {sendFetchRequest} from "../../api";

export default function ForgetPass({returnedValue}) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault()
        const data = {
            email
        }

        sendFetchRequest('/v1/auth/password-reset', 'POST', data)
            .then(r => {
                console.log(r)
                if (r.error) {
                    setError(true)
                } else {
                    returnedValue(3)
                }

            })
            .catch((err) => {
                console.error(err)

            })
    }

    return <form onSubmit={sendEmail} className="login__form">

        <h4 className="login__form-title">Forgot Password?</h4>

        <div className="login__form-inputs">
            {error && <div className="login__form-error">Something gone wrong...</div>}
            <label className="login__form-input">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="input"/>
            </label>
        </div>

        <div className="login__form-button-wrapper">
            <button type="submit" className="login__form-button button">Send</button>
            <div onClick={() => returnedValue(0)} className="login__form-button button button--transparent">Cancel</div>
        </div>

    </form>
}