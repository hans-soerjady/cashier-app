import { useNavigate } from 'react-router-dom'

import {
    Card,
    CardBody,
    Button,
    Heading,
    Text,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightAddon,
} from '@chakra-ui/react'

import "./style.css"

import React from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { login } from '../../redux/slice/accountSlice'
import { API_CALL } from '../../helper'

const Landing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const refUsername = React.useRef("")
    const refPassword = React.useRef("")

    const onLogin = async () => {
        try {
            const resp = await API_CALL.post(`/account/login`, {username: refUsername.current.value, password: refPassword.current.value})
            if(resp.data.success) {
                console.log(resp.data);
                localStorage.setItem("token",resp.data.result.token)
                dispatch(login(resp.data.result))
                navigate("/dashboard")
            } else {
                return alert("Cannot find the selected account")
            }
        } catch (error) {
            alert("Unsuccessful login. Please enter username and password correctly.")
        }
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