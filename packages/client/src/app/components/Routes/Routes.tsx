import { Route, Switch } from "react-router-dom";

import { Suspense, lazy } from "react";
import PageLoader from "../PageLoader";

const ChatLayout = lazy(() => import("domains/chat/layouts/ChatLayout"));
const ChatPage = lazy(() => import("domains/chat/pages/ChatPage"));

function Routes() {
  return (
    <Switch>
      <Route exact path="/chat/:chatId?">
        <Suspense fallback={<PageLoader />}>
          <ChatLayout>
            <ChatPage />
          </ChatLayout>
        </Suspense>
      </Route>
    </Switch>
  );
}

export default Routes;
