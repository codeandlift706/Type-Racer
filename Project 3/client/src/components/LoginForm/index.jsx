import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginForm(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: {...formState},
            });
            const token = data.login.token;
            Auth.login(token);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });



    };

    const backButtonClick = (event) => {
    };

    return (
        <div class="login-container">
            <p class="title">login</p>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label class="login-labels" htmlFor="email"><b>email address</b></label>
                    <div>
                    <input
                        placeholder="youremail@test.com"
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div>
                    <label class="login-labels" htmlFor="pwd"><b>password</b></label>
                    <div>
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={handleChange}
                    />
                    </div>
                </div>
                {error ? (
                    <div>
                        <p>The provided credentials are incorrect</p>
                    </div>
                ) : null}
                <div>
                    <button class="submit-button" type="submit">submit</button>
                </div>
            </form> 
        </div>
    );
}

export default LoginForm;
