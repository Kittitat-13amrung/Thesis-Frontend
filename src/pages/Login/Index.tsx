import { AuthContext } from '@/App';
import IconWithText from '@/components/Utils/IconWithText'
import { InlineIcon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

type FormDataType = {
    email: string;
    password: string;
}

const Index: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [formData, setFormData] = React.useState<FormDataType>({
        email: state?.user?.email || '',
        password: state?.user?.password || ''
    });

    const { setIsLoggedIn } = React.useContext(AuthContext);

    const [error, setError] = React.useState<string | null>('');

    React.useEffect(() => {
        // if user is already logged in, redirect to home page
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const handleLoginFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            if(!res.data.token) return setError(res.data.message);
            localStorage.setItem('token', JSON.stringify(res.data.token));
            setIsLoggedIn(true);
            navigate('/');
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    }

    const handleRegisterButtonClick = () => {
        navigate('/register');
    }

    return (
        <main className="grid place-content-center place-items-center w-screen h-screen bg-[url('https://thesisbackendstorage.blob.core.windows.net/thesisbackendcontainer/assets/homepage_hero.png')] bg-cover">
            <article className='container mx-auto grid grid-cols-2 rounded-3xl bg-opacity-70 bg-neutral-300 drop-shadow-sm'>
                {/* Login Form Part */}
                <section className='w-[500px] h-[600px] p-10 space-y-16'>
                    {/* Login Title */}
                    <div className="flex gap-2 items-center">
                        <InlineIcon icon='basil:login-solid' className='w-16 h-16 not-sr-only' />
                        <h1 className='text-4xl font-bold font-sans uppercase'>Login</h1>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLoginFormSubmit} className="flex flex-col gap-10">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">
                                <IconWithText iconName='mdi:email-outline' title='Email' />
                            </label>
                            <input onChange={handleLoginFormInputChange} type="email" id="email" name="email" placeholder="Enter your email" className="p-3 rounded-md bg-neutral-100" />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">
                                <IconWithText iconName='mdi:password' title='Password' />
                            </label>
                            <input onChange={handleLoginFormInputChange} type="password" id="password" name="password" placeholder="Enter your password" className="p-3 rounded-md bg-neutral-100" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col gap-2.5">
                            <button type="submit" className="p-3 rounded-md transition-colors ease-out bg-neutral-900 text-neutral-100 hover:bg-neutral-800">Login</button>
                            {error && <p className='text-red-500 text-right'>{error}</p>}
                        </div>
                        {/* Sign up button */}
                        <div className="grid grid-col-2 place-content-end">
                            <span />
                            <button onClick={handleRegisterButtonClick} className="p-3 text-right hover:opacity-100 opacity-80 ease-in-out transition-opacity">Don't have an account?</button>
                        </div>
                    </form>
                </section>

                {/* Background Side */}
                <section className="bg-[url('https://thesisbackendstorage.blob.core.windows.net/thesisbackendcontainer/assets/login-side.jpg')] bg-cover rounded-r-3xl" />
            </article>
        </main>
    )
}

export default Index