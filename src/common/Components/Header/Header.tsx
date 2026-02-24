import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/common/theme/theme.ts";
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import {NavButton} from '@/Styles/NavButton.ts';
import {containerSx} from '@/Styles/TodolistItem.styles.ts';
import Container from "@mui/material/Container";
import {changeThemeModeAC} from "@/app/app-reducer.ts";


export const Header = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth={'lg'} sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color='default' onChange={changeMode} checked={themeMode === 'dark'}/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}


