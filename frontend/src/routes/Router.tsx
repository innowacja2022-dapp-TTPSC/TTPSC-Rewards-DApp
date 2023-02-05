import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContentWrapper } from "./ContentWraper/ContentWraper";

const Root = lazy(() => import("./Root/Root"));
const About = lazy(() => import("./About/About"));
const Send = lazy(() => import("./Send/Send"));
const Vote = lazy(() => import("./Vote/Vote"));
const Admin = lazy(() => import("./Admin/Admin"));

export const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ContentWrapper />}>
          <Route
            element={
              <Suspense fallback={null}>
                <Root />
              </Suspense>
            }
            path={paths.root}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Send />
              </Suspense>
            }
            path={paths.send}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <About />
              </Suspense>
            }
            path={paths.about}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Vote />
              </Suspense>
            }
            path={paths.vote}
          />
          <Route
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
            path={paths.admin}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
