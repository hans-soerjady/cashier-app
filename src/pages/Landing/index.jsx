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
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/action/accountAction'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const Landing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const refUsername = React.useRef("")
    const refPassword = React.useRef("")

    const onLogin = () => {
        localStorage.setItem("username", refUsername.current.value)
        dispatch(loginAction({ username: refUsername.current.value, password: refPassword.current.value }))
        navigate("/dashboard")
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