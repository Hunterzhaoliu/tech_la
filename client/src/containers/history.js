// file is to be able to use history.push in action files
// https://github.com/ReactTraining/react-router/issues/3498

// this link shows how to remove import warning
// https://stackoverflow.com/questions/55466802/react-requirehistory-createbrowserhistory-instead-of-requirehistory-crea
import { createBrowserHistory } from "history";
export default createBrowserHistory();
