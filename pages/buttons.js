import React from 'react';
import styled from 'styled-components';
import {
  Button,
  FloatingActionButton,
  GridList,
  GridTile,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Snackbar,
  ThemeProvider,
  withRipple,
} from '../src';
import { StarBorderIcon, StarIcon, KeyboardArrowUpIcon } from '../src/icons/icons';

const RippleButton = withRipple(Button);
const RippleFab = withRipple(FloatingActionButton);

const PlusIcon = (
  <svg viewBox="0 0 24 24" style={{ fill: '#fff', height: '24px', width: '24px' }}>
    <path fill="#FFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
);

class ButtonsPage extends React.PureComponent {
  state = {
    showSnackbar: false,
  };

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  };

  handleClose = () => {
    this.setState({ showSnackbar: false });
  };

  render() {
    return (
      <ThemeProvider theme={{ primary: '#03A9F4' }}>
        <div className={this.props.className}>
          <h1>Flat Buttons</h1>
          <GridList>
            <ListItem>
              <Button onClick={this.showSnackbar}>Flat</Button>
            </ListItem>
            <ListItem>
              <Button primary>Primary</Button>
            </ListItem>
            <ListItem>
              <Button accent>Accent</Button>
            </ListItem>
            <ListItem>
              <Button disabled primary onClick={this.showSnackbar}>
                Disabled
              </Button>
            </ListItem>
            <ListItem>
              <RippleButton primary>Ripple</RippleButton>
            </ListItem>
          </GridList>

          <h1>Raised Buttons</h1>
          <GridList>
            <ListItem>
              <Button raised onClick={this.showSnackbar}>
                Raised
              </Button>
            </ListItem>
            <ListItem>
              <Button raised primary>
                Primary
              </Button>
            </ListItem>
            <ListItem>
              <Button raised accent>
                Accent
              </Button>
            </ListItem>
            <ListItem>
              <Button raised disabled primary onClick={() => alert('This should not fire')}>
                Disabled
              </Button>
            </ListItem>
            <ListItem>
              <RippleButton raised primary>
                Ripple
              </RippleButton>
            </ListItem>
          </GridList>

          <h1>Floating Action Buttons</h1>
          <GridList>
            <ListItem>
              <FloatingActionButton raised primary onClick={this.showSnackbar}>
                {PlusIcon}
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <FloatingActionButton mini raised primary>
                {PlusIcon}
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <FloatingActionButton raised accent>
                <StarBorderIcon style={{ fill: '#fff' }} />
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <FloatingActionButton mini raised accent>
                <StarBorderIcon style={{ fill: '#fff' }} />
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <FloatingActionButton
                raised
                disabled
                primary
                onClick={() => alert('This should not fire')}
              >
                <KeyboardArrowUpIcon style={{ fill: '#fff' }} />
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <FloatingActionButton
                mini
                raised
                disabled
                primary
                onClick={() => alert('This should not fire')}
              >
                <KeyboardArrowUpIcon style={{ fill: '#fff' }} />
              </FloatingActionButton>
            </ListItem>
            <ListItem>
              <RippleFab raised primary>
                <StarIcon style={{ fill: '#fff' }} />
              </RippleFab>
            </ListItem>
          </GridList>
          <GridList>
            <GridTile>
              <List>
                <ListSubheader>Props</ListSubheader>
                <ListItem>
                  <ListItemText
                    primary="primary"
                    secondary="Sets the button to the active color theme's primary color."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="accent"
                    secondary="Sets the button to the active color theme's accent color."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="raised"
                    secondary="Raised buttons have solid backgrounds and are elevated."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="disabled" secondary="Disables the button." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="mini" secondary="A smaller sized FloatingActionButton." />
                </ListItem>
              </List>
            </GridTile>
            <GridTile>
              <List>
                <ListSubheader>Decorators</ListSubheader>
                <ListItem>
                  <ListItemText
                    primary="withRipple (HOC)"
                    secondary="Adds ripple effect on button press."
                  />
                </ListItem>
              </List>
            </GridTile>
          </GridList>
        </div>
        <Snackbar
          open={this.state.showSnackbar}
          message="You did it!"
          autoHideDuration={1000}
          onRequestClose={this.handleClose}
        />
      </ThemeProvider>
    );
  }
}

const StyledButtonsPage = styled(ButtonsPage)`
  padding: 30px;

  & button {
    margin: 16px;
  }
`;

export default StyledButtonsPage;
