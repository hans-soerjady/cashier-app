import React from "react";

// import css
import { Button, Box, Text, Input, InputGroup, InputLeftAddon, Select, } from "@chakra-ui/react";
import "./style.css"

// import icons
import { FaHouseChimney } from "react-icons/fa6";
import { MdSearch } from "react-icons/md";
import { TbFlame } from "react-icons/tb";
import { BiDrink, BiSolidDashboard } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuDessert, LuCroissant } from "react-icons/lu";


// import components
import FilterButtons from "../../components/FilterButtons";
import ItemCards from "../../components/ItemCards";
import SearchItemCards from "../../components/SearchItemCards";
import CartItems from "../../components/CartItems";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartAction, deleteCartAction } from "../../redux/action/cartAction";

const Dashboard = () => {
    const [database, setDatabase] = React.useState([
        {
            id: 1,
            name: "Pizza",
            price: 65000,
            img: "https://pngfre.com/wp-content/uploads/pizza-png-from-pngfre-16-300x300.png",
            category: "Food"
        },

        {
            id: 2,
            name: "Burger",
            price: 40000,
            img: "https://static.vecteezy.com/system/resources/previews/022/598/811/original/tasty-beef-burger-png.png",
            category: "Food"
        },

        {
            id: 3,
            name: "Beef Steak",
            price: 55000,
            img: "https://pngimg.com/d/steak_PNG11.png",
            category: "Hot"
        },

        {
            id: 4,
            name: "Coffee Latte",
            price: 22000,
            img: "https://static.vecteezy.com/system/resources/previews/009/887/177/original/hot-coffee-latte-cup-free-png.png",
            category: "Drink"
        },

        {
            id: 5,
            name: "Cheesecake",
            price: 31000,
            img: "https://static.vecteezy.com/system/resources/previews/025/065/317/non_2x/cheesecake-with-ai-generated-free-png.png",
            category: "Dessert"
        },

        {
            id: 6,
            name: "French Fries",
            price: 27000,
            img: "https://www.pngkey.com/png/full/8-86527_french-fries-french-fries-png.png",
            category: "Snack"
        },

    ])

    const navigate = useNavigate("");
    const dispatch = useDispatch("");

    const [currentDate, setCurrentDate] = React.useState(new Date())
    setInterval(() => { setCurrentDate(new Date()) }, 1000)

    const [filterState, setFilterState] = React.useState("")
    const [filterSortDatabase, setFilterSortDatabase] = React.useState("")
    const [searchMenu, setSearchMenu] = React.useState("")


    const [cartData, setCartData] = React.useState([])
    const [totalCartTransaction, setTotalCartTransaction] = React.useState(0)
    const [cartAreaDisplay, setCartAreaDisplay] = React.useState("none")
    const [mainAreaWidth, setMainAreaWidth] = React.useState("92%")

    const account = useSelector((state) => { return state.accountReducer })

    const printData = () => {

        if (filterSortDatabase === "none") {
            setDatabase(database.sort((a, b) => { return a.id - b.id }))
            setFilterSortDatabase("")
        } else if (filterSortDatabase === "ascending") {
            setDatabase(database.sort((a, b) => { return a.price - b.price }))
            setFilterSortDatabase("")
        } else if (filterSortDatabase === "descending") {
            setDatabase(database.sort((a, b) => { return b.price - a.price }))
            setFilterSortDatabase("")
        } else if (filterSortDatabase === "under50") {
            setDatabase(database.sort((a, b) => { return a.id - b.id }))
            setFilterSortDatabase("under50v2")
        }


        return database.map(value => {
            if ((value.category === filterState || filterState === "") && (value.price < 50000 || filterSortDatabase !== "under50v2")) {
                return <ItemCards img={value.img} itemName={value.name} itemPrice={value.price}
                    func={() => {
                        setTotalCartTransaction(totalCartTransaction + value.price)
                        dispatch(addToCartAction({
                            id: value.id,
                            name: value.name,
                            price: value.price,
                            img: value.img,
                        }))
                    }} />
            }
        })
    }

    const printSearch = () => {
        if (searchMenu !== "") {
            return database.map(value => {
                if ((value.name).toLowerCase().includes(searchMenu.toLowerCase())) {
                    return <SearchItemCards img={value.img} name={value.name} price={value.price}
                        func={() => {
                            setTotalCartTransaction(totalCartTransaction + value.price)
                            dispatch(addToCartAction({
                                id: value.id,
                                name: value.name,
                                price: value.price,
                                img: value.img,
                            }))
                        }} />
                }
            })
        }
    }

    const cartDatabasev2 = useSelector((state) => { return state.cartReducer })
    const printCart = () => {
        if (cartDatabasev2.length > 0) {
            if (cartAreaDisplay === "none") {
                setCartAreaDisplay("flex")
                setMainAreaWidth("67%")
            }
            return cartDatabasev2.map((value, index) => {
                return <CartItems img={value.img} name={value.name} price={value.price} qty={value.qty}
                    func={() => {
                        dispatch(deleteCartAction(
                            {
                                id: value.id,
                                name: value.name,
                                price: value.price,
                                img: value.img,
                            }
                        ))
                        setTotalCartTransaction(totalCartTransaction - value.price)
                    }} />
            })
        } else {
            if (cartAreaDisplay === "flex") {
                setCartAreaDisplay("none")
                setMainAreaWidth("92%")
            }
        }
    }

    const [hotActive, setHotActive] = React.useState({})
    const [foodActive, setFoodActive] = React.useState({})
    const [drinkActive, setDrinkActive] = React.useState({})
    const [snackActive, setSnackActive] = React.useState({})
    const [dessertActive, setDessertActive] = React.useState({})

    const filterFunction = (param) => {

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

        let objData = [
            { value: "Hot", func: (any) => { setHotActive(any) } },
            { value: "Food", func: (any) => { setFoodActive(any) } },
            { value: "Drink", func: (any) => { setDrinkActive(any) } },
            { value: "Snack", func: (any) => { setSnackActive(any) } },
            { value: "Dessert", func: (any) => { setDessertActive(any) } },
        ]

        if (filterState !== param) {
            setFilterState(param)
            objData.forEach((val) => {
                if (val.value === param) { val.func(activeStyle) }
                else { val.func({}) }
            })

        } else {
            setFilterState("")
            let idx = objData.findIndex((value) => { return value.value === param })
            objData[idx].func({})
        }

    }

    // useEffect(() => {
    //     if(!account.username) {
    //         navigate("/")
    //     }
    // }, [account])

    // console.log(account)
    return <div className={"dashboard-page"}>
        <Box className="navbar">
            <Box className="navbar-button">
                <FaHouseChimney className="icon" size={"24px"} />
                <Text fontSize={"14px"} color={"gray"} >Home</Text>
            </Box>

            <Box className="navbar-button">
                <BiSolidDashboard className="icon" size={"24px"} />
                <Text fontSize={"14px"} color={"gray"} >Manage</Text>
            </Box>
        </Box>

        <Box className="main-area" width={mainAreaWidth}>
            <Box className="header-area">
                <Text fontSize={"24px"}><span className="bold-text">Order</span> Menu</Text>
                <Text>Hi, {account.username}!</Text>
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
                <FilterButtons className={"active"} icon={<TbFlame size={"40px"} />} name={"Hot"}
                    style={hotActive.main} iconStyle={hotActive.icon}
                    func={() => { filterFunction("Hot") }} />

                <FilterButtons icon={<IoFastFoodOutline size={"40px"} />} name={"Food"}
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
                    func={() => { filterFunction("Dessert") }} />
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
    </div>
}

export default Dashboard;