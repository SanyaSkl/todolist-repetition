import styles from "./App.module.css"
import { CircularProgress, ThemeProvider } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Header } from "@/common/Components/Header/Header.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { ErrorSnackbar } from "@/common/Components"
import { Routing } from "@/common/routing/Route.tsx"
import { useEffect, useState } from "react"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enum"
import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice.ts"

export const App = () => {
  const [init, setInit] = useState(false)

  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const { data, isLoading } = useMeQuery()
  // useEffect(() => {
  //   dispatch(meTC()).finally(() => {
  //     setInit(true)
  //   })
  // }, [])

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
    setInit(true)
  }, [isLoading])

  if (!init) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

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
