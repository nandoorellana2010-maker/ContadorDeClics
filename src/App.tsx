import ClickCounter from "./components/ClickCounter"
function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <ClickCounter conteoInicial={5} min={0} max={20} paso={1}/>
    </div>
  );
}

export default App
