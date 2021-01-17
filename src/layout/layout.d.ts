import { RouteConfigComponentProps } from 'react-router-config';

interface IRouteProps {
  history: RouteConfigComponentProps['history'];
  pathname: RouteConfigComponentProps['location']['pathname'];
}
