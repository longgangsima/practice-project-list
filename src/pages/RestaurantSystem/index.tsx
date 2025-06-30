import { useState } from 'react';
import ProjectLayout from '../../components/ProjectLayout';
import { Order } from '../../types';
import OrderCard from './component/OrderCard';
import orders from './data/orders.json';
import './styles/basic.css';
export default function RestaurantSystem() {
  const [orderList, setOrderList] = useState<Order[]>(orders);

  return (
    <ProjectLayout currentPath="/restaurant-system">
      <div className="order-list">
        <h2>Order Process</h2>
        {orderList.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ProjectLayout>
  );
}
