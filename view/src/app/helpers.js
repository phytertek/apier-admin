import React from 'react';
import DownloadNetwork from 'mdi-material-ui/DownloadNetwork';
import Network from 'mdi-material-ui/Network';
import CloseNetwork from 'mdi-material-ui/CloseNetwork';
import UploadNetwork from 'mdi-material-ui/UploadNetwork';
import PlusNetwork from 'mdi-material-ui/PlusNetwork';
import HelpNetwork from 'mdi-material-ui/HelpNetwork';
import AccountNetwork from 'mdi-material-ui/AccountNetwork';
import Routes from 'mdi-material-ui/Routes';
import Puzzle from 'mdi-material-ui/Puzzle';
import TableLarge from 'mdi-material-ui/TableLarge';
import CodeBrackets from 'mdi-material-ui/CodeBrackets';
import Alphabetical from 'mdi-material-ui/Alphabetical';
import Numeric from 'mdi-material-ui/Numeric';
import Fingerprint from 'mdi-material-ui/Fingerprint';
import Lock from 'material-ui-icons/Lock';
import GoogleController from 'mdi-material-ui/GoogleController';
import Settings from 'mdi-material-ui/Settings';
import CodeBraces from 'mdi-material-ui/CodeBraces';
import Upload from 'mdi-material-ui/Upload';
import Download from 'mdi-material-ui/Download';
import Build from 'material-ui-icons/Build';
import BorderTop from 'material-ui-icons/BorderTop';
import TruckFast from 'mdi-material-ui/TruckFast';
import InformationOutline from 'mdi-material-ui/InformationOutline';
import Add from 'material-ui-icons/Add';
import Home from 'material-ui-icons/Home';
import Menu from 'material-ui-icons/Menu';

export const truncateText = (str, len = 40) => {
  return str.length > len ? `${str.substr(0, len - 3)}...` : str;
};

export const appIcons = {
  home: <Home />,
  menu: <Menu />,
  add: <Add />,
  info: <InformationOutline />,
  setting: <Settings />,
  component: <Puzzle />,
  service: <TruckFast />,
  common: <Build />,
  controller: <GoogleController />,
  schema: <TableLarge />,
  schemaString: <Alphabetical />,
  schemaNumber: <Numeric />,
  schemaArray: <CodeBrackets />,
  schemaObject: <CodeBraces />,
  schemaRequired: <Lock />,
  schemaUnique: <Fingerprint />,
  route: <Routes />,
  routeGet: <DownloadNetwork />,
  routeHead: <HelpNetwork />,
  routePost: <PlusNetwork />,
  routePatch: <UploadNetwork />,
  routeDelete: <CloseNetwork />,
  routeAuthorized: <AccountNetwork />,
  routeMiddleware: <Network />,
  routeHeader: <BorderTop />,
  routeReq: <Upload />,
  routeRes: <Download />
};

export const getFieldIcon = field => {
  if (Array.isArray(field)) return appIcons.schemaArray;
  else if (field.type === 'String') return appIcons.schemaString;
  else if (field.type === 'Number') return appIcons.schemaNumber;
};

export const getRouteIcon = verb => {
  switch (verb) {
    case 'head':
      return appIcons.routeHead;
    case 'post':
      return appIcons.routePost;
    case 'patch':
      return appIcons.routePatch;
    case 'delete':
      return appIcons.routeDelete;
    default:
      return appIcons.routeGet;
  }
};
