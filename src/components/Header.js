import React, { useState, useEffect } from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from '../shared/Cookie';

const GrayButton = {
    backgroundColor:"#C4C4C4",
    width: 80,
    height: 40,
    marginLeft: 10
}

const Header = (props) => {

    const [isLogIn, setIsLogIn] = useState(false)

    useEffect(()=> {

        let cookie = getCookie("user_id");
        setIsLogIn(cookie ? true : false)

    }, [])

    return isLogIn
    ? (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>헬로</Text>
                </Grid>
                <Grid is_flex width="false">
                    <Button containerStyle={GrayButton} text="내 정보" />
                    <Button containerStyle={GrayButton} text="알림" />
                    <Button
                        containerStyle={GrayButton}
                        text="로그아웃"
                        _onClick={() => {
                        deleteCookie("user_id")
                        deleteCookie("user_pw")
                        setIsLogIn(false)
                    }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    ) :(
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>헬로</Text>
                </Grid>
                <Grid is_flex width="false">
                    <Button containerStyle={GrayButton} text="로그인" />
                    <Button containerStyle={GrayButton} text="회원가입" />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;