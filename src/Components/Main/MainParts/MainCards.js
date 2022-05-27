import React from 'react';
import {Grid, Text, Button, Image} from "../../elements/index"
import ProgressBar from "../../elements/main/ProgressBar"
import Agree from "../../assets/Agree.png";
import Denial from "../../assets/Denial.png";


const MainCards = () => {
    return(
        <Grid
        width="404px"
        // max-width="404px"
        height="316px"
        borderRadius="40px"
        border="1px solid #767676"
        padding="24px"
        >
            <Grid
            padding="10px 30px"
            height="80px"
            is_flex="true"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="space-between"
            >
                <Button
                width="74px"
                height="34px"
                >

                </Button>
                <Grid
                is_flex="true"
                flexDirection="row"
                alignItems="center"
                width="55px"
                >
                    <Image
                    width="24px"
                    height="24px"
                    />
                    <Text
                    size="14px"
                    >
                        {/* {users} */}
                        45
                    </Text>
                </Grid>
            </Grid>
            <Grid
            height="100px"
            is_flex="true"
            flexDirection="row"
            //  alignItems="center"
            justifyContent="center"
            padding="0 25px"
            >
                <Text
                bold="700"
                size="20px"
                textAlign="center"
                >
                    가석방 없는 종신형 제도를 도입하여야 한다.
                </Text>
            </Grid>   
            <Grid
            width="80%"
            height="35px"
            is_flex="true"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            margin="0 auto"
            >
                <Grid
                width= "60px"
                height= "60px"
                boxSizing="0px"
                >
                    <Image 
                    shape="rectangle"
                    width= "60px"
                    src={Agree}/>
                    <Text
                    textAlign="center"
                    >
                        {userAgree}
                    </Text>
                </Grid>
                <Grid
                height="14px"
                is_flex="true"
                alignSelf="center"
                >
                    <ProgressBar/>  
                </Grid>
                <Grid
                shape="rectangle"
                width= "60px"
                height= "60px"
                boxSizing="0px"
                >
                    <Image
                    shape="rectangle"
                    width= "60px"
                    src={Denial}/>
                    <Text
                    textAlign="center"
                    >
                        {userDenied}
                    </Text>
                </Grid>
            </Grid>   
        </Grid>
    )
}

export default MainCards;