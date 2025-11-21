import { useActionState } from "react";
import { Navigate } from "react-router"

export default function UserRegister() {

    function useRegisterAction(prevState, formData) {
        const data = Object.fromEntries(formData);
        if (!data.email || !data.password) {
            return { ...prevState, email: data.email, error: 'All fields are required' }
        }

        if (data.password !== data.rePassword) {
            return {
                ...prevState,
                email: data.email,
                error: 'Password mismatch'
            }
        }

        return {
            ...data,
            error: null,
            redirectTo: '/'
        }
    }


    const [state, submitAction, isPending] = useActionState(useRegisterAction, {
        email: '',
        password: '',
        rePassword: '',
        error: null,
        redirectTo: null
    });

    if (state.redirectTo) {
        return <Navigate to={state.redirectTo} replace />
    }


    return (
        <section id="register-page" className="content auth">
            {/* <!-- Register Page ( Only for Guest users ) --> */}

            <form action={submitAction} id="register">
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    {state.error && <div className="errpr-banner">
                        Error:{state.error}
                    </div>}

                    <label htmlFor="email">Email:</label>
                    <input key={state.error ? 'with-error' : 'clean'} type="email" id="email" name="email" defaultValue={state.email} placeholder="Your Email" />

                    <label htmlFor="register-password">Password:</label>
                    <input type="password" name="password" id="register-password" placeholder="Password" />

                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" name="rePassword" id="confirm-password" placeholder="Repeat Password" />

                    <input className="btn submit" disabled={isPending} type="submit" value={isPending ? "Registering" : "Register"} />


                </div>
            </form>
        </section>
    );
};