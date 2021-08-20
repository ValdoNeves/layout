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
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import LayoutWithMenu from '../../../components/layout/LayoutWithMenu/LayoutWithMenu';
import Link from 'next/link';
import ConfirmationDialog from '../../../components/screen/ConfirmationDialog/ConfirmationDialog';
import { useState } from 'react';

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
  })
);

export default function CustomerList() {
  const classes = useStyles();

  const [deleteOptions, setDeleteOptions] = useState<{
    show: boolean;
    itemId?: number;
    itemDescription?: string;
  }>({ show: false });
  
  
  const handleDelete = (item: any) => {
    setDeleteOptions({
      show: true,
      itemId: item.id,
      itemDescription: item.name
    })
  }



  //entra nessa funcao quando o usuario ja selecionou alguma das duas opcoes
  const handleDeleteCallBack = (value: string) => {
    const {itemId} = deleteOptions
    //zera a opcao 
    setDeleteOptions({ show: false, itemId: null, itemDescription: null})
    if(value === 'ok'){
      //deletar o item

      //exibir uma mensagem de sucesso
    }
  }

  const rows = [
    { id: 1, name: 'Luke Skywalker', email: 'luke@starwars.com' },
    { id: 2, name: 'R2-D2', email: 'r2d2@starwars.com' },
    { id: 3, name: 'Darth Vader', email: 'vader@starwars.com' },
    { id: 4, name: 'Leia Organa', email: 'leia@starwars.com' },
    { id: 5, name: 'Owen Lars', email: 'owen@starwars.com' },
  ];

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

    </LayoutWithMenu>
  );
}
