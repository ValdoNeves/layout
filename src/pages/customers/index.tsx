import {
  Typography,
  Button,
  Theme,
  makeStyles,
  createStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Snackbar,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import LayoutWithMenu from '../../../components/layout/LayoutWithMenu/LayoutWithMenu';
import Link from 'next/link';
import ConfirmationDialog from '../../../components/screen/ConfirmationDialog/ConfirmationDialog';
import React, { useEffect, useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {getCustomers} from '../../../lib/api/customers'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    table: {
      marginTop: theme.spacing(3),
    },
    alerta: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function CustomerList() {
  const classes = useStyles();
  const [rows, setRows] = useState([])

  const [deleteOptions, setDeleteOptions] = useState<{
    show: boolean;
    itemId?: number;
    itemDescription?: string;
  }>({ show: false });

  const [messageInfo, setMessageInfo] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: '' });

  const handleDelete = (item: any) => {
    setDeleteOptions({
      show: true,
      itemId: item.id,
      itemDescription: item.name,
    });
  };

  const handleCloseMessage = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageInfo({ show: false, message: '' });
  };

  //entra nessa funcao quando o usuario ja selecionou alguma das duas opcoes
  const handleDeleteCallBack = (value: string) => {
    const { itemId } = deleteOptions;
    //zera a opcao
    setDeleteOptions({ show: false, itemId: null, itemDescription: null });
    if (value === 'ok') {
      //deletar o item
      //exibir uma mensagem de sucesso
      setMessageInfo({ show: true, message: 'Item exluído com sucesso' });
    }
  };

  useEffect(() =>{
    getCustomers().then((rowsResult) => setRows(rowsResult))
  }, [])

  return (
    <LayoutWithMenu>
      <div className={classes.toolbar}>
        <div>
          <Typography component="h1" variant="h4">
            Clientes
          </Typography>
        </div>
        <div>
          <Link href="/customers/new" passHref>
            <Button variant="contained" color="primary">
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="Clientes">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell width="140" align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(row)}
                  >
                    <Delete />
                  </IconButton>
                  <Link href={`/customers/edit/${row.id}`} passHref>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationDialog
        id={`delete-${deleteOptions.itemId}`}
        title="Excluir"
        confirmButtonText="Excluir"
        keepMounted
        open={deleteOptions.show}
        onClose={handleDeleteCallBack}
      >
        Confirma a exclusão do item{' '}
        <strong>{deleteOptions.itemDescription}</strong>
      </ConfirmationDialog>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={1500}
        open={messageInfo.show}
        message={messageInfo.message}
        key={messageInfo.message}
        onClose={handleCloseMessage}
      >
        <Alert severity="success" onClose={handleCloseMessage}>
          Cliente removido com sucesso!
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </LayoutWithMenu>
  );
}
