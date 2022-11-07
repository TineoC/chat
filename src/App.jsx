import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer } from "./components/index";
import { Home, Error } from "./pages/index";

function App() {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Error />} />
			</Routes>

			<Footer name='Your name' year='2022' />
		</BrowserRouter>
	);
}

export default App;
