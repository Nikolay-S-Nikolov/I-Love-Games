import { useActionState } from "react";


export default function UserLogin() {
    async function userLoginAction(prevState, formData) {
        const data = Object.fromEntries(formData);
        // console.log(data.email);
        // console.log(data.password);

        return data        
    }

    const [state, submitAction, isPending] = useActionState(userLoginAction, { email: '', password: '' })
    console.log(state);
    
    return (
        <section id="login-page">
            {/* Login Page ( Only for Guest users ) */}

            <form id="login" action={submitAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" />

                    <label htmlFor="login-pass">Password</label>
                    <input type="password" id="login-password" name="password" placeholder="Password" />
                    <input type="submit" className="btn submit" disabled={isPending} value={isPending ? "Logging in" : "Login"} />
                </div>
            </form>
        </section>
    );
};