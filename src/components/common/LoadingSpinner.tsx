import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export const LoadingSpinner = ({ size = 'medium', text }: LoadingSpinnerProps) => {
  return (
    <div className={`loading-spinner loading-spinner-${size}`}>
      <div className="spinner-ring">
        <div className="spinner-segment"></div>
        <div className="spinner-segment"></div>
        <div className="spinner-segment"></div>
        <div className="spinner-segment"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};
