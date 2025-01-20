// This Component serves the Registration form 
import React, { useState } from 'react'
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { login, setSnackbar } from '../../store/reducerLogic.js';
interface RegisterProps {
    setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EventType {
    InputEvent: React.ChangeEvent<HTMLInputElement>;
}

function Register({ setisLogin }: RegisterProps) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [error, setError] = useState({
        emailError: false,
        passwordError: false,
        repeatPassError: false,
    });

    //Defining the state for inputs
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email && !password) {
            setError((prev) => {
                return { ...prev, emailError: true, passwordError: true };
            });
            return;
        }
        if (!email) {
            setError((prev) => {
                return { ...prev, emailError: true };
            });
            return;
        }
        if (!password) {
            setError((prev) => {
                return { ...prev, passwordError: true };
            });
            return;
        }
        if (repeatPass !== password) {
            setError((prev) => {
                return { ...prev, repeatPassError: true };
            });
            return;
        }

        setLoading(true);
        axios
            .post("/auth/signup", { email, password })
            .then((res) => {
                dispatch(login(res?.data?.content?.data));

                localStorage.setItem("token", res.data?.meta?.access_token);
                setLoading(false);
                navigate("/fav-genres");
            })
            .catch(({ response }) => {
                setLoading(false);
                dispatch(setSnackbar({ open: true, message: `${response?.data?.error}. One Capital, small, numeric and special character each.` }));
            });
    };

    // Single function to handles input change of all input
    const handleChange = (e: EventType[`InputEvent`], field: string) => {
        const text = e.target.value;
        const newField = field + "Error";
        if (text) {
            setError((prev) => {
                return { ...prev, [newField]: false };
            });
        }
        if (field === "email") setEmail(text);
        else if (field === "password") setPassword(text);
        else if (field === "repeatPass") setRepeatPass(text);
    };

    return (
        <main className='bg-secondary shadow-xl md:w-[60%] bdmd:w-[40%] py-2 px-4 rounded-xl'>
            <h1 className='text-2xl text-center mt-[10px]'>Sign Up</h1>

            <form className='w-[100%] relative'>
                <TextField
                    id="filled-search"
                    label="Email address"
                    variant="filled"
                    type='email'
                    sx={{
                        marginTop: '30px',
                        width: '100%',
                        '& .css-e2jmdx': {
                            borderBottom: `${error.emailError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={email}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "email")}

                />
                {error.emailError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[60px]">Can't be empty</p>
                )}
                <TextField
                    id="filled-search"
                    label="Password"
                    variant="filled"
                    type='text'
                    sx={{
                        marginTop: '20px',
                        width: '100%',
                        '& .css-e2jmdx': {
                            borderBottom: `${error.passwordError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={password}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "password")}
                />
                {error.passwordError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[140px]">Can't be empty</p>
                )}

                <TextField
                    id="filled-search"
                    label="Repeat password"
                    variant="filled"
                    type='text'
                    sx={{
                        marginTop: '20px',
                        width: '100%',
                        '& .css-e2jmdx': {
                            borderBottom: `${error.repeatPassError && '1px solid #FC4747 !important'}`
                        }
                    }}
                    value={repeatPass}
                    onChange={(e: EventType[`InputEvent`]) => handleChange(e, "repeatPass")}
                />
                {error.repeatPassError && (
                    <p className="text-secondary text-[12px] absolute right-0 top-[215px]">Should match with password</p>
                )}


                <LoadingButton
                    loadingPosition="start"
                    onClick={handleRegister}
                    loading={loading}
                >
                    {!loading && "Create an account"}
                </LoadingButton>
            </form>
            <div className='flex items-center justify-center gap-3 mb-[20px]'>
                <p>Already have an account?</p>
                <div role='button' className='text-secondary' onClick={() => setisLogin(true)}>Login</div>
            </div>

        </main>
    )
}

export default Register
