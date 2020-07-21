/**
 *
 * AuthModal
 *
 */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Link,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface Props {
  handleOpenModal: any;
  handleCloseModal: any;
  login: any;
  register: any;
  modalOpen: boolean;
  loading?: boolean;
  error?: any;
  title: string;
  setModalTitle: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '40%',
      [theme.breakpoints.down('sm')]: {
        width: '90%',
      },
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface Auth {
  username: string;
  password: string;
}
export function AuthModal(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const classes = useStyles();
  const [formState, setFormState] = useState<Auth>({
    username: '',
    password: '',
  });
  const handleSubmit = () => {
    if (props.title === 'LOGIN') props.login(formState);
    else props.register(formState);
    if (!props.loading && !props.error) props.handleCloseModal();
    setFormState({
      username: '',
      password: '',
    });
  };
  return (
    <div>
      <Modal
        open={props.modalOpen}
        onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper className={classes.paper}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{props.title}</Typography>
            <IconButton onClick={props.handleCloseModal}>
              <Close />
            </IconButton>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-between"
            m={1}
          >
            <TextField
              id="username"
              label="Username"
              type="username"
              variant="filled"
              margin="dense"
              fullWidth
              value={formState.username}
              onChange={e =>
                setFormState({ ...formState, username: e.target?.value })
              }
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="filled"
              margin="dense"
              fullWidth
              value={formState.password}
              onChange={e =>
                setFormState({ ...formState, password: e.target?.value })
              }
            />
            <Box width="100%" marginTop={1}>
              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                color="secondary"
              >
                {props.loading ? <CircularProgress /> : props.title}
              </Button>
            </Box>
            <Box
              style={{ cursor: 'pointer' }}
              width="100%"
              marginTop={1}
              onClick={() => {
                if (props.title === 'LOGIN') {
                  props.setModalTitle('REGISTER');
                } else {
                  props.setModalTitle('LOGIN');
                }
              }}
            >
              <Typography color="secondary" component={Link} variant="body1">
                {props.title === 'LOGIN'
                  ? 'Dont have an account? Register.'
                  : 'Already have an account? Login.'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
