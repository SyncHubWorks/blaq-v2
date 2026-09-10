import toast from "react-hot-toast";

function HomePage() {
  return (
    <div>
      <button onClick={() => toast.success("Configured")}>Click</button>
    </div>
  );
}

export default HomePage;
