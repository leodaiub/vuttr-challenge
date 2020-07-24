/**
 *
 * Auth
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectAuth } from './selectors';
import { authSaga } from './saga';
import { AuthModal } from 'app/components/AuthModal';

interface Props {
  handleOpenModal: any;
  handleCloseModal: any;
  modalTitle: string;
  modalOpen: boolean;
  setModalTitle: any;
}

export const Auth = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = useSelector(selectAuth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* <Helmet>
        <title>Auth</title>
        <meta name="description" content="Description of Auth" />
      </Helmet> */}
      <div>{t('')}</div>
      <AuthModal
        error={auth.error}
        loading={auth.loading}
        setModalTitle={props.setModalTitle}
        title={props.modalTitle}
        modalOpen={props.modalOpen}
        handleOpenModal={props.handleOpenModal}
        handleCloseModal={props.handleCloseModal}
        login={data => dispatch(actions.login(data))}
        register={data => dispatch(actions.register(data))}
      />
    </>
  );
});
