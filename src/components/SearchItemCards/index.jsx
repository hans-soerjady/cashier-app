import { Box, Text } from "@chakra-ui/react";
import "./style.css";

const SearchItemCards = (props) => {

    return <Box className="search-item-cards" onClick={props.func}>
        <img src={props.img} />
        <Box>
            <Text className="bold-text" fontSize={"14px"}>{props.name}</Text>
            <Text fontSize={"13px"} color={"gray"}>Rp. {(props.price).toLocaleString("id")}</Text>
        </Box>
    </Box>
}

export default SearchItemCards;