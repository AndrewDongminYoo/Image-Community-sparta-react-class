import React from "react";
import { Grid, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from '../redux/configureStore'
import { apiKey } from '../shared/Firebase'

const GrayButton = {
    backgroundColor:"#C4C4C4",
    width: 80,
    height: 40,
    marginLeft: 10
}

const Header = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key) ? true : false

    return is_login && is_session
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
                            dispatch(userActions.logOut())
                            sessionStorage.removeItem(_session_key)
                    }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>헬로</Text>
                </Grid>
                <Grid is_flex width="false">
                    <Button
                        containerStyle={GrayButton}
                        text="로그인"
                        _onClick={()=> {
                            history.push('/login')
                        }}
                    />
                    <Button
                        containerStyle={GrayButton}
                        text="회원가입"
                        _onClick={()=> {
                            history.push('/signup')
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {}

export default Header;