import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import FormOrder from './components/FormOrder';
import OrderCard from './components/OrderCard';
import RestaurantRequirements from './components/RestaurantRequirements';
import optionData from './data/optionData.json';
import orders from './data/orders.json';
import './styles/basic.css';
import { Order } from './types';
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
    <ProjectDetailLayout
      currentPath="/restaurant-system"
      projectRequirements={<RestaurantRequirements />}
    >
      <div className="create-order">
        <FormOrder onAdd={handleOrderCreation} optionData={optionData} />
      </div>
      <div className="order-list">
        <h2>Order Process</h2>
        {orderList.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ProjectDetailLayout>
  );
}
