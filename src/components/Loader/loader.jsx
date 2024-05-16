import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      className="sweet-loading absolute top-1/2 left-1/2"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <PuffLoader color="#36d7b7" size={150} speedMultiplier={0.7} />
    </div>
  );
}
