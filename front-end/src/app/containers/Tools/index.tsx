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
import { Auth } from '../Auth';
import { selectAuth } from '../Auth/selectors';
import { actions as actionsAuth } from '../Auth/slice';
interface Props {
  history: any;
}

export const Tools = (props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: toolsSaga });
  const tools = useSelector(selectTools, shallowEqual);
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const page = query.get('p') || 0;
  const search = query.get('s') || ' ';
  const searchTagsOnly = query.get('byTags') || false;
  useEffect(() => {
    dispatch(
      actions.loadTools({
        page: page,
        search: search,
        searchTagsOnly,
      }),
    );
    dispatch(actionsAuth.checkAuth());
  }, [searchTagsOnly, search, page, dispatch]);

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

  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authModalTitle, setAuthModalTitle] = React.useState('LOGIN');
  const handleOpenAuthModal = () => {
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleSearch = e => {
    e.preventDefault();

    props.history.push({
      location: '/',
      search: `?p=${query.get('p') || 1}&s=${e.target.search.value}&byTags=${
        e.target.searchTagsOnly.checked
      }`,
    });
    dispatch(actions.loadTools({ search: e.target.search.value }));
  };

  return (
    <>
      <Helmet>
        <title>Tools</title>
        <meta name="description" content="Description of Tools" />
      </Helmet>
      <Menu
        handleOpenModal={handleOpenAuthModal}
        authenticated={auth.authenticated}
        logout={() => dispatch(actionsAuth.logout())}
        user={auth.user}
      />
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
            searchQuery={search}
            searchTagsOnly={searchTagsOnly === 'true'}
            setModalTitle={setModalTitle}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            handleSearch={handleSearch}
          ></ToolsHeader>
          {tools?.tools[0]?.length < 1 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              m={4}
            >
              <Typography variant="h5">
                {t('There is no tool yet, how about you add one?')}
              </Typography>
            </Box>
          )}
          {tools?.tools[0]?.slice(0, 2).map(tool => (
            <Tool
              searchTagsOnly={searchTagsOnly === 'true'}
              searchQuery={search}
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
            color="secondary"
            size="large"
            count={Math.ceil(tools?.tools[1] / 2)}
            page={parseInt(query.get('p') as any, 10) || 1}
            onChange={(evt, value) => {
              props.history.push({
                location: '/',
                search: `?p=${value}&s=${
                  query.get('s') || ' '
                }&byTags=${searchTagsOnly}`,
              });
              dispatch(
                actions.loadTools({
                  page: value > 1 ? value * 2 - 2 : 0,
                  search: query.get('s') || ' ',
                }),
              );
            }}
          />
        </Box>
        <ToolsModal
          error={tools.error}
          loading={tools.loading}
          tool={modalTool}
          title={modalTitle}
          modalOpen={modalOpen}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          createTool={data => dispatch(actions.createTool(data))}
          editTool={data => dispatch(actions.editTool(data))}
        />
        <Auth
          setModalTitle={setAuthModalTitle}
          modalTitle={authModalTitle}
          modalOpen={authModalOpen}
          handleOpenModal={handleOpenAuthModal}
          handleCloseModal={handleCloseAuthModal}
        />
      </Container>
      <div></div>
    </>
  );
};
