import { AuthContext } from '@/App';
import IconWithText from '@/components/Utils/IconWithText'
import { InlineIcon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router-dom';

type FormDataType = {
    displayName: string;
    email: string;
    password: string;
}

const Index: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<FormDataType>({
        displayName: '',
        email: '',
        password: ''
    });

    const { isLoggedIn } = React.useContext(AuthContext);

    const [error, setError] = React.useState<string | null>('');

    React.useEffect(() => {
        // if user is already logged in, redirect to home page
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    // update form data on input change
    const handleLoginFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // handle form submit
    const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
            navigate('/login', { replace: true, state: { user: res.data } });
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        }); 
    }

    return (
        <main className="grid place-content-center place-items-center w-screen h-screen bg-[url('./src/assets/images/homepage_hero.png')] bg-cover">
            <article className='container mx-auto grid grid-cols-2 rounded-3xl bg-opacity-70 bg-neutral-300 drop-shadow-sm'>
                {/* Login Form Part */}
                <section className='w-[500px] h-[600px] p-10 space-y-8'>
                    {/* Login Title */}
                    <div className="flex gap-2 items-center">
                        <InlineIcon icon='basil:login-solid' className='w-16 h-16 not-sr-only' />
                        <h1 className='text-4xl font-bold font-sans uppercase'>Register</h1>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLoginFormSubmit} className="flex flex-col gap-6">
                        {/* Display Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="displayName">
                                <IconWithText iconName='ph:user-bold' title='Username' />
                            </label>
                            <input onChange={handleLoginFormInputChange} type="text" id="displayName" name="displayName" placeholder="Enter your username" className="p-3 rounded-md bg-neutral-100" />
                        </div>

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
                            <button type="submit" className="p-3 rounded-md transition-colors ease-out bg-neutral-900 text-neutral-100 hover:bg-neutral-800">Register</button>
                            {error && <p className='text-red-500 text-right'>{error}</p>}
                        </div>
                    </form>
                </section>

                {/* Background Side */}
                <section className="bg-[url('./src/assets/images/login-side.jpg')] bg-cover rounded-r-3xl" />
            </article>
        </main>
    )
}

export default Index