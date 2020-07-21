/**
 *
 * ToolsModal
 *
 */
import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import ChipInput from 'material-ui-chip-input';

interface Props {
  handleOpenModal: any;
  handleCloseModal: any;
  createTool: any;
  editTool: any;
  modalOpen: boolean;
  title: string;
  tool?: any;
  loading?: boolean;
  error?: any;
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

interface Tool {
  id: number;
  title: string;
  link: string;
  description: string;
  tags: any[];
}

export const ToolsModal = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [formState, setFormState] = useState<Tool>({
    id: props.tool.id,
    title: props.tool.title,
    link: props.tool.link,
    description: props.tool.description,
    tags: props.tool.tags,
  });

  useEffect(() => {
    setFormState({
      id: props.tool.id,
      title: props.tool.title,
      link: props.tool.link,
      description: props.tool.description,
      tags: props.tool.tags || [],
    });
    console.log(props.tool);
  }, [props.tool]);

  const handleSubmit = () => {
    if (props.title === 'Edit')
      props.editTool({ id: props.tool.id, data: formState });
    else props.createTool(formState);
    if (!props.loading && !props.error) props.handleCloseModal();
    setFormState({
      id: 0,
      title: '',
      link: '',
      description: '',
      tags: [],
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
            <Typography>{props.title} TOOL</Typography>
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
              id="title"
              label="Título"
              variant="filled"
              margin="dense"
              fullWidth
              value={formState.title || props.tool?.title}
              onChange={e =>
                setFormState({ ...formState, title: e.target?.value })
              }
            />
            <TextField
              id="link"
              label="Link"
              variant="filled"
              margin="dense"
              fullWidth
              value={formState.link || props.tool?.link}
              onChange={e =>
                setFormState({ ...formState, link: e.target.value })
              }
            />
            <TextField
              id="description"
              label="Descriçao"
              variant="filled"
              margin="dense"
              fullWidth
              value={formState.description || props.tool?.description}
              onChange={e =>
                setFormState({
                  ...formState,
                  description: e.target.value,
                })
              }
            />

            <ChipInput
              id="tags"
              variant="filled"
              label="Tags"
              fullWidth
              margin="dense"
              value={formState.tags || props.tool?.tags || []}
              onAdd={chip =>
                setFormState({
                  ...formState,
                  tags: [...formState.tags, chip],
                })
              }
              onDelete={(chip, index) =>
                setFormState({
                  ...formState,
                  tags: formState.tags.filter(tag => tag !== chip),
                })
              }
            />
            <Box width="100%" marginTop={1}>
              <Button onClick={handleSubmit} fullWidth variant="contained">
                {props.loading ? <CircularProgress /> : props.title}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </div>
  );
};
