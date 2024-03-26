import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full mt-32 flex items-center justify-center">
      <Loader2 className="animate-spin" size={64} />
    </div>
  );
};

export default loading;
