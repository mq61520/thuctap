import './OrderBill.css';

function Bill({ list_prod, user_info, total, ship }) {
   return (
      <table className="body-wrap">
         <tbody>
            <tr>
               <td></td>
               <td className="container" width="600">
                  <div className="content">
                     <table className="main" width="100%" cellPadding="0" cellSpacing="0">
                        <tbody>
                           <tr>
                              <td className="content-wrap aligncenter">
                                 <table width="100%" cellPadding="0" cellSpacing="0">
                                    <tbody>
                                       <tr>
                                          <td className="content-block">
                                             <h2>Hóa đơn mua hàng</h2>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">
                                             <table className="invoice">
                                                <tbody>
                                                   <tr>
                                                      <td>
                                                         <table
                                                            className="invoice-items"
                                                            cellPadding="0"
                                                            cellSpacing="0"
                                                         >
                                                            <tbody>
                                                               {list_prod.map((product) => {
                                                                  return (
                                                                     <tr key={product.ma_sp}>
                                                                        <td>{product.sp_ten}</td>
                                                                        <td className="alignright">{}</td>
                                                                     </tr>
                                                                  );
                                                               })}
                                                            </tbody>
                                                         </table>
                                                      </td>
                                                   </tr>
                                                </tbody>
                                             </table>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">Công ty TNHH Tin học Á Châu</td>
                                       </tr>
                                       <tr>
                                          <td className="content-block">41 Lý Tự Trọng, An Phú, Ninh Kiều, Cần Thơ</td>
                                       </tr>
                                    </tbody>
                                 </table>
                              </td>
                           </tr>
                        </tbody>
                     </table>

                     <div className="footer">
                        <table width="100%">
                           <tbody>
                              <tr>
                                 <td className="aligncenter content-block">
                                    Questions? Email <a href="mailto:">support@company.inc</a>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </td>
               <td></td>
            </tr>
         </tbody>
      </table>
   );
}

export default Bill;
