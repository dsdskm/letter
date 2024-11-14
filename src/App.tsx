import { ROUTE_CONTENTS_EDIT_VIEW } from 'common/constants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContentsEditView from 'views/contents/ContentsEditView';
import LoginView from 'views/LoginView';
import NotFoundView from 'views/NotFoundView';


function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path={ROUTE_CONTENTS_EDIT_VIEW} element={<ContentsEditView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
