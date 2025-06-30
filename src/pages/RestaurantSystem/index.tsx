import { useState } from 'react';
import { ProjectLayout } from '../../components';
import { Order } from '../../types';
import FormOrder from './component/FormOrder';
import OrderCard from './component/OrderCard';
import optionData from './data/optionData.json';
import orders from './data/orders.json';
import './styles/basic.css';
export default function RestaurantSystem() {
  const [orderList, setOrderList] = useState<Order[]>(orders);

  const handleOrderCreation = (order: Order) => {
    setOrderList(preOrderList => {
      const newOrder = [...preOrderList];
      newOrder.push(order);
      return newOrder;
    });
  };

  return (
    <ProjectLayout currentPath="/restaurant-system">
      <div className="create-order">
        <FormOrder onAdd={handleOrderCreation} optionData={optionData} />
      </div>
      <div className="order-list">
        <h2>Order Process</h2>
        {orderList.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ProjectLayout>
  );
}
