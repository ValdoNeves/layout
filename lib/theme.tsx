import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// // Create a theme instance. padrao
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });


const theme = createTheme({
  breakpoints:{
    values:{
      xs: 0,
      sm: 640,
      md: 762,
      lg: 1024,
      xl: 1280,
    },
  },
  typography:{
    fontSize: 16,
  },
})

export default theme;
