import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import FormOrder from './components/FormOrder';
import { FormOrderClean } from './components/FormOrderClean';
import OrderCard from './components/OrderCard';
import RestaurantRequirements from './components/RestaurantRequirements';
import optionData from './data/optionData.json';
import orders from './data/orders.json';
import './styles/basic.css';
import { Order } from './types';

type FormVersion = 'original' | 'clean';

export default function RestaurantSystem() {
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [activeFormVersion, setActiveFormVersion] = useState<FormVersion>('original');

  const handleOrderCreation = (order: Order) => {
    setOrderList(preOrderList => {
      const newOrder = [...preOrderList];
      newOrder.push(order);
      return newOrder;
    });
  };

  const FormVersionTabs = () => (
    <div className="form-version-tabs">
      <button
        className={`tab-button ${activeFormVersion === 'original' ? 'active' : ''}`}
        onClick={() => setActiveFormVersion('original')}
      >
        📝 Original Form
      </button>
      <button
        className={`tab-button ${activeFormVersion === 'clean' ? 'active' : ''}`}
        onClick={() => setActiveFormVersion('clean')}
      >
        🚀 Clean Pattern Form
      </button>
    </div>
  );

  const renderActiveForm = () => {
    switch (activeFormVersion) {
      case 'clean':
        return <FormOrderClean onAdd={handleOrderCreation} optionData={optionData} />;
      case 'original':
      default:
        return <FormOrder onAdd={handleOrderCreation} optionData={optionData} />;
    }
  };

  return (
    <ProjectDetailLayout
      currentPath="/restaurant-system"
      projectRequirements={<RestaurantRequirements />}
    >
      <div className="create-order">
        <FormVersionTabs />
        {renderActiveForm()}
      </div>
      <div className="order-list extra-wide-content">
        <h2>Order Process</h2>
        {orderList.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </ProjectDetailLayout>
  );
}
