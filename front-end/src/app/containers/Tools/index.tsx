/**
 *
 * Tools
 *
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectTools } from './selectors';
import { toolsSaga } from './saga';

import Typography from '@material-ui/core/Typography';

import { Container, Box } from '@material-ui/core';
import { Menu } from 'app/components/Menu';
import { Tool } from 'app/components/Tool';
import Pagination from '@material-ui/lab/Pagination';
import { useLocation } from 'react-router-dom';
import { ToolsHeader } from 'app/components/ToolsHeader';
import { ToolsModal } from 'app/components/ToolsModal';
interface Props {
  history: any;
}

export const Tools = (props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: toolsSaga });
  const tools = useSelector(selectTools, shallowEqual);

  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const page = query.get('page') || 0;
  const search = query.get('search') || ' ';
  useEffect(() => {
    dispatch(
      actions.loadTools({
        page: page,
        search: search,
      }),
    );
  }, [search, page, dispatch]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalTool, setModalTool] = React.useState({});
  const [modalTitle, setModalTitle] = React.useState('');
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalTool({});
    setModalTitle('');
  };

  const handleSearch = e => {
    e.preventDefault();

    props.history.push({
      location: '/',
      search: `?page=${query.get('page') || 1}&search=${e.target.search.value}`,
    });
    dispatch(actions.loadTools({ search: e.target.search.value }));
  };

  return (
    <>
      <Helmet>
        <title>Tools</title>
        <meta name="description" content="Description of Tools" />
      </Helmet>
      <Menu />
      <Container maxWidth="md">
        <Box m={2}>
          <Typography variant="h2" color="textSecondary">
            VUTTR
          </Typography>
          <Typography variant="h4" color="textSecondary">
            Very Useful Tools to Remember
          </Typography>
        </Box>
        <Box width="100%">
          <ToolsHeader
            setModalTitle={setModalTitle}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleSearch={handleSearch}
          ></ToolsHeader>
          {tools?.tools[0]?.slice(0, 2).map(tool => (
            <Tool
              setModalTitle={setModalTitle}
              setModalTool={setModalTool}
              key={tool.id}
              tool={tool}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              deleteTool={data => dispatch(actions.deleteTool(data))}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="center" m={2}>
          <Pagination
            size="large"
            color="secondary"
            count={Math.ceil(tools?.tools[1] / 2)}
            page={parseInt(query.get('page') as any, 10) || 1}
            onChange={(evt, value) => {
              props.history.push({
                location: '/',
                search: `?page=${value}&search=${query.get('search') || ' '}`,
              });
              dispatch(
                actions.loadTools({
                  page: value > 1 ? value * 2 - 2 : 0,
                  search: query.get('search') || ' ',
                }),
              );
            }}
          />
        </Box>
        <ToolsModal
          tool={modalTool}
          title={modalTitle}
          modalOpen={modalOpen}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          createTool={data => dispatch(actions.createTool(data))}
          editTool={data => dispatch(actions.editTool(data))}
        />
      </Container>
      <div></div>
    </>
  );
};
