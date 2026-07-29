import {
    HashRouter,
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"

import HomeFuncionario from "../pages/HomeFuncionario/HomeFuncionario"
import ListarProduto from "../pages/ListarProduto/ListarProduto"

//BrowserRouter: recarga a página toda, mas mantém o estado da aplicação.
//HashRouter: Recarrega apenas partes necessárias, mas não mantém o estado da aplicação.

const AppRoutes = () =>{

    return (
     <HashRouter>
        <Routes>
          
           <Route 
             path="/"
             element={<HomeFuncionario/>}
           />
            <Route 
             path="/home"
             element={<HomeFuncionario/>}
           />
           <Route 
             path="/produtos"
             element={<ListarProduto/>}
           />
           <Route 
             path="/categorias"
             element={<ListarCategoria/>}
           />

        </Routes>
     
     </HashRouter>
    )
}

export default AppRoutes
