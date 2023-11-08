import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, InputRightAddon, Select, ButtonGroup, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import LayoutPage from "../../../components/LayoutPage";
import { AiOutlinePlus, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import "./style.css"
import { BiSearch } from "react-icons/bi";

import React, { useEffect } from "react";
import axios from "axios";
import useToggle from "../../../hooks/useToggle";
import { API_CALL } from "../../../helper";

const ManageAccountPage = () => {
    const [inUsername, setInUsername] = React.useState("")
    const [inPassword, setInPassword] = React.useState("")
    const [inRole, setInRole] = React.useState("")
    const [isVisible, setIsVisible] = React.useState(false);

    const [selectedId, setSelectedId] = React.useState(0)

    const [accountDatabase, setAccountDatabase] = React.useState([])
    const getAccounts = async () => {
        try {
            const resGET = await API_CALL.get("/account")
            console.log(resGET.data);
            setAccountDatabase(resGET.data)
        } catch (error) {
            console.log(error);
        }

        // axios
        //     .get(import.meta.env.VITE_API_URL + `/account`)
        //     .then((response) => {
        //         console.log("GET DATA ACCOUNT");
        //         setAccountDatabase(response.data)
        //     }).catch((err) => {
        //         console.log("Masuk error", err)
        //     })
    }

    // pertama kali load ngambil database accounts
    React.useEffect(() => {
        getAccounts()
    }, [])

    const printTable = () => {
        return accountDatabase.map((value) => {
            return <Tr>
                <Td>{value.id}</Td>
                <Td>{value.username}</Td>
                <Td>{value.password}</Td>
                <Td>{value.role}</Td>
                <Td>
                    <ButtonGroup>
                        <Button onClick={() => { "" }} >Edit</Button>
                        <Button onClick={() => { onDelete(value.id) }}>Delete</Button>
                    </ButtonGroup>
                </Td>
            </Tr>
        })
    }

    const onSave = async () => {
        try {
            if (inUsername && inPassword && inRole) {
                // memeriksa apakah account sudah terdaftar
                const resGET = await API_CALL.get(`/account?username=${inUsername}`)
                console.log(resGET.data);
                if (resGET.data.length) {
                    alert("Account already exists.")
                } else {
                    // menambahkan account ke database
                    await axios.post(API_URL + `/account`, {
                        username: inUsername,
                        password: inPassword,
                        role: inRole
                    })
                    alert("Account added successfully.")
                    getAccounts()
                }
            } else {
                alert("Please fill in all the form.")
            }
        } catch (error) {
            console.log(error);
        }

        // if (inUsername && inPassword && inRole) {
        //     axios.get(API_URL + `/account?username=${inUsername}`)
        //         .then((response) => {
        //             console.log("Check Account", response.data);
        //             if (response.data.length) {
        //                 alert("Account already exists.")
        //             } else {
        //                 axios.post(`${API_URL}/account`, {
        //                     username: inUsername,
        //                     password: inPassword,
        //                     role: inRole
        //                 }).then((resPOST) => {
        //                     console.log("Response add account", resPOST.data);
        //                     getAccounts();
        //                 }).catch((errPOST) => {
        //                     console.log("Masuk Error post", errPOST);
        //                 })
        //             }
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         })
        // } else {
        //     alert("Please fill in all the boxes.")
        // }
    }

    const onDelete = async (id) => {
        try {
            await axios.delete(API_URL + `/account/${id}`)
            alert("Account deleted successfully.")
            getAccounts()
        } catch (error) {
            console.log(error);
        }
    }

    const modalAdd2 = useToggle()
    return <LayoutPage>
        <Box className="main-area" width={"100%"} gap={"30px"} minHeight={"100vh"} >
            <Box className="header-area">
                <Text fontSize={"24px"} ><span className="bold-text">Manage</span> Account</Text>
            </Box>

            <Flex gap={"50px"}>
                <InputGroup width={["full", "sm"]}>
                    <InputLeftAddon children={<BiSearch />} />
                    <Input type="text" placeholder="Search your account." />
                </InputGroup>
                <Button type="button" colorScheme="green" leftIcon={<AiOutlinePlus />} onClick={modalAdd2.onToggleOpen} >Add </Button>
            </Flex>

            <Modal isOpen={modalAdd2.isOpenModal} >
                <ModalContent>
                    <ModalHeader>Add new account</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Username:</FormLabel>
                            <Input type='text' placeholder='Enter your username.' textAlign={"left"}
                                onChange={(event) => { setInUsername(event.target.value) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password:</FormLabel>
                            <InputGroup>
                                <Input type={isVisible ? "text" : "password"} placeholder='Enter your password.' textAlign={"left"}
                                    onChange={(event) => { setInPassword(event.target.value) }} />
                                <InputRightAddon cursor={"pointer"}
                                    onClick={() => { setIsVisible(!isVisible) }} >
                                    {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                </InputRightAddon>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role: </FormLabel>
                            <Select placeholder="Select Role" onChange={(event) => { setInRole(event.target.value) }}>
                                <option value={"SPV"}>SPV</option>
                                <option value={"CASHIER"}>Cashier</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="button" colorScheme="green" onClick={() => {
                                modalAdd2.onToggleClose()
                                onSave()
                            }} >Save</Button>
                            <Button type="button" colorScheme="green" onClick={modalAdd2.onToggleClose} >Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box className="table-container" width={"100%"}>
                <Table variant="simple" >
                    {/* <TableCaption>User List</TableCaption> */}
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Username</Th>
                            <Th>Password</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {printTable()}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    </LayoutPage>
}

export default ManageAccountPage