export default function OrderTable( { order } ) {
    return (
        <table className="table table-zebra">
                {/* head */}
                <thead>
                <th><div className="text-lg">{order.first_name} {order.last_name}</div></th>
                  <tr>
                    <th><div className="text-lg font-bold">{order.pickup_date.slice(0,10)}</div></th>
                    <th><div className="text-lg font-bold">{order.pickup_time}</div></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>Type</th>
                    <td>{order.cake_type}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>Size</th>
                    <td>{order.cake_size}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>Cake Flavor</th>
                    <td>{order.cake_flavor === "other" ? order.write_in_cake_flavor : order.cake_flavor}</td>
                  </tr>
                  <tr>
                    <th>Filling Flavor</th>
                    <td>{order.filling_flavor}</td>
                  </tr>
              
                  {/* row 1 */}
                  <tr>
                    <th>Frosting Flavor</th>
                    <td>{order.frosting_flavor === "other" ? order.write_in_frosting_flavor : order.frosting_flavor}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>Frosting Type</th>
                    <td>{order.frosting_type}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>Filling Type</th>
                    <td>{order.filling_type === 'other' ? order.other : order.filling_type}</td>
                  </tr>
                   {/* row 1 */}
                  {order.glitter_cherries ? <tr>
                    <th>Glitter Cherries</th>
                  </tr> : <></>}
                  {/* row 2 */}
                  {order.bows ? <tr>
                    <th>bows</th>
                  </tr> : <></>}
                  {/* row 3 */}
                  {order.disco_balls ? <tr>
                    <th>Disco Balls</th>
                  </tr> : <></>}
                  {order.fresh_fruit ? <tr>
                    <th>Fresh Fruit</th>
                  </tr> : <></>}
                  <tr>
                    <th>Quote</th>
                    <td>{order.quote}</td>
                  </tr>
                </tbody>
              </table>
    )
}