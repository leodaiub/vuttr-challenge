/**
 *
 * Menu
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box, Link } from '@material-ui/core';
import { Brightness7, Brightness4 } from '@material-ui/icons';
import { changeTheme, selectThemeKey } from 'theme/slice';
import { useDispatch, useSelector } from 'react-redux';
import { saveTheme } from 'theme/utils';
import { LanguageKey } from 'locales/i18n';
import Menus from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TranslateIcon from '@material-ui/icons/Translate';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  handleOpenModal: any;
  authenticated: boolean;
  user: any;
  logout: any;
}
export const Menu = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const theme = useSelector(selectThemeKey);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    saveTheme(theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleLanguageChange = (data: LanguageKey) => {
    i18n.changeLanguage(data);
  };
  return (
    <AppBar position="static" color="transparent">
      <Toolbar variant="dense">
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Link component={RouterLink} to="/" color="secondary">
              <Typography color="secondary" variant="h5">
                VUTTR
              </Typography>
            </Link>
          </Box>
          <Box>
            {props.authenticated ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick1}
                  color="secondary"
                >
                  <Typography variant="button">
                    Olá, {props.user.username}
                  </Typography>
                </Button>
                <Menus
                  id="simple-menu"
                  anchorEl={anchorEl1}
                  keepMounted
                  getContentAnchorEl={null}
                  open={Boolean(anchorEl1)}
                  onClose={handleClose1}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                  <MenuItem
                    onClick={() => {
                      props.logout();
                      handleClose1();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </Menus>
              </>
            ) : (
              <Button onClick={props.handleOpenModal}>Sign In</Button>
            )}

            <Button onClick={() => handleThemeChange()}>
              {theme === 'light' ? <Brightness7 /> : <Brightness4 />}
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="secondary"
            >
              <Box marginRight={1}>
                <TranslateIcon fontSize="small" color="secondary" />
              </Box>
              <Typography variant="button">
                {i18n.language === 'en_US'
                  ? 'English'
                  : i18n.language === 'PT_BR'
                  ? 'Portuguese'
                  : 'Spanish'}
              </Typography>
            </Button>
            <Menus
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleLanguageChange('en_US' as LanguageKey);
                  handleClose();
                }}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLanguageChange('PT_BR' as LanguageKey);
                  handleClose();
                }}
              >
                Português
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleLanguageChange('es' as LanguageKey);
                  handleClose();
                }}
              >
                Español
              </MenuItem>
            </Menus>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});
