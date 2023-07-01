import * as React from 'react';

class ComponentToPrint extends React.Component {
   render() {
      return (
         <table className="testClass">
            <thead>
               <tr>
                  <td>HÓA ĐƠN</td>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Mã đơn hàng: sdkjbv</td>
                  <td></td>
               </tr>
               <tr>
                  <td>Tên khách hàng: abc</td>
                  <td></td>
               </tr>
               <tr>
                  <td>Dynamic Content From Prop</td>
                  <td>Custom Text Here</td>
               </tr>
            </tbody>
         </table>
      );
   }
}

export { ComponentToPrint };
