import { Fragment } from 'react';
import { BrowserRouter as BRouter, Routes, Route } from 'react-router-dom';
import { allPages } from '../src/routes/index';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <BRouter>
         <Routes>
            {allPages.map((page, index) => {
               const Page = page.component;

               let Layout = DefaultLayout;

               if (page.layout) {
                  Layout = page.layout;
               } else if (page.layout === null) {
                  Layout = Fragment;
               }

               return (
                  <Route
                     key={index}
                     path={page.path}
                     element={
                        <Layout>
                           <Page />
                        </Layout>
                     }
                  />
               );
            })}
         </Routes>
      </BRouter>
  )
}

export default App
