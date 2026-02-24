import './App.css'
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {Header} from "@/common/Components/Header/Header.tsx";
import {getTheme} from "@/common/theme/theme.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {Main} from "@/app/Main.tsx";


export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
