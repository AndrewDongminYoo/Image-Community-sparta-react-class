import React from "react";
import { Grid, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from '../redux/configureStore'
import { apiKey, realtime } from '../shared/Firebase'
import NotiBadge from "./NotiBadge";

const GrayButton = {
    backgroundColor: "#CBCBCB",
    borderRadius: 3,
    width: 80,
    height: 36,
    marginLeft: 10,
    borderWidth: 0.7,
}

const Header = (props) => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user_id = useSelector((state) => state.user.user?.uid)
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(_session_key) ? true : false

    const notiCheck = () => {
        const notiDB = realtime.ref(`noti/${user_id}`)
        notiDB.update({ read: true })
        if (history.location.pathname !== "/notice") history.push('/notice');
    }

    return is_login && is_session
        ? (
            <React.Fragment>
                <Grid is_flex padding="8px 16px" row backgroundColor="#2c2c2c">
                    <Grid row _onClick={() => {
                        history.push('/')
                    }}>
                        <Text margin="0px" size="24px" color="white" bold>꼬스타</Text>
                    </Grid>
                    <Grid is_flex row justify="flex-end" position="relative">
                        <Button
                            containerStyle={GrayButton}
                            text="내 정보"
                            _onClick={() => {
                                history.push('/mypage')
                            }} />
                        <NotiBadge>
                            <Button
                                containerStyle={GrayButton}
                                text="알림"
                                _onClick={() => notiCheck()} />
                        </NotiBadge>
                        <Button
                            containerStyle={GrayButton}
                            text="로그아웃"
                            _onClick={() => {
                                dispatch(userActions.logOut())
                                sessionStorage.removeItem(_session_key)
                            }} />
                    </Grid>
                </Grid>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Grid is_flex row padding="8px 16px" backgroundColor="#2c2c2c">
                    <Grid is_flex row _onClick={() => {
                        history.push('/')
                    }}>
                        <Text margin="0px" size="24px" color="white" bold>꼬리스타그램</Text>
                    </Grid>
                    <Grid is_flex row justify="flex-end">
                        <Button
                            containerStyle={GrayButton}
                            text="로그인"
                            _onClick={() => {
                                history.push('/login')
                            }}
                        />
                        <Button
                            containerStyle={GrayButton}
                            text="회원가입"
                            _onClick={() => {
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