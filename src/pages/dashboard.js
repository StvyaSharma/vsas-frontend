import Link from 'next/link';
import SymbolGrid from './components/SymbolGrid';

const Dashboard = () => {
  return (
    <main>
      <div style={{padding:'20px'}}>
        <div className='main'>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Scrolls</h1>
            <SymbolGrid />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
