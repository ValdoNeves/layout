//responsavel por ser o formulario
import {
  Button,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCustomerById } from '../../../lib/api/customers';
import LayoutWithMenu from '../../layout/LayoutWithMenu/LayoutWithMenu';
import FormLoadingComponent from '../../screen/FormLoading/FormLoading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
    },
    form: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(3),
    },
    submit: {
      marginTop: theme.spacing(2),
    },
  })
);

interface IFormData {
  name?: string;
  email?: string;
}

export default function EditCustomer() {
  const classes = useStyles();
  const [title, setTitle] = useState('Novo Cliente');
  const router = useRouter();
  const { id } = router.query;

  


  useEffect(() =>{
    if(id){
      setTitle(`Editando o cliente: ${0}`)
    }
  }, [])

  return (
    <LayoutWithMenu>
      <Container>
        <div className={classes.toolbar}>
          <Link href="/customers" passHref>
            <IconButton aria-label="Voltar">
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Typography component="h1" variant="h4">{title}</Typography>
        </div>
      </Container>
    </LayoutWithMenu>
  );
}
