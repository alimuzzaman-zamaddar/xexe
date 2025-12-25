
import { ImSpinner9 } from "react-icons/im";

// Loader component
const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ImSpinner9 className="text-xl animate-spin" />
    </div>
  );
};

export default Loader;
