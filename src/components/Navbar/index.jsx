import { FaHouseChimney } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate("")

    return <Box className="navbar">
        <Box className="navbar-button" onClick={() => { navigate("/dashboard") }} >
            <FaHouseChimney className="icon" size={"27px"} />
            <Text fontSize={"14px"} color={"gray"} >Home</Text>
        </Box>

        <Box className="navbar-button" onClick={() => { navigate("/manage/product") }} >
            <BiSolidDashboard className="icon" size={"27px"} />
            <Text fontSize={"14px"} color={"gray"} >Manage</Text>
        </Box>

        <Box className="navbar-button" onClick={() => { navigate("/manage/account") }} >
            <MdAccountBox className="icon" size={"27px"} />
            <Text fontSize={"14px"} color={"gray"} >Account</Text>
        </Box>
    </Box>
}

export default Navbar;