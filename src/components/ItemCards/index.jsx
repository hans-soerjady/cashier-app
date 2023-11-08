import "./style.css"
import { Card, Text, Heading, Box } from '@chakra-ui/react'

const ItemCards = (props) => {

    return <Card className="item-cards" onClick={props.func}>
        <Box className="item-cards-img">
            <img src={props.img}  />
        </Box>

        <Box className="item-cards-content">
            <Heading fontSize={"md"}>{props.itemName}</Heading>

            <Text fontSize={"sm"}>{"Rp. " + parseInt(props.itemPrice).toLocaleString("id")}</Text>
        </Box>
    </Card>
}

export default ItemCards;