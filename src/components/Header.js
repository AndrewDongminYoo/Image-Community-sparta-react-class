import React from "react";
import { Grid, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from '../redux/configureStore'
import { apiKey } from '../shared/Firebase'

const GrayButton = {
    backgroundColor:"#CBCBCB",
    borderRadius: 3,
    width: 80,
    height: 36,
    marginLeft: 10,
    borderWidth: 0.7,
}

const Badge = {
    backgroundColor: "#FF5C28",
    textAlign: "center",
    lineHeight: 0.25,
    width: 25,
    height: 25,
    borderRadius: 25,
    left: 250,
    top: 0,
    position: "absolute",
    fontSize: 8,
}

const Header = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key) ? true : false
    const notice = useSelector((state) => state.post.unread);

    return is_login && is_session
    ? (
        <React.Fragment>
            <Grid is_flex padding="8px 16px" row>
                <Grid row>
                    <Text margin="0px" size="24px" bold>꼬스타</Text>
                </Grid>
                <Grid is_flex row reverse>
                    <Button
                        containerStyle={GrayButton}
                        text="로그아웃"
                        _onClick={() => {
                            dispatch(userActions.logOut())
                            sessionStorage.removeItem(_session_key)
                    }}/>
                    <Button
                        position="relative"
                        containerStyle={GrayButton}
                        text="알림"
                        _onClick={() => {
                            history.push('/notice')
                    }}/>
                    {notice ? <Button containerStyle={Badge} text={notice}/> : null}
                    <Button containerStyle={GrayButton} text="내 정보" />

                </Grid>
            </Grid>
        </React.Fragment>
    ) : (
        <React.Fragment>
            <Grid is_flex row padding="8px 16px">
                <Grid is_flex row>
                    <Text margin="0px" size="24px" bold>꼬리스타</Text>
                </Grid>
                <Grid is_flex row reverse>
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