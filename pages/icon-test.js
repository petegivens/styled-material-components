import { Icon } from '../src/icons';
import ArrowBackPath from '../src/icons/ArrowBack';
import { ArrowBackIcon } from '../src/icons';

export default () => (
  <div>
    <h1> Icon Test Page </h1>
    <Icon>
      <ArrowBackPath />
    </Icon>
    <Icon fill="red" icon="arrow_back" />
    <ArrowBackIcon size={40} fill={'pink'} />
  </div>
);
