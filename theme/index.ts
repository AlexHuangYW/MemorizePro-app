import { createTheme } from "@shopify/restyle";
import { colors } from './colors';
import { spacing } from './spacing';
import { textVariants } from './textVariants';

import { buttonVariants } from "./buttonVariants";

const theme = createTheme({
    colors,
    spacing,
    textVariants,
    buttonVariants
})
type ThemeProps = typeof theme;

export { theme, type ThemeProps };