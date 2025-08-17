// components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}
