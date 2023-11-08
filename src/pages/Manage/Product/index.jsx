import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, InputRightAddon, Select, ButtonGroup, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import LayoutPage from "../../../components/LayoutPage"
import { API_CALL } from "../../../helper";

import axios from "axios";
import React from "react";
import useToggle from "../../../hooks/useToggle";



const manageProductPage = () => {
    const [inProductName, setInProductName] = React.useState("")
    const [inProductPrice, setInProductPrice] = React.useState("")
    const [inProductImg, setInProductImg] = React.useState("")
    const [inProductCategory, setInProductCategory] = React.useState("")
    const [inProductStock, setInProductStock] = React.useState("")

    const [productDatabase, setProductDatabase] = React.useState([])
    const getProducts = () => {
        API_CALL.get(`/product`).then((response) => {
            setProductDatabase(response.data)
        }).catch((err) => {
            console.log("Masuk error", err)
        })
    }
    // pertama kali load ngambil database accounts
    React.useEffect(() => {
        getProducts()
    }, [])



    const onSave = () => {
        if (inProductName && inProductPrice && inProductImg && inProductCategory && inProductStock) {
            axios.post(`${API_URL}/product`, {
                name: inProductName,
                price: inProductPrice,
                img: inProductImg,
                category: inProductCategory,
                stock: inProductStock,
                isReady: true,
            }).then((response) => {
                getProducts();
            }).catch((err) => {
                console.log("Masuk Error", err);
            })
            console.log()
        } else {
            alert("Please fill in all the boxes.")
        }
    }

    const [ObjEdit, setObjEdit] = React.useState({
        name: "",
        price: 0,
        img: "",
        category: "",
        stock: 0,
        isReady: true
    })

    const editProduct = (id) => {
        axios.patch(`${API_URL}/product/${id}`, {
            // name: "Pizza",
            // price: "65000",
            // img: "https://pngfre.com/wp-content/uploads/pizza-png-from-pngfre-16-300x300.png",
            // category: "Food",
            stock: "12",
            // isReady: true,
        }).then((response) => {
            getProducts()
        }).catch((err) => {
            console.log("Masuk error", err);
        })
    }

    const deleteProduct = (id) => {
        axios.delete(`${API_URL}/product/${id}`)
            .then((response) => {
                getProducts()
            }).catch((err) => {
                console.log("Masuk Error", err)
            })
    }

    const printData = () => {
        return productDatabase.map((value) => {
            return <Tr>
                <Td>{value.id}</Td>
                <Td>{value.name}</Td>
                <Td>{`Rp. ${parseInt(value.price).toLocaleString("id")}`}</Td>
                <Td><img src={value.img} height={"100px"} width={"100px"} /></Td>
                <Td>{value.category}</Td>
                <Td>{value.stock}</Td>
                <Td>
                    <ButtonGroup>
                        <Button onClick={() => {
                            editProduct(value.id)
                        }}>Edit</Button>
                        <Button onClick={() => {
                            deleteProduct(value.id)
                        }}>Delete</Button>
                    </ButtonGroup>
                </Td>
            </Tr>
        })
    }


    const modalAdd2 = useToggle()
    return <LayoutPage>
        <Box className="main-area" width={"100%"} gap={"30px"} minHeight={"100vh"} >

            <Box className="header-area">
                <Text fontSize={"24px"} ><span className="bold-text">Manage</span> Product</Text>
            </Box>

            <Flex>
                <InputGroup width={["full", "sm"]}>
                    <InputLeftAddon children={<BiSearch />} />
                    <Input type="text" placeholder="Search your product." />
                </InputGroup>
                <Button type="button" colorScheme="green" leftIcon={<AiOutlinePlus />} onClick={() => { modalAdd2.onToggleOpen() }} >Add </Button>
            </Flex>

            <Modal isOpen={modalAdd2.isOpenModal} >
                <ModalContent>
                    <ModalHeader>Add new Product</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Product Name:</FormLabel>
                            <Input type="text" placeholder="Enter new product name." onChange={(e) => { setInProductName(e.target.value) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Price:</FormLabel>
                            <Input type="number" placeholder="Enter new product price." onChange={(e) => { setInProductPrice(e.target.value) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Image:</FormLabel>
                            <Input type="text" placeholder="Enter new product image link." onChange={(e) => { setInProductImg(e.target.value) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Category:</FormLabel>
                            <Select placeholder="Choose Product Category" onChange={(e) => { setInProductCategory(e.target.value) }}>
                                <option value={"Hot"}>Hot</option>
                                <option value={"Food"}>Food</option>
                                <option value={"Drink"}>Drink</option>
                                <option value={"Snack"}>Snack</option>
                                <option value={"Dessert"}>Dessert</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Stock:</FormLabel>
                            <Input type="number" placeholder="Enter new product stock." onChange={(e) => { setInProductStock(e.target.value) }} />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="button" colorScheme="green" onClick={() => {
                                onSave()
                                modalAdd2.onToggleClose()
                            }} >Save</Button>
                            <Button type="button" colorScheme="green" onClick={modalAdd2.onToggleClose} >Cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box className="table-container" width={"100%"}>
                <Table variant="simple" >
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Image</Th>
                            <Th>Category</Th>
                            <Th>Stock</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {printData()}
                    </Tbody>
                </Table>
            </Box>

        </Box>
    </LayoutPage>
}

export default manageProductPage;