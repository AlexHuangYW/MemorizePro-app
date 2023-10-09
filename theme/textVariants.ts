const small: number = 14;
const medium: number = 16;
const large: number = 20;
const xLarge: number = 30;
const xxLarge: number = 35;

export const textVariants = {
    defaults: {
        color: "white",
        fontSize: medium,
        fontWeight: '700',
        textAlign: "center",      
    },
    title: {
        fontSize: xxLarge,
        color: "blue",
        padding: "m",
    },
    header: {
        fontSize: large,
        color: "black",
        padding: "m",

    },
    body: {
        color: "black",
        fontSize: medium,
    },
    smallBody: {
        color: "black",
        fontSize: small,
        fontWeight: '500',
    },
    button_primary: {
        fontSize: 16,
        color: "white",
    },
    button_secondary: {
        fontSize: 16,
        color: "black",

    }
  
}