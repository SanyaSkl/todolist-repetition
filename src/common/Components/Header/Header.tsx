import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import { NavButton } from "@/common/Components/NavButton/NavButton.ts"
import Container from "@mui/material/Container"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { containerSx } from "@/common/Styles"
import { getTheme } from "@/common/theme"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice.ts"
import { LinearProgress } from "@mui/material"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <>
      <AppBar position="static" sx={{ mb: "30px" }}>
        <Toolbar>
          <Container maxWidth={"lg"} sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color="default" onChange={changeMode} checked={themeMode === "dark"} />
            </div>
          </Container>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </>
  )
}
