import "./style.css"
import { Card, Text, Box } from "@chakra-ui/react"

const FilterButtons = (props) => {

    return <Card className={"filter-button"} cursor={"pointer"}
        style={props.style}>
        <Box className="icon"
            onClick={props.func}
            style={props.iconStyle}>
            {props.icon}
        </Box>
        <Text className="text" fontSize={"md"}>{props.name}</Text>
    </Card>
}

export default FilterButtons;