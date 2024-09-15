import logo from './logo.svg';
import './App.css';
import Menu from './components/menu/menu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
   <>
            <div className="rootcontainer">
                <div className="LeftPanel">
                    <Menu/>
                </div>
                <div id="contentpanel" className="RightPanel">
                    <Outlet/>
                </div>
            </div>
   </>
  );
}

export default App;
