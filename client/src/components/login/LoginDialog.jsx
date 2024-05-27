import React, { useState, useEffect, useContext } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';

import { authenticateLogin, authenticateSignup } from '../../service/api';
import { DataContext } from '../../context/DataProvider';


const Component = styled(DialogContent)`
    height: 70vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
// height: 70vh;

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 40%;
    height: 100%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValue = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAcount] = useState(accountInitialValue.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);

    const { setAccount } = useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAcount(accountInitialValue.login)
        setError(false);
    }

    const toggleSignup = () => {
        toggleAcount(accountInitialValue.signup)
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const signupUser = async () => {
        const response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.firstname);
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if (response.status === 200) {
            handleClose();
            setAccount(response.data.user.firstname);
        } else {
            setError(true);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant="h5">heading</Typography>
                        <Typography style={{ marginTop: 20 }}>sub heading</Typography>
                    </Image>
                    {
                        account.view === 'login' ?
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name='username' label='Enter Username'></TextField>
                                {
                                    error ? <Error>Please Enter Valid Username and Password</Error> : null
                                }
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name='password' label='Enter Password'></TextField>
                                <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
                                </Text>
                                <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <RequestOTP>Request OTP</RequestOTP>
                                <CreateAccount onClick={() => toggleSignup()}>
                                    New to Flipkart? Create an account
                                </CreateAccount>
                            </Wrapper>
                            :
                            <Wrapper>
                                <TextField variant='standard' label='Enter Firstname' name='firstname' onChange={(e) => onInputChange(e)}></TextField>
                                <TextField variant='standard' label='Enter Lastname' name='lastname' onChange={(e) => onInputChange(e)}></TextField>
                                <TextField variant='standard' label='Enter Username' name='username' onChange={(e) => onInputChange(e)}></TextField>
                                <TextField variant='standard' label='Enter Email' name='email' onChange={(e) => onInputChange(e)}></TextField>
                                <TextField variant='standard' label='Enter Password' name='password' onChange={(e) => onInputChange(e)}></TextField>
                                <TextField variant='standard' label='Enter Phone' name='phone' onChange={(e) => onInputChange(e)}></TextField>
                                <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog