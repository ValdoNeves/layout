import{ Box, Link, Typography, } from "@material-ui/core"

export default function CopyrightComponent(){
  return(
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://valdoneves.ddns.net/" target="_blank">
        Alfa Sense
        </Link>{' 2018 - '}
        {new Date().getFullYear()}
        
      </Typography>
    </Box>
  )
}