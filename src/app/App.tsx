import styles from "./App.module.css"
import { ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Header } from "@/common/Components/Header/Header.tsx"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/Components"
import { Routing } from "@/common/routing/Route.tsx"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
