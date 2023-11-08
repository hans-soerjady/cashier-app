import { useNavigate } from 'react-router-dom'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    InputRightAddon,
} from '@chakra-ui/react'

import "./style.css"

import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../redux/action/accountAction'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { login } from '../../redux/slice/accountSlice'

const Landing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const username = useSelector((state) => {
        console.log("cek reducer", state.accountReducer);
        return state.accountReducer.username
    })

    const refUsername = React.useRef("")
    const refPassword = React.useRef("")

    const onLogin = () => {

        axios.get(`http://localhost:3035/account/?username=${refUsername.current.value}&password=${refPassword.current.value}`).then((response) => {
            if (response.data.length === 0) {
                console.log("Gak nemu", response.data);
                return alert("Account not found, please enter the username and password correctly.")
            } else {
                console.log("Nemu", response.data);
                localStorage.setItem("auth", JSON.stringify(response.data[0]))
                dispatch(login(response.data[0]))
                navigate("/dashboard")
            }
        }).catch((err) => {
            console.log("Masuk Error", err);
        })

    }

    const [isVisible, setIsVisible] = React.useState(false);

    return <div className="landing-page">
        <Card className="landing-page-card">

            <CardBody className="landing-page-card-body">
                <Heading>Welcome!</Heading>
                <Text color={'gray'} marginBottom={"30px"}>Please login before using the app.</Text>

                <FormControl>
                    <FormLabel>Username:</FormLabel>
                    <Input ref={refUsername} type='text' placeholder='Enter your username.'
                        textAlign={"left"} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password:</FormLabel>
                    <InputGroup>
                        <Input ref={refPassword} type={isVisible ? "text" : "password"} placeholder='Enter your password.'
                            textAlign={"left"} />
                        <InputRightAddon cursor={"pointer"}
                            onClick={() => { setIsVisible(!isVisible) }} >

                            {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>
                <Button colorScheme='green' onClick={onLogin} marginTop={"30px"} >Login</Button>
            </CardBody>
        </Card>
    </div>
}

export default Landing;