import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, InputRightAddon, Select, ButtonGroup, Table, TableCaption, Thead, Tr, Th, Tbody, Td, useDisclosure } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import LayoutPage from "../../../components/LayoutPage"
import { API_CALL } from "../../../helper";

import React, { useEffect } from "react";
import useToggle from "../../../hooks/useToggle";
import { getProducts } from "../../../redux/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";



const manageProductPage = () => {
    const dispatch = useDispatch()
    const [inProductName, setInProductName] = React.useState("")
    const [inProductPrice, setInProductPrice] = React.useState("")
    const [productImg, setProductImg] = React.useState()
    const [inProductCategory, setInProductCategory] = React.useState("")
    const [inProductStock, setInProductStock] = React.useState("")

    const [selectedProductId, setSelectedProductId] = React.useState(0)
    const [selectedIndex, setSelectedIndex] = React.useState(-1)

    useEffect(() => {
        setSelectedIndex(productDatabase.findIndex((value) => value.id === selectedProductId))
    }, [selectedProductId])

    // GLOBAL STATES
    const productDatabase = useSelector((state) => { return state.productReducer.products })
    const categories = useSelector((state) => { return state.categoryReducer.categories })

    const onSave = async () => {
        if (inProductName && inProductPrice && productImg && inProductCategory && inProductStock) {
            const formData = new FormData()
            formData.append("fileuploads", productImg)
            formData.append("name", inProductName)
            formData.append("price", inProductPrice)
            formData.append("categoryId", inProductCategory)
            formData.append("stock", inProductStock)

            const result = await API_CALL.post(`/product`, formData, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`} })
            if (result.data.success) {
                dispatch(getProducts())
            } else {
                alert("Failed adding product")
            }
        } else {
            alert("Please fill in all the boxes.")
        }
    }

    const [objEdit, setObjEdit] = React.useState({})

    const editProduct = async (id) => {
        const formData = new FormData()
        console.log(objEdit);
        for (const key in objEdit) {
            objEdit[key] ? formData.append(key, objEdit[key]) : ""
        }
        const result = await API_CALL.patch(`/product/${id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        setObjEdit({})
        if (result.data.success) { dispatch(getProducts()) }
        else { alert("Failed editing product.") }
    }

    const deleteProduct = async (id) => {
        const result = await API_CALL.delete(`/product/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
        if (result.data.success) {
            dispatch(getProducts())
        } else {
            alert("Failed deleting product.")
        }
    }

    const printData = () => {
        return productDatabase.map((value, index) => {
            return <Tr key={index}>
                <Td>{value.id}</Td>
                <Td>{value.name}</Td>
                <Td>{`Rp. ${parseInt(value.price).toLocaleString("id")}`}</Td>
                <Td><img src={`http://localhost:2064/public/productImages/${value.productImages[0]?.img}`} height={"100px"} width={"100px"} /></Td>
                <Td>{value.category.name}</Td>
                <Td>{value.stock}</Td>
                <Td>
                    <ButtonGroup>
                        <Button onClick={() => {
                            // editProduct(value.id)
                            setSelectedProductId(value.id)
                            setTimeout(() => {
                                modalEdit.onOpen()
                            }, 10)
                        }}>Edit</Button>
                        <Button onClick={() => {
                            deleteProduct(value.id)
                        }}>Delete</Button>
                    </ButtonGroup>
                </Td>
            </Tr>
        })
    }

    const printCategories = () => {
        return categories.map((value, index) => {
            return <option key={index} value={value.id}>{value.name}</option>
        })
    }

    const modalAdd2 = useToggle()
    const modalEdit = useDisclosure()
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

            <Modal id="modal-add-product" isOpen={modalAdd2.isOpenModal} >
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
                            {/* <Input type="text" placeholder="Enter new product image link." onChange={(e) => { setInProductImg(e.target.value) }} /> */}
                            <input filename={productImg} type="file" accept="image/*" style={{ marginBottom: "10px" }}
                                onChange={(e) => { setProductImg(e.target.files[0]) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Category:</FormLabel>
                            <Select placeholder="Choose Product Category" onChange={(e) => { setInProductCategory(e.target.value) }}>
                                {printCategories()}
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

            <Modal id="modal-edit-product" isOpen={modalEdit.isOpen} >
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Product Name:</FormLabel>
                            <Input type="text" placeholder="Enter new product name." defaultValue={productDatabase[selectedIndex]?.name}
                                onChange={(e) => { setObjEdit({ ...objEdit, name: e.target.value }) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Price:</FormLabel>
                            <Input type="number" placeholder="Enter new product price." defaultValue={productDatabase[selectedIndex]?.price}
                                onChange={(e) => { setObjEdit({ ...objEdit, price: e.target.value }) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Image:</FormLabel>
                            <input filename={objEdit?.file} type="file" accept="image/*"
                                style={{ marginBottom: "10px" }} onChange={(e) => { setObjEdit({ ...objEdit, fileuploads: e.target.files[0] }) }} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Category:</FormLabel>
                            <Select placeholder="Choose Product Category" defaultValue={productDatabase[selectedIndex]?.categoryId}
                                onChange={(e) => { setObjEdit({ ...objEdit, categoryId: e.target.value }) }}>
                                {printCategories()}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Stock:</FormLabel>
                            <Input type="number" placeholder="Enter new product stock." defaultValue={productDatabase[selectedIndex]?.stock}
                                onChange={(e) => { setObjEdit({ ...objEdit, stock: e.target.value }) }} />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button type="button" colorScheme="green" onClick={() => {
                                editProduct(selectedProductId)
                                modalEdit.onClose()
                            }} >Save</Button>
                            <Button type="button" colorScheme="green" onClick={modalEdit.onClose} >Cancel</Button>
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