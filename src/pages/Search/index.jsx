import ReactToPrint from 'react-to-print';
import * as React from 'react';

import { ComponentToPrint } from './ComponentToPrint';
import { useCallback, useEffect, useRef, useState } from 'react';

function Search() {
   const componentRef = useRef(null);

   const onBeforeGetContentResolve = useRef(null);

   const [loading, setLoading] = useState(false);
   const [text, setText] = useState('old boring text');

   const handleAfterPrint = useCallback(() => {
      console.log('`onAfterPrint` called');
   }, []);

   const handleBeforePrint = useCallback(() => {
      console.log('`onBeforePrint` called');
   }, []);

   const handleOnBeforeGetContent = useCallback(() => {
      console.log('`onBeforeGetContent` called');
      setLoading(true);
      setText('Loading new text...');

      return new Promise((resolve) => {
         onBeforeGetContentResolve.current = resolve;

         setTimeout(() => {
            setLoading(false);
            setText('New, Updated Text!');
            resolve();
         }, 2000);
      });
   }, [setLoading, setText]);

   useEffect(() => {
      if (text === 'New, Updated Text!' && typeof onBeforeGetContentResolve.current === 'function') {
         onBeforeGetContentResolve.current();
      }
   }, [onBeforeGetContentResolve.current, text]);

   const reactToPrintContent = useCallback(() => {
      return componentRef.current;
   }, [componentRef.current]);

   const reactToPrintTrigger = useCallback(() => {
      // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
      // to the root node of the returned component as it will be overwritten.

      // Bad: the `onClick` here will be overwritten by `react-to-print`
      // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

      // Good
      return <button>Print using a Functional Component</button>;
   }, []);

   return (
      <div>
         <ReactToPrint
            content={reactToPrintContent}
            documentTitle="AwesomeFileName"
            onAfterPrint={handleAfterPrint}
            onBeforeGetContent={handleOnBeforeGetContent}
            onBeforePrint={handleBeforePrint}
            removeAfterPrint
            trigger={reactToPrintTrigger}
         />
         {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
         <ComponentToPrint ref={componentRef} text={text} />
      </div>
   );
}

export default Search;
