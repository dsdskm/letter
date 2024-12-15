import { ROUTE_CONTENTS } from 'common/constants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContentsView from 'views/contents/ContentsView';
import LoginView from 'views/LoginView';
import NotFoundView from 'views/NotFoundView';
import { isMobile } from "react-device-detect";
import LoginViewMobile from 'views/LoginViewMobile';
import ContentsViewMobile from 'views/contents/ContentsViewMobile';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isMobile ? <LoginViewMobile /> : <LoginView />} />
        <Route path={ROUTE_CONTENTS} element={isMobile ? <ContentsViewMobile /> : <ContentsView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
