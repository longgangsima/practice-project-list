import { OrderCardProps } from '../types';

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="order-detail">
      {Object.entries(order).map(([key, value]) => {
        // Convert value to string - needed because values can be numbers, dates, booleans
        // React expects strings for display, and String() handles all types safely
        let orderValue: string;
        if (Array.isArray(value)) {
          orderValue = value.join(', ');
        } else if (value instanceof Date) {
          orderValue = value.toLocaleDateString(); // Better date formatting
        } else {
          orderValue = String(value);
        }

        if (key === 'id') return null;
        if (orderValue === undefined || orderValue === null || orderValue === '') return null;

        return (
          <div key={`order-${key}`} className={`order-${key}`}>
            <span className="order-label">{key}:</span>
            <span className="order-value">{orderValue}</span>
          </div>
        );
      })}
    </div>
  );
}

/**
 *       // <div className="order-customer">{order.customer}</div>
      // <div className="order-spice">{order.spice}</div>
      // <div className="order-base">{order.base}</div>
      // <div className="order-protein">{order.protein}</div>
      // <div className="order-dressings">{order.dressings.join(', ')}</div>
      // <div className="order-pickupDate">{order.pickupDate}</div>
      // <div className="order-comments">{order.comments}</div>
      {/* <div className="order-address">{order.address}</div> 
 */
