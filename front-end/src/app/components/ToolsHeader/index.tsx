/**
 *
 * ToolsHeader
 *
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 250,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);
interface Props {
  handleOpenModal: any;
  handleCloseModal: any;
  setModalTitle: any;
  handleSearch: any;
}

export function ToolsHeader(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={props.handleSearch}
      >
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          name="search"
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button
        variant="contained"
        onClick={() => {
          props.handleOpenModal();
          props.setModalTitle('CREATE');
        }}
      >
        {' '}
        <Add />
        Add
      </Button>
    </Box>
  );
}
