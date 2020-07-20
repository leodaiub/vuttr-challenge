/**
 *
 * Tool
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Typography, makeStyles, Box } from '@material-ui/core';
import { Close } from '@material-ui/icons';

interface Props {
  tool: any;
  handleOpenModal: any;
  handleCloseModal: any;
  setModalTool: any;
  setModalTitle: any;
  deleteTool: any;
}
const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
}));

export const Tool = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Card
        onClick={() => {
          props.setModalTool(props.tool);
          props.handleOpenModal();
          props.setModalTitle('Edit');
        }}
        key={props.tool.id}
        raised
        className={classes.card}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box fontWeight={900} marginBottom={1}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={props.tool.link}
              >
                <Typography color="secondary" variant="h4" component="h4">
                  {props.tool.title}
                </Typography>
              </a>
            </Box>
            <Button
              color="primary"
              onClick={e => {
                e.stopPropagation();
                props.deleteTool(props.tool.id);
              }}
            >
              <Close fontSize="small" /> remove
            </Button>
          </Box>
          <Typography variant="body2" component="p">
            {props.tool.description}
          </Typography>
          <Box width="50" fontWeight={900} marginTop={2} display="flex">
            {props.tool.tags.map((tag: string) => (
              <Box key={tag} marginRight={1}>
                {' '}
                #{tag}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
});
