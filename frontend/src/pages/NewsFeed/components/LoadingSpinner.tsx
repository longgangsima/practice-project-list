import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading more news...</p>
    </div>
  );
};

export default LoadingSpinner;
