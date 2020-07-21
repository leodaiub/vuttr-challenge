/**
 *
 * ToolsHeader
 *
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core';
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
      marginRight: theme.spacing(1),
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
  searchTagsOnly: any;
  searchQuery: any;
}

export function ToolsHeader(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="space-between" marginBottom={2}>
      <Box display="flex" component="form" onSubmit={props.handleSearch}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            name="search"
            defaultValue={props.searchQuery !== ' ' ? props.searchQuery : null}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={props.searchTagsOnly}
              name="searchTagsOnly"
            />
          }
          label="Search tags only?"
        />
      </Box>

      <Button
        variant="contained"
        onClick={() => {
          props.handleOpenModal();
          props.setModalTitle('CREATE');
        }}
        color="secondary"
      >
        {' '}
        <Add />
        Add
      </Button>
    </Box>
  );
}
