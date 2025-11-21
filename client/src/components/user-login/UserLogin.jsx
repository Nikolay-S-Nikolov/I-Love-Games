import { useActionState } from "react";


export default function UserLogin() {
    async function userLoginAction(prevState, formData) {
        const userData = Object.fromEntries(formData);

        if (!userData.password) {
            return {
                ...prevState,
                email: userData.email,
                error: 'Password is required',
            }
        }

        return {
            ...prevState,
            email: userData.email,
            redirectTo: '/'

        }
    }

    const [state, submitAction, isPending] = useActionState(userLoginAction, {
        email: '', password: '',
        error: null,
        redirectTo: null
    });

    return (
        <section id="login-page">
            {/* Login Page ( Only for Guest users ) */}
            {state.error && <div className="errpr-banner" style={{ backgroundColor: "white", color: "red" }}>
                Error:{state.error}
            </div>}
            <form id="login" action={submitAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input key={state.error ? 'err' : 'clear'} type="email" id="email" name="email" defaultValue={state.email} placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" name="password" placeholder="Password" />
                    <input type="submit" className="btn submit" disabled={isPending} value={isPending ? "Logging in" : "Login"} />
                </div>
            </form>
        </section>
    );
};