import { Box, Button, Text } from "@chakra-ui/react";
import "./style.css"
import { FaTrashCan } from "react-icons/fa6";

const CartItems = (props) => {

    return <Box className="cart-items" marginBottom={"20px"}>

        <Box className="content-wrapper" >
            <img src={props.img} />

            <Box className="item-desc">
                <Text className={"bold-text"} >{props.name}</Text>
                <Text color={"gray"}>Rp. {(props.price.toLocaleString("id"))}</Text>
            </Box>

            <Text >{props.qty}x</Text>

            <Button size={"xs"} onClick={props.func}>
                <FaTrashCan fontSize={"10px"} /></Button>
        </Box>
        <hr></hr>
        <Text className="bold-text" textAlign={"end"} fontSize={"12px"}>Rp. {(props.price * props.qty).toLocaleString("id")}</Text>
    </Box>
}

export default CartItems;