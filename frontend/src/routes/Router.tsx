import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ReactElement } from "react";
import { paths } from "@utils/paths";
import { ContentWrapper } from "./ContentWraper/ContentWraper";

const Root = lazy(() => import("./Root/Root"));
const About = lazy(() => import("./About/About"));
const Send = lazy(() => import("./Send/Send"));

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
