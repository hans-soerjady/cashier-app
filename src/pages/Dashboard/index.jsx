import React from "react";

// import css
import { Button, Box, Text, Input, InputGroup, InputLeftAddon, Select, } from "@chakra-ui/react";
import "./style.css"

// import icons
import { MdSearch } from "react-icons/md";

// import components
import FilterButtons from "../../components/FilterButtons";
import ItemCards from "../../components/ItemCards";
import SearchItemCards from "../../components/SearchItemCards";
import CartItems from "../../components/CartItems";

import { useDispatch, useSelector } from "react-redux";
import LayoutPage from "../../components/LayoutPage";
import { addToCart, deleteCart } from "../../redux/slice/cartSlice";
import { getProducts } from "../../redux/slice/productSlice";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch("");
    const navigate = useNavigate();

    // TEMPAT GLOBAL STATE
    const database = useSelector((state) => { return state.productReducer.products })
    const account = useSelector((state) => { return state.accountReducer })
    const categories = useSelector((state) => { return state.categoryReducer.categories })
    const cartDatabasev2 = useSelector((state) => { return state.cartReducer })

    const [currentDate, setCurrentDate] = React.useState(new Date())
    setInterval(() => { setCurrentDate(new Date()) }, 1000)

    const [filterState, setFilterState] = React.useState("")
    const [filterSortDatabase, setFilterSortDatabase] = React.useState("")
    const [searchMenu, setSearchMenu] = React.useState("")

    const [totalCartTransaction, setTotalCartTransaction] = React.useState(0)
    const [cartAreaDisplay, setCartAreaDisplay] = React.useState("none")
    const [mainAreaWidth, setMainAreaWidth] = React.useState("92%")


    const printData = () => {
        return database.map(value => {
            return <ItemCards key={value.id} img={`http://localhost:2064/public/productImages/${value.productImages[0].img}`}
                itemName={value.name} itemPrice={value.price}
                func={() => {
                    setTotalCartTransaction(totalCartTransaction + parseInt(value.price))
                    dispatch(addToCart({
                        id: value.id,
                        name: value.name,
                        price: value.price,
                        img: `http://localhost:2064/public/productImages/${value.productImages[0].img}`,
                    }))
                }} />
        })
    }

    const printSearch = () => {
        if (searchMenu !== "") {
            return database.map(value => {
                if ((value.name).toLowerCase().includes(searchMenu.toLowerCase())) {
                    return <SearchItemCards img={value.img} name={value.name} price={value.price}
                        func={() => {
                            setTotalCartTransaction(totalCartTransaction + parseInt(value.price))
                            dispatch(addToCart({
                                id: value.id,
                                name: value.name,
                                price: value.price,
                                img: `http://localhost:2064/public/productImages/${value.productImages[0].img}`,
                            }))
                        }} />
                }
            })
        }
    }

    const printCategory = () => {
        return categories.map((value, index) => {
            return <FilterButtons key={index} className={"active"} img={value.image} name={value.name}
                style={filterState === value.name ? activeStyle.main : {}} iconStyle={filterState === value.name ? activeStyle.icon : {}}
                func={() => { filterFunction(value.name) }} />
        })
    }

    const printCart = () => {
        if (cartDatabasev2.length > 0) {
            if (cartAreaDisplay === "none") {
                setCartAreaDisplay("flex")
                setMainAreaWidth("67%")
            }
            return cartDatabasev2.map((value, index) => {
                return <CartItems img={value.img} name={value.name} price={value.price} qty={value.qty}
                    func={() => {
                        dispatch(deleteCart(
                            {
                                id: value.id,
                                name: value.name,
                                price: value.price,
                                img: value.img,
                            }
                        ))
                        setTotalCartTransaction(totalCartTransaction - parseInt(value.price))
                    }} />
            })
        } else {
            if (cartAreaDisplay === "flex") {
                setCartAreaDisplay("none")
                setMainAreaWidth("92%")
            }
        }
    }

    let activeStyle = {
        main: {
            backgroundColor: "#38A169",
            color: "white",
            transform: "translateY(-10px)",
        },

        icon: {
            backgroundColor: "white",
            color: "rgb(0, 99, 0)",
            boxShadow: "3px 3px 3px 3px rgba(110, 110, 110, 0.3)",
        }
    }

    const filterFunction = (param) => {
        if (filterState !== param) {
            setFilterState(param)
            navigate(`/dashboard?category=${param}`)
            dispatch(getProducts(`?category=${param}`))

        } else {
            setFilterState("")
            navigate(`/dashboard`)
            dispatch(getProducts())
        }
    }

    return <LayoutPage>
        <Box className="main-area" width={mainAreaWidth}>
            <Box className="header-area">
                <Box>
                    <Text fontSize={"24px"}><span className="bold-text">Order</span> Menu</Text>
                    <Text>Hi, {account.username}!</Text>
                </Box>
                <Text className="bold-text" color={"gray"} fontSize={"14px"}>{`${currentDate.toDateString("id")}, ${currentDate.toLocaleTimeString("id")}`}</Text>
                <Box>
                    <InputGroup className="input-group">
                        <InputLeftAddon><MdSearch /></InputLeftAddon>
                        <Input type="text" placeholder={"Search your menu"} onChange={(event) => {
                            setSearchMenu(event.target.value)
                        }} />
                    </InputGroup>

                    <Box className="search-result">
                        {printSearch()}
                    </Box>
                </Box>
            </Box>

            <Box className="filter-area">
                {printCategory()}


                {/* <FilterButtons icon={<IoFastFoodOutline size={"40px"} />} name={"Food"}
                    style={foodActive.main} iconStyle={foodActive.icon}
                    func={() => { filterFunction("Food") }} />

                <FilterButtons icon={<BiDrink size={"40px"} />} name={"Drink"}
                    style={drinkActive.main} iconStyle={drinkActive.icon}
                    func={() => { filterFunction("Drink") }} />

                <FilterButtons icon={<LuCroissant size={"40px"} />} name={"Snack"}
                    style={snackActive.main} iconStyle={snackActive.icon}
                    func={() => { filterFunction("Snack") }} />

                <FilterButtons icon={<LuDessert size={"40px"} />} name={"Dessert"}
                    style={dessertActive.main} iconStyle={dessertActive.icon}
                    func={() => { filterFunction("Dessert") }} /> */}
            </Box>

            <Box className="print-area">
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Text fontSize={"24px"}><span className="bold-text">Menu</span> List</Text>

                    <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"10px"}>
                        <label>Sort by:</label>
                        <Select w={"64"} cursor={"pointer"} onChange={(e) => {
                            setFilterSortDatabase(e.target.value)
                        }}>
                            <option value={"none"} >Select an Option</option>
                            <option value={"ascending"} >Lowest to Highest Price</option>
                            <option value={"descending"} >Highest to Lowest Price</option>
                            <option value={"under50"} >Under Rp. 50.000</option>
                        </Select>
                    </Box>
                </Box>

                <Box className="print-item-card-area">
                    {printData()}
                </Box>
            </Box>
        </Box>

        <Box className="cart-area" display={cartAreaDisplay}>
            <Box>
                <Text fontSize={"24px"} marginBottom={"10px"}><span className="bold-text">Order</span> List</Text>
                {printCart()}
            </Box>

            <Box className="payment-area" marginBottom={"10px"} borderTop={"1px solid gray"} paddingTop={"5px"}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"baseline"} marginBottom={"10px"}>
                    <Text fontSize={"12px"} className="bold-text" color={"gray"}>Total Payment</Text>
                    <Text fontSize={"15px"} className="bold-text">Rp. {totalCartTransaction.toLocaleString("id")}</Text>
                </Box>

                <Button colorScheme="green" size={"sm"} width={"100%"}>Order Now</Button>
            </Box>
        </Box>
    </LayoutPage>
}

export default Dashboard;